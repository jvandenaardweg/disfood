require('dotenv').config()
const fetch = require('node-fetch')
const Recipe = require('./database/').recipe
const Label = require('./database/').label
const RecipesLabels = require('./database/').recipesLabels
const Language = require('./database/').language
const sequelize = require('./database/').sequelize
const pluralize = require('pluralize')
const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_VISION_CREDENTIALS)
})
// const Translate = require('@google-cloud/translate')

// // Your Google Cloud Platform project ID
// const projectId = 'YOUR_PROJECT_ID'

// // Instantiates a client
// const translate = new Translate({
//   projectId: projectId,
// })

// Get all recipes that don't have labels yet
async function getImageUrls () {
  try {
    const recipeImages = await Recipe.findAll({
      raw: true,
      attributes: ['id', 'imageMedium'],
      where: {
        '$labels.id$': {
          $eq: null
        }
      },
      include: [{
        model: Label,
        required: false
      }],
      subQuery: false,
      limit: 5
    })
    return recipeImages
  } catch (err) {
    console.log('ERROR getting the recipe images.')
    // throw err
  }
}

// Get labels from Google Vision API
async function getLabelsFromImages (input) {
  console.log(`Get labels for recipe ID ${input.id} for ${input.imageMedium}.`)
  try {
    // Get labels from the image using Google Cloud Vision API
    const labels = await client
    .labelDetection(input.imageMedium)
    .then(results => {
      const labels = results[0].labelAnnotations

      return labels.map(label => {
        // Create proper plural and singular words
        const singular = (pluralize.isSingular(label.description)) ? label.description : pluralize.singular(label.description)
        const plural = (pluralize.isPlural(label.description)) ? label.description : pluralize.plural(label.description)

        const singularLower = singular.toLowerCase()
        const pluralLower = plural.toLowerCase()

        // Also add the score and topicality
        return {
          score: label.score,
          topicality: label.topicality,
          singular: singularLower,
          plural: pluralLower
        }
      })
    })

    return {
      recipeId: input.id,
      image: input.imageMedium,
      language: 'EN',
      labels: labels
    }
  } catch (err) {
    console.log('ERROR using Google Cloud Vision API', err)
    // throw err
  }
}

async function createOrAssociateLabelsToRecipes (result) {
  let labels = []
  try {
    for (var i = 0; i < result.labels.length; i++) {
      const label = await Label.findOrCreate({
        where: {
          singular: {
            $eq: result.labels[i].singular
          }
        },
        defaults: {
          singular: result.labels[i].singular,
          plural: result.labels[i].plural
        }
      })
      .then((label, created) => {
        label[0].setLanguage(result.language)
        label[0].addRecipe(result.recipeId, {
          through: {
            score: result.labels[i].score,
            topicality: result.labels[i].topicality
          }
        })
        return label[0]
      })
  
      labels.push(label)
    }
  
    return labels
  } catch (err) {
    console.log('ERROR creating the labels in the database', err)
  }

}

async function associateLabelsToRecipes () {

  try {
    // Get the Recipe ID and mediumImage from the db
    const recipeImages = await getImageUrls()

    for (var i = 0; i < recipeImages.length; i++) {
      await getLabelsFromImages(recipeImages[i])
      .then(result => {
        console.log(`Got ${result.labels.length} labels from Google Cloud Vision API`)
        return createOrAssociateLabelsToRecipes(result)
      })
      .then(result => {
        console.log(`Created labels ${result.length}`)
      })
    }

    console.log('Done!')
    process.exit()
  } catch (err) {
    console.log('ERR', err)
  }

}

// async function translateLabels (fromLanguage, toLanguage = 'NL') {
//   const labels = Label.findAll({
//     attributes: ['singular', 'plural'],
//     where: {
//       languageId: fromLanguage
//     }
//   })

//   translate
//   .translate(text, toLanguage)
//   .then(results => {
//     const translation = results[0];

//     console.log(`Text: ${text}`);
//     console.log(`Translation: ${translation}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// }

(async () => {
  const labels = await associateLabelsToRecipes()

  // const recipes = await Recipe.findAll({
  //   include: [{
  //     model: Label,
  //     required: true
  //   }]
  // })
  // console.log(recipes)

  // const recipeImages = await getImageUrls()
  // console.log(`Got ${recipeImages.length} for Google Cloud Vision API.`)
})()



