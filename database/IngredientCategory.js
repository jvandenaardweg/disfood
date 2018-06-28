// 'use strict'

// // Sources:
// // https://www.smulweb.nl/wiki
// // Dropdown bij filter: https://www.voedingswaardetabel.nl/voedingswaarde/?c=11
// module.exports = function (sequelize, DataTypes) {
//   var IngredientCategory = sequelize.define('ingredientCategory', {
//     singular: {
//       type: DataTypes.STRING, // groente
//       allowNull: false,
//       unique: true
//     },
//     plural: {
//       type: DataTypes.STRING, // groenten
//       allowNull: true,
//       unique: true
//     },
//   })

//   IngredientCategory.associate = function (models) {
//     Ingredient.belongsTo(models.ingredient, {
//       onDelete: 'RESTRICT'
//     })
//   }

//   return IngredientCategory
// }
