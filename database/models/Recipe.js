'use strict'

module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
			set (val) {
        this.setDataValue('title', val.trim())
      }
    },
    sourceId: {
      type: DataTypes.INTEGER, // 1231231
      allowNull: false
    },
    sourceUrl: {
      type: DataTypes.STRING, // https://ms.ah.nl/rest/ah/v1/facades/recipes/1185786
      allowNull: false
    },
    url: {
      type: DataTypes.STRING, // https://www.ah.nl/allerhande/recept/R-R1190591
      allowNull: false
    },
    description: {
      type: DataTypes.STRING // Short description, one sentence, 255 chars max?
    },
    recipeTime: {
      type: DataTypes.INTEGER // 30 = 30 minutes
    },
    servingType: {
      type: DataTypes.STRING // Personen
    },
    servingsNumber: {
      type: DataTypes.INTEGER // 1
    },
    imageLarge: {
      type: DataTypes.STRING, // https://static.ah.nl/static/recepten/img_071515_2048x1496_JPG.jpg // 2048x1496
      allowNull: false
    },
    imageMedium: {
      type: DataTypes.STRING // https://static.ah.nl/static/recepten/img_071515_1024x748_JPG.jpg // 1024x748
    },
    imageSmall: {
      type: DataTypes.STRING // https://static.ah.nl/static/recepten/img_071515_Recipe_300.jpg // 300x300
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.TEXT), // ['tomaat', 'komkommer']
      allowNull: false
    },
    preparationSummary: {
      type: DataTypes.ARRAY(DataTypes.TEXT), // ['doe eerst dit', 'doe dan dat']
      allowNull: false
    },
    kitchenAppliances: {
      type: DataTypes.ARRAY(DataTypes.TEXT) // ['barbecue', 'staafmixer']
    },
    averageRate: {
      type: DataTypes.DECIMAL // 4.12345
    },
    tagCloud: {
      type: DataTypes.ARRAY(DataTypes.TEXT) // ['barbecue', 'mediterraan', 'grillen']
    },
    courses: {
      type: DataTypes.ARRAY(DataTypes.TEXT) // ['hoofdgerecht']
    },
    kcal: {
      type: DataTypes.INTEGER // 590
    }
  })

  return Recipe
}
