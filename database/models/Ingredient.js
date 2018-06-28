'use strict'

// Sources:
// https://nl.wikipedia.org/wiki/Lijst_van_fruit
// https://nl.wikipedia.org/wiki/Lijst_van_groenten
// https://www.voedingswaardetabel.nl/voedingswaarde/?c=11
// https://nl.wikipedia.org/wiki/Vis_(voeding)
module.exports = function (sequelize, DataTypes) {
  var Ingredient = sequelize.define('ingredient', {
    singular: {
      type: DataTypes.STRING, // paprika's
      allowNull: false,
      unique: true
    },
    plural: {
      type: DataTypes.STRING, // paprika's
      allowNull: true,
      unique: true
    },
    quantityUnitSingular: {
      type: DataTypes.STRING, // teen, ml, l
      allowNull: true
    },
    quantityUnitPlural: {
      type: DataTypes.STRING, // tenen
      allowNull: true
    },
    totalExcludeByUsers: { // So we can use this in suggestions to other users
      type: DataTypes.INTEGER, // 1000
      allowNull: true,
      defaultValue: 0
    },
    totalIncludesByUsers: { // So we can use this in suggestions to other users
      type: DataTypes.INTEGER, // 1000
      allowNull: true,
      defaultValue: 0
    }
  })

  Ingredient.associate = function (models) {
    Ingredient.belongsTo(models.language, {
      onDelete: 'RESTRICT'
    })
  }

  return Ingredient
}
