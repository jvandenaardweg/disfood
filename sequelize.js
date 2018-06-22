require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  operatorsAliases: true,
  dialect: 'postgres',
  pool: {
    max: 15,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize: Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Sequelize: Unable to connect to the database:', err)
  })

// Sync all models that aren't already in the database
sequelize.sync()

return sequelize
