require('dotenv').config()

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)

let db = {}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 15,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
})

// Load all the models
const modelsDir = __dirname + '/models'
fs
  .readdirSync(modelsDir)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(modelsDir, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})


// Export the db Object
db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.sync()

module.exports = db
