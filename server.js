const express = require('express')
const app = express()
const cors = require('cors')
const Recipe = require('./database/').recipe
const RecipesLabels = require('./database/').recipesLabels
const Label = require('./database/').label
const Ingredient = require('./database/').ingredient
const sequelize = require('./database/').sequelize

const port = process.env.PORT || 3000

app.use(cors())

// Serve frontend
app.use(express.static(__dirname + '/dist'))

// Get's a recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  const recipeId = parseFloat(req.params.id)

  const recipe = await Recipe.findOne({
    where: {
      id: recipeId
    },
    include: [{
      model: Label
    }]
  })

  return res.json(recipe)
})

// Get's recipes by label ID
app.get('/api/labels/:id/recipes', async (req, res) => {
  const labelId = parseFloat(req.params.id)

  const label = await Recipe.findAll({
    where: {
      '$labels.id$': {
        $eq: labelId
      },
      // '$labels.recipesLabels.score$': {
      //   $gt: 0.8
      // }
    },
    include: [{
      model: Label,
      required: false
    }],
    subQuery: false
  })

  return res.json(label)
})

// Get's label by ID
app.get('/api/labels/:id', async (req, res) => {
  const labelId = parseFloat(req.params.id)

  const label = await Label.findById(labelId)

  return res.json(label)
})

// Returns all labels with their total count
app.get('/api/labels', async (req, res) => {
  const labels = await sequelize.query(`SELECT "labels"."id", "labels"."singular", COUNT("recipesLabels"."labelId") as "total" FROM "recipesLabels"
  JOIN "labels" ON "labels"."id" = "recipesLabels"."labelId"
  GROUP BY "labels"."id"
  ORDER BY "total" DESC`)
  return res.json({labels: labels[0] })
})

// Returns all ingredients
app.get('/api/ingredients', async (req, res) => {
  let whereQuery = {}

  const limit = (req.query.limit) ? parseFloat(req.query.limit) : 100
  const dirtyExcludedIngredients = req.query.excludedIngredients
  const dirtySearch = req.query.search

  if (dirtyExcludedIngredients) {
    const excludeIngredientsQuery = dirtyExcludedIngredients.split(',').map(ingredient => {
      return [
        {
          singular: {
            $notILike: `%${ingredient}%`
          }
        },
        {
          plural: {
            $notILike: `%${ingredient}%`
          }
        }
      ][0]
    })

    const query = {
      $and: excludeIngredientsQuery
    }

    Object.assign(whereQuery, query)
  }

  if (dirtySearch) {
    const searchLower = dirtySearch.toLowerCase()
    const query = {
      $or: [
        {
          singular: {
            $iLike: `%${searchLower}%`
          }
        },
        {
          plural: {
            $iLike: `%${searchLower}%`
          }
        }
      ]
    }

    Object.assign(whereQuery, query)
  }

  const ingredients = await Ingredient.findAll({
    where: whereQuery,
    limit: limit,
    order: [[sequelize.fn('length', sequelize.col('singular')), 'ASC']]
  })
  res.json(ingredients)
})

// Returns all recipes
app.get('/api/recipes', async (req, res) => {
  let whereQuery = {}
  const limit = 20
  const random = (req.query.random === "true") ? true : false
  const recipeTime = (req.query.recipeTime) ? parseFloat(req.query.recipeTime) : null
  const order = (random) ? sequelize.random() : {}

  const dirtyExcludedIngredients = req.query.excludedIngredients
  const dirtyExcludedRecipeIds = req.query.excludedRecipeIds
  const dirtyIncludeRecipeIds = req.query.ids

  // if (!dirtyExcludedIngredients) {
  //   return res.json({'message': 'invalid request'})
  // }

  const validExcludedIngredients = (dirtyExcludedIngredients) ? dirtyExcludedIngredients.split(',').every(ingredient => typeof ingredient === 'string') : null
  const validExcludedRecipeIds = (dirtyExcludedRecipeIds) ? dirtyExcludedRecipeIds.split(',').every(id => Number.isInteger(id)) : null

  const excludeIngredients = (dirtyExcludedIngredients) ? dirtyExcludedIngredients.toLowerCase().split(',') : null
  const excludeRecipeIds = (dirtyExcludedRecipeIds) ? dirtyExcludedRecipeIds.split(',') : null
  const includeRecipeIds = (dirtyIncludeRecipeIds) ? dirtyIncludeRecipeIds.split(',') : null
  // TODO: create singular and plural ingredients based on the user input
  // For example: ei > eieren, paprika > paprika's
  // Also, "vis", should return in "zalm", "tonijn", "gamba's", "mosselen" etc...

  if (excludeRecipeIds) {
    Object.assign(whereQuery, {
      sourceRecipeId: { $notIn: excludeRecipeIds }
    })
  }

  if (includeRecipeIds) {
    Object.assign(whereQuery, {
      id: { $in: includeRecipeIds }
    })
  }

  if (recipeTime) {
    let recipeTimeQuery
    if (recipeTime === 15) {
      recipeTimeQuery = { $between: [1, 15] }
    } else if (recipeTime === 30) {
      recipeTimeQuery = { $between: [16, 30] }
    } else if (recipeTime === 60) {
      recipeTimeQuery = { $between: [31, 999] }
    }
    Object.assign(whereQuery, {
      recipeTime: recipeTimeQuery
    })
  }
  console.log('Getting all recipes...')

  // Just fetch all the recipes
  // We have no handy way to query the DB with this way of determining ingredients
  const recipes = await Recipe.findAll({
    where: whereQuery,
    order: order
  })
  .then(recipes => {
    console.log('Matching excluded recipes:', dirtyExcludedIngredients)

    const possibleLikedRecipes = recipes.filter(recipe => {
      // Every ingredient must not match any ingredient the user does not like
      return recipe.ingredients.every(ingredient => {
        return excludeIngredients.every(excluded => {
          return !ingredient.includes(excluded)
        })
      })
    })

    console.log('Total matches:', possibleLikedRecipes.length, 'of', recipes.length, 'recipes')

    if (possibleLikedRecipes.length > limit) {
      return possibleLikedRecipes.slice(0, limit) // only return 30 for now
    } else {
      return possibleLikedRecipes
    }
  })

  res.json(recipes)

})

app.listen(port)
