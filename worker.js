require('dotenv').config()
const fetch = require('node-fetch')
const Recipe = require('./database/').recipe
const Ingredient = require('./database/').ingredient
const sequelize = require('./database/').sequelize
const recipesPerPage = 100
const transformRecipe = require('./transformers/recipe')

// const RECIPES_SEARCH_URL= process.env.RECIPE_BASE_URL + `search?query=&size=${recipesPerPage}&filters=menugang:hoofdgerecht`
const RECIPES_SEARCH_URL= process.env.RECIPE_BASE_URL + `search?query=&size=${recipesPerPage}&filters=menugang:hoofdgerecht`

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getTotalRecipes () {
  const totalRecipes = await fetch(RECIPES_SEARCH_URL, {
    headers: {
      'Authorization': `Basic ${process.env.ACCESS_TOKEN}`
    }
  })
  .then(result => result.json())
  .then(json => json.page.totalElements)

  return totalRecipes
}

async function getAllRecipesIds () {
  console.log('Determining total recipes on AH...')
  let recipesIds = []

  const totalRecipes = await getTotalRecipes()
  const totalPages = Math.ceil(totalRecipes / recipesPerPage)

  console.log(`We should crawl ${totalRecipes} recipes.`)
  console.log(`We should do ${totalPages} requests to AH to first get all recipe Ids.`)

  await sleep(5000)

  try {
    for (let page = 0; page <= totalPages; page++) {
      const foundRecipeIds = await doRequests(RECIPES_SEARCH_URL, page)
      console.log(`Received ${foundRecipeIds.length} recipes. We continue...`, `${page} from ${totalPages}`)
      // await sleep(1000)
      recipesIds.push(...foundRecipeIds)
    }
    return recipesIds
  } catch (err) {
    console.log('Error fetching all recipe ids', err)
  }
}

async function doRequests (url, page) {
  let nextPageUrl = url + '&page=' + page

  console.log(`Fetching all recipes @ ${nextPageUrl}`)

  const foundIds = await fetch(nextPageUrl, {
      headers: {
        'Authorization': `Basic ${process.env.ACCESS_TOKEN}` // We probably only need this access token once if we keep the recepies up to date every day
      }
    })
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
  const recipe = await fetch(url, {
    headers: {
      'Authorization': `Basic ${process.env.ACCESS_TOKEN}` // We probably only need this access token once if we keep the recepies up to date every day
    }
  })
  .then(result => result.json())
  // await sleep(100) // Rate limit requests every X milliseconds
  return recipe
}


// First, find all receipe ids

async function getAll () {
  const allRecipeIds = await getAllRecipesIds()
  const totalRecipeIds = allRecipeIds.length
  console.log(`We got ${totalRecipeIds} recipe Ids. Now we can use those Ids to request the full receipe.`)

  const excludeRecipeIds = await Recipe.findAll().then(recipes => recipes.map(recipe => recipe.sourceId))
  console.log(`We already got ${excludeRecipeIds.length} recipes in our database.`)

  const recipesIds = allRecipeIds.filter(id => !excludeRecipeIds.includes(id)) // Exclude the id's we already have
  const totalNewRecipeIds = recipesIds.length

  if (!totalNewRecipeIds) {
    console.log('No new recipe Ids found. We stop!')
    return false
  } else {
    console.log(`We only need to fetch ${recipesIds.length} recipe Ids. We already have the others in the database.`)

    try {
      // Then, request every recipe
      for (var i = 0; i < totalRecipeIds; i++) {
        const recipeId = recipesIds[i]
        const recipe = await getRecipeById(recipeId)
        // const ingredients = recipe.ingredients
        console.log(`Got recipe ${i + 1} from ${totalRecipeIds}: ${recipe.title}`)

        // First, create the ingredients
        // for (var x = 0; x < ingredients.length; x++) {
        //   console.log('Create ingredient for ', ingredients[x].description.singular)
        //   await Ingredient.findOrCreate({
        //     where: {
        //       singular: ingredients[x].description.singular
        //     },
        //     defaults: {
        //       singular: ingredients[x].description.singular,
        //       plural: ingredients[x].description.plural,
        //       quantityUnitSingular: (ingredients[x].quantityUnit) ? ingredients[x].quantityUnit.singular : null,
        //       quantityUnitPlural: (ingredients[x].quantityUnit) ? ingredients[x].quantityUnit.plural : null,
        //       languageId: 'NL' // TODO: make dynamic based on source
        //     }
        //   })
        //   .spread((ingredient, created) => {
        //     if (created) {
        //       console.log(`Ingredient ${ingredient.singular} saved in database.`)
        //     } else {
        //       console.log(`Ingredient ${ingredient.singular} is already in the database. Skipping.`)
        //     }

        //     return created
        //   })
        // }

        // Then create the recipe
        const createdRecipe = await createRecipe(recipe)
        if (createdRecipe) console.log(`Saved ${recipe.id} in database.`)
      }
    } catch (err) {
      console.log('Error fetching recipes by id')
      console.log(err)
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
      console.log(`Recipe ${recipe.id} saved in database.`)
    } else {
      console.log(`Recipe ${recipe.id} is already in the database. Skipping.`)
    }

    return created
  })
}

getAll()
