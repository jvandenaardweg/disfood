const flatMap = require('flatmap')

function transformRecipe (recipe) {
  const ingredients = flatMap(recipe.ingredients, (ingredient) => {
    const singular = ingredient.description.singular
    const plural = ingredient.description.plural
    if (singular && plural) return [singular.toLowerCase(), plural.toLowerCase()]
    if (!singular) return [plural.toLowerCase()]
    if (!plural) return [singular.toLowerCase()]
  })

  const ingredientsText = recipe.ingredients.map(ingredient => ingredient.completeText)

  const kcal = recipe.nutricionalValues.find(nutrician => nutrician.unit === 'kcal')
  const kcalValue = (kcal && kcal.value) ? kcal.value : null
  const imageSmall = recipe.recipeImage.find(image => image.width === 300)
  const imageSmallUrl = (imageSmall) ? imageSmall.url : recipe.recipeImage.find(image => image.width === 220).url // Use 220 if 300 image does not exist

  return {
    title: recipe.title,
    sourceId: 1, // TODO: make dynamic, this is just albert heijn
    sourceRecipeId: recipe.id,
    sourceUrl: `https://ms.ah.nl/rest/ah/v1/facades/recipes/${recipe.id}`,
    url: `https://www.ah.nl/allerhande/recept/R-R${recipe.id}`,
    description: recipe.description,
    recipeTime: recipe.recipeTime.totalTime,
    servingType: recipe.servingType,
    servingsNumber: recipe.servingsNumber,
    imageLarge: recipe.recipeImage.find(image => image.width === 2048).url,
    imageMedium: recipe.recipeImage.find(image => image.width === 1024).url,
    imageSmall: imageSmallUrl,
    ingredients: ingredients,
    ingredientsText: ingredientsText,
    kitchenAppliances: recipe.kitchenAppliances.map(appliance => appliance.completeText.toLowerCase()),
    preparationSummary: recipe.preparationSummary,
    averageRate: recipe.popularityInformation.rating.averageRate,
    tagCloud: recipe.tagCloud,
    courses: recipe.courses,
    kcal: kcalValue,
    languageId: 'NL' // TODO: make dynamic
  }
}

module.exports = transformRecipe
