const express = require('express')
const app = express()
const cors = require('cors')
const Recipe = require('./database/').recipe
const sequelize = require('./database/').sequelize

const port = process.env.PORT || 3000

app.use(cors())

// Serve frontend
app.use(express.static(__dirname + '/public'))

// Serve API
app.get('/api/recipes', async function(req, res){
  const limit = 20
  const dirtyExcludedIngredients = req.query.excludedIngredients
  console.log(dirtyExcludedIngredients)
  const random = (req.query.random === "true") ? true : false
  const order = (random) ? { order: sequelize.random() } : {}

  if (!dirtyExcludedIngredients) {
    return res.json({'message': 'invalid request'})
  } else {
    const excludeIngredients = dirtyExcludedIngredients.toLowerCase().split(',')

    console.log('Getting all recipes...')

    // Just fetch all the recipes
    // We have no handy way to query the DB with this way of determining ingredients
    const recipes = await Recipe.findAll(order)
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

      // possibleLikedRecipes.forEach(recipe => {
      //   console.log(recipe.id, recipe.title)
      // })

      console.log('Total matches:', possibleLikedRecipes.length, 'of', recipes.length, 'recipes')

      if (possibleLikedRecipes.length > limit) {
        return possibleLikedRecipes.slice(0, limit) // only return 30 for now
      } else {
        return possibleLikedRecipes
      }
    })

    res.json(recipes)
  }

})

app.listen(port)
