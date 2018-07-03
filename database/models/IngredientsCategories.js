'use strict'

module.exports = function (sequelize, DataTypes) {
  var IngredientsCategories = sequelize.define('ingredientsCategories', {
    name: {
      type: DataTypes.STRING, // groente
      allowNull: false,
      unique: true
    },
    singular: {
      type: DataTypes.STRING, // groente
      allowNull: false,
      unique: true
    },
    plural: {
      type: DataTypes.STRING, // groenten
      allowNull: true,
      unique: true
    },
  })

  IngredientsCategories.associate = function (models) {
    IngredientsCategories.belongsTo(models.language, {
      onDelete: 'RESTRICT'
    })
  }

  return IngredientsCategories
}
