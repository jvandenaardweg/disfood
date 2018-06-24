'use strict'

module.exports = function (sequelize, DataTypes) {
  var Language = sequelize.define('language', {
    id: {
      type: DataTypes.STRING, // NL, EN, DE
      primaryKey: true,
      autoIncrement: false
    },
    name: {
      type: DataTypes.STRING, // Nederlands, English, Deutsch
      allowNull: false
    }
  })

  return Language
}
