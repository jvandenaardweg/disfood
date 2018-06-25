const express = require('express')
const app = express()
const cors = require('cors')
const Recipe = require('./database/').recipe
const Ingredient = require('./database/').ingredient
const sequelize = require('./database/').sequelize

const port = process.env.PORT || 3000

app.use(cors())

// Serve frontend
app.use(express.static(__dirname + '/dist'))

// Serve API
app.get('/api/ingredients', async function(req, res){
  const ingredients = await Ingredient.findAll({ limit: 100 })
  res.json(ingredients)
})

app.get('/api/recipes', async function(req, res){
  const limit = 20
  const random = (req.query.random === "true") ? true : false
  const order = (random) ? sequelize.random() : {}

  const dirtyExcludedIngredients = req.query.excludedIngredients
  const dirtyExcludedRecipeIds = req.query.excludedRecipeIds

  if (!dirtyExcludedIngredients) {
    return res.json({'message': 'invalid request'})
  }

  const validExcludedIngredients = dirtyExcludedIngredients.split(',').every(ingredient => typeof ingredient === 'string')
  const validExcludedRecipeIds = dirtyExcludedRecipeIds.split(',').every(id => Number.isInteger(id))

  const excludeIngredients = dirtyExcludedIngredients.toLowerCase().split(',')
  const excludeRecipeIds = dirtyExcludedRecipeIds.split(',')
  // TODO: create singular and plural ingredients based on the user input
  // For example: ei > eieren, paprika > paprika's
  // Also, "vis", should return in "zalm", "tonijn", "gamba's", "mosselen" etc...

  console.log('Getting all recipes...')
  console.log('Except recipe Ids: ', excludeRecipeIds.join(','))

  // Just fetch all the recipes
  // We have no handy way to query the DB with this way of determining ingredients
  const recipes = await Recipe.findAll({
    $notIn: excludeRecipeIds,
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
