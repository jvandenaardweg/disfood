'use strict'

// Labels are derrived from the recipe images using Google Vision API
// So it can be used as an extra filtering method
module.exports = function (sequelize, DataTypes) {
  var Label = sequelize.define('label', {
    singular: {
      type: DataTypes.STRING, // paprika
      allowNull: false,
      unique: true
    },
    plural: {
      type: DataTypes.STRING, // paprika's
      allowNull: true,
      unique: true
    }
  })

  Label.associate = function (models) {
    Label.belongsTo(models.language, {
      onDelete: 'RESTRICT'
    })
    Label.belongsToMany(models.recipe, {
      onDelete: 'CASCADE',
      through: models.recipesLabels
    })
  }

  return Label
}
