// https://www.voedingswaardetabel.nl/voedingswaarde/?c=11
const Crawler = require('crawler')
const Ingredient = require('./database/').ingredient
var ingredientCrawler = new Crawler({
  rotateUA: true,
  // userAgent: require('user-agent-array'),
  maxConnections: 5, // For production we should keep this number low so we do not spam some services
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) console.log(error)
    var $ = res.$;

    const crawlUrl = res.request.uri.href
    const ingredients = $('.vwtContainer > div:not(.SortingExtra)')
    const title = $('#lblPageTitleB').text().trim()
    console.log(title)
    // console.log(url)
    const { categoryId } = urls.find(url => {
      console.log(url.url, crawlUrl)
      return url.url === crawlUrl
    })

    ingredients.each(function(i, elem) {
      // console.log($(this))
      const name = $(this).find('.prodNameLink').text().trim()
      let cleanName = name.split(',')[0].toLowerCase().trim()
      cleanName = cleanName.split('(')[0].toLowerCase().trim()

      Ingredient.findOrCreate({
        where: {
          name: cleanName
        },
        defaults: {
          name: cleanName,
          singular: null,
          plural: null,
          languageId: 'NL', // TODO: make dynamic based on source
          ingredientsCategoryId: categoryId
        }
      })
      .spread((ingredient, created) => {
        if (created) {
          console.log(`Ingredient ${cleanName} (${name}) saved in database.`)
        } else {
          console.log(`Ingredient ${cleanName} (${name}) is already in the database. Skipping.`)
        }

        return created
      })

      // const kcal = $(this).find('[title="Kcal (kcal)"]').text().trim()
      // const kcal = $(this).find('[title="Kjoule (kJ)"]').text()
      // const kcal = $(this).find('[title="Water (g)"]').text()
      // const kcal = $(this).find('[title="Eiwit (g)"]').text()
      // const kcal = $(this).find('[title="Koolhydraten (g)"]').text()
      // const kcal = $(this).find('[title="Suikers (g)"]').text()
      // const kcal = $(this).find('[title="Vet (g)"]').text()
      // const kcal = $(this).find('[title="Verzadigd vet (g)"]').text()
      // const kcal = $(this).find('[title="Enkelvoudig onverzadigd vet (g)"]').text()
      // const kcal = $(this).find('[title="Meervoudig onverzadigd vet (g)"]').text()
      // const kcal = $(this).find('[title="Cholesterol (mg)"]').text()
      // const kcal = $(this).find('[title="Voedingsvezel (g)"]').text()
      // console.log(categoryId, name)
    })

    done()
  }

})

const urls = [
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=1',
    categoryId: 8
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=2',
    categoryId: 8
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=3',
    categoryId: 8
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=5',
    categoryId: 6
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=6',
    categoryId: 6
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=7',
    categoryId: 6
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=8',
    categoryId: 6
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=9',
    categoryId: 9
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=10',
    categoryId: 1
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=11',
    categoryId: 2
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=12',
    categoryId: 10
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=13',
    categoryId: 3
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=14',
    categoryId: 3
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=15',
    categoryId: 7
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=16',
    categoryId: 13
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=17',
    categoryId: 4
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=18',
    categoryId: 4
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=19',
    categoryId: 11
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=20',
    categoryId: 12
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=22',
    categoryId: 5
  },
  {
    url: 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=27',
    categoryId: 14
  }
]

const queueUrls = urls.map(url => url.url)

ingredientCrawler.queue(queueUrls)

// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=1', // granen (granen)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=2', // brood en broodproducten (granen)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=3', // onbijtgranen (granen)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=4', // koek en gebak (NIET DOEN)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=5', // melk en melk producten (zuivel)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=6', // kaas (zuivel)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=7', // deserts (zuivel)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=8', // ijs (zuivel)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=9', // aardappels en aardappel producten (aardappel)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=10', // groente en peulvruchten (groente)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=11', // fruit (fruit)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=12', // noten en zaden (noten en zaden)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=13', // vlees (vlees)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=14', // vleeswaren en worst (vlees)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=15', // eieren en ei-producten (ei)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=16', // vleesvervangers (vleesvervangers)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=17', // vis en vis-producten (vis)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=18', // schaal en schelp dieren (vis)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=19', // olien en vetten (olien en vetten)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=20', // soep en sauzen (soep en sauzen)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=21', // hartige snacks (NIET DOEN)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=22', // kruide en specerijen (kruiden)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=23', // zoetwaren (NIET DOEN)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=24', // dranken (NIET DOEN)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=25', // alcoholische dranken (NIET DOEN)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=26', // gemaksvoeding (NIET DOEN)
// 'https://www.voedingswaardetabel.nl/voedingswaarde/?c=27', // diversen (diversen)

// var ingredientCrawler = new Crawler({
//   rotateUA: true,
//   // userAgent: require('user-agent-array'),
//   maxConnections: 5, // For production we should keep this number low so we do not spam some services
//   // This will be called for each crawled page
//   callback: function (error, res, done) {
//     if (error) console.log(error)
//     var $ = res.$;

//     const ingredients = $('.toMasonry article[data-type="wiki"]')
//     const category = $("title").text().trim().split(' wiki')[0].trim()
//     console.log(category)

//     ingredients.each(function(i, elem) {
//       // console.log($(this))
//       const name = $(this).find('.h2 a').text().trim()
//       // const kcal = $(this).find('[title="Kcal (kcal)"]').text().trim()
//       // const kcal = $(this).find('[title="Kjoule (kJ)"]').text()
//       // const kcal = $(this).find('[title="Water (g)"]').text()
//       // const kcal = $(this).find('[title="Eiwit (g)"]').text()
//       // const kcal = $(this).find('[title="Koolhydraten (g)"]').text()
//       // const kcal = $(this).find('[title="Suikers (g)"]').text()
//       // const kcal = $(this).find('[title="Vet (g)"]').text()
//       // const kcal = $(this).find('[title="Verzadigd vet (g)"]').text()
//       // const kcal = $(this).find('[title="Enkelvoudig onverzadigd vet (g)"]').text()
//       // const kcal = $(this).find('[title="Meervoudig onverzadigd vet (g)"]').text()
//       // const kcal = $(this).find('[title="Cholesterol (mg)"]').text()
//       // const kcal = $(this).find('[title="Voedingsvezel (g)"]').text()
//       // console.log(name)
//     })

//     done()
//   }

// })

// ingredientCrawler.queue([
//   // 'https://www.smulweb.nl/wiki/overig',
//   'https://www.smulweb.nl/wiki/groenten',
//   'https://www.smulweb.nl/wiki/kruiden',
//   'https://www.smulweb.nl/wiki/vis',
//   'https://www.smulweb.nl/wiki/vlees',
//   'https://www.smulweb.nl/wiki/zuivel',
//   'https://www.smulweb.nl/wiki/sauzen-en-dippers',
//   'https://www.smulweb.nl/wiki/rijst',
//   'https://www.smulweb.nl/wiki/pasta',
//   'https://www.smulweb.nl/wiki/fruit'
// ])
