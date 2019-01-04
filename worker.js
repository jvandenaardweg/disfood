require('dotenv').config()
const fetch = require('node-fetch')
const Recipe = require('./database/').recipe
const transformRecipe = require('./transformers/recipe')

const RECIPES_PER_PAGE = 100
const RECIPES_SEARCH_URL = `${process.env.RECIPE_BASE_URL}search?query=&size=${RECIPES_PER_PAGE}&filters=menugang:hoofdgerecht`

const authorizationHeader = {
  headers: {
    'Authorization': `Basic ${process.env.ACCESS_TOKEN}`
  }
}

// Sleep method to not spam the API servers
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getTotalRecipes () {
  const totalRecipes = await fetch(RECIPES_SEARCH_URL, authorizationHeader)
    .then(result => result.json())
    .then(json => json.page.totalElements)

  return totalRecipes
}

async function getAllRecipeSourceIds () {
  console.log('Determining total recipes on AH...')
  let recipeSourceIds = []

  const totalRecipes = await getTotalRecipes()
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE)

  console.log(`The source contains ${totalRecipes} recipes.`)
  console.log(`We should do ${totalPages} requests to AH to first get all recipe Ids.`)

  await sleep(5000)

  try {
    for (let page = 0; page <= totalPages; page++) {
      const foundRecipeIds = await doRequests(RECIPES_SEARCH_URL, page)

      console.log(`Received ${foundRecipeIds.length} recipes. We continue...`, `${page} from ${totalPages}`)

      recipeSourceIds.push(...foundRecipeIds)
    }
    return recipeSourceIds
  } catch (err) {
    console.log('Error fetching all recipe ids', err)
  }
}

async function doRequests (url, page) {
  let nextPageUrl = url + '&page=' + page

  console.log(`Fetching all recipes @ ${nextPageUrl}`)

  const foundIds = await fetch(nextPageUrl, authorizationHeader)
    .then(result => result.json())
    .then(json => {
      if (json.content && json.content.length) return json.content.map(item => item.id)
      return json.content
    })

  return foundIds
}

async function getRecipeById (recipeId) {
  const url = process.env.RECIPE_BASE_URL + recipeId


  console.log(`Fetching recipe Id: ${recipeId} @ ${url}`)
  const recipe = await fetch(url, authorizationHeader)
    .then(result => result.json())
  return recipe
}

// First, find all receipe ids
async function getAll () {
  const allRecipeSourceIds = await getAllRecipeSourceIds()

  console.log(`We found ${allRecipeSourceIds.length} recipe Ids at the source. We can use those Ids to request the full receipe.`)

  // Get an array with all the recipe source ID's we already have
  // So we can determine if we need to add it to the database or not
  const excludeRecipeIds = await Recipe.findAll().then(recipes => recipes.map(recipe => recipe.sourceRecipeId))

  console.log(`But we already got ${excludeRecipeIds.length} recipes in our database.`)

  console.log(`Now we determine which recipes are new, and only fetch those.`)

  const recipeSourceIdsToFetch = allRecipeSourceIds.filter(id => !excludeRecipeIds.includes(id)) // Exclude the id's we already have

  console.log(`We end up with fetcing ${recipeSourceIdsToFetch.length} (new) recipes from the source.`)

  if (!recipeSourceIdsToFetch.length) {
    console.log('No new recipe Ids found. We stop!')
    process.exit()
  } else {
    console.log(`We only need to fetch ${recipeSourceIdsToFetch.length} recipe Ids. We already have the others in the database.`)

    try {
      // Then, request every (new) recipe
      for (var i = 0; i < recipeSourceIdsToFetch.length; i++) {
        const recipeId = recipeSourceIdsToFetch[i]

        // If it's a new recipe ID, we get the recipe from the API and we create the database entry
        const recipe = await getRecipeById(recipeId)
        console.log(`Got recipe ${i + 1} from ${recipeSourceIdsToFetch.length}: "${recipe.title}" (${recipe.id})`)

        // Then create the recipe
        await createRecipe(recipe)

        // Exist the process when we created all recipes
        if ((i + 1) === recipeSourceIdsToFetch.length) {
          console.log('Succesfully saved all new recipes in the database. We stop!')
          process.exit()
        }
      }
    } catch (err) {
      console.log('Error fetching recipes by id')
      console.log(err)
      process.exit()
    }
  }

}

function createRecipe (recipe) {
  return Recipe
    .findOrCreate({
      where: {
        sourceRecipeId: recipe.id
      },
      defaults: transformRecipe(recipe)
    })
    .spread((user, created) => {
      if (created) {
        console.log(`Saved recipe in database: "${recipe.title}" (${recipe.id}).`)
      } else {
        console.log(`Did not create a recipe entry for ${recipe.id}, because it is already in the database. Skipping.`)
      }

      return created
    })
}

getAll()
