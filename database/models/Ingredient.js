'use strict'

// Sources:
// https://nl.wikipedia.org/wiki/Lijst_van_fruit
// https://nl.wikipedia.org/wiki/Lijst_van_groenten
// https://www.voedingswaardetabel.nl/voedingswaarde/?c=11
// https://nl.wikipedia.org/wiki/Vis_(voeding)
module.exports = function (sequelize, DataTypes) {
  var Ingredient = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING, // doperwten
      allowNull: false,
      unique: true
    },
    singular: {
      type: DataTypes.STRING, // doperwt
      allowNull: true,
      unique: true
    },
    plural: {
      type: DataTypes.STRING, // doperwten
      allowNull: true,
      unique: true
    }
  })

  Ingredient.associate = function (models) {
    Ingredient.belongsTo(models.language, {
      onDelete: 'RESTRICT'
    })
    Ingredient.belongsTo(models.ingredientsCategories, {
      onDelete: 'RESTRICT'
    })
  }

  return Ingredient
}
