'use strict'

module.exports = function (sequelize, DataTypes) {
  var Source = sequelize.define('source', {
    name: {
      type: DataTypes.STRING, // Albert Heijn
      allowNull: false
    },
    url: {
      type: DataTypes.STRING, // https://ah.nl
      allowNull: false
    },
    recipeSourceBaseUrl: {
      type: DataTypes.STRING // https://ms.ah.nl/rest/ah/v1/facades/recipes/XXXXXX
    },
    recipesSourceBaseUrl: {
      type: DataTypes.STRING // https://ms.ah.nl/rest/ah/v1/facades/recipes/search?query=&size=100
    },
    recipeBaseUrl: {
      type: DataTypes.STRING // https://www.ah.nl/allerhande/recept/R-RXXXXXX
    }
  })

  return Source
}
