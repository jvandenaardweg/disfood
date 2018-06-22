import { shallowMount } from '@vue/test-utils'
const transformRecipe = require('../../transformers/recipe')

describe('Prepare raw data for our database', () => {
  it('should return the proper recipe object', () => {
    expect(transformRecipe(example)).toMatchObject(expected)
  })
})

const example = {
  "id": 1185786,
  "title": "Halloumiburgers met gegrilde groenten",
  "description": "Ooit wel eens zo'n lekkere burger zonder vlees van de barbecue gegeten? Doe ons er nog maar een! ",
  "courses": [
    "hoofdgerecht"
  ],
  "tagCloud": [
    "zonder vlees/vis",
    "barbecue",
    "mediterraan",
    "grillen"
  ],
  "recipeTime": {
    "cookTime": 30,
    "ovenTime": 0,
    "waitTime": 0,
    "completeTotalTime": "30 min.",
    "completeWaitTime": "",
    "completeCookTime": "30 min.",
    "completeOvenTime": "",
    "totalTime": 30
  },
  "servingType": "personen",
  "servingsNumber": 4,
  "maxServingsNumber": 40,
  "minServingsNumber": 1,
  "scaleServingsNumber": 1,
  "recipeImage": [
    {
      "width": 1920,
      "height": 1080,
      "url": "https://static.ah.nl/static/recepten/img_071515_1920x1080_JPG.jpg"
    },
    {
      "width": 300,
      "height": 300,
      "url": "https://static.ah.nl/static/recepten/img_071515_Recipe_300.jpg"
    },
    {
      "width": 200,
      "height": 200,
      "url": "https://static.ah.nl/static/recepten/img_071515_Recipe_200.jpg"
    },
    {
      "width": 23,
      "height": 23,
      "url": "https://static.ah.nl/static/recepten/img_071515_Recipe_23.jpg"
    },
    {
      "width": 1024,
      "height": 748,
      "url": "https://static.ah.nl/static/recepten/img_071515_1024x748_JPG.jpg"
    },
    {
      "width": 1600,
      "height": 0,
      "url": "https://static.ah.nl/static/recepten/img_071515_1600x_JPG.jpg"
    },
    {
      "width": 445,
      "height": 297,
      "url": "https://static.ah.nl/static/recepten/img_071515_445x297_JPG.jpg"
    },
    {
      "width": 612,
      "height": 450,
      "url": "https://static.ah.nl/static/recepten/img_071515_612x450_JPG.jpg"
    },
    {
      "width": 220,
      "height": 162,
      "url": "https://static.ah.nl/static/recepten/img_071515_220x162_JPG.jpg"
    },
    {
      "width": 890,
      "height": 594,
      "url": "https://static.ah.nl/static/recepten/img_071515_890x594_JPG.jpg"
    },
    {
      "width": 302,
      "height": 220,
      "url": "https://static.ah.nl/static/recepten/img_071515_302x220_JPG.jpg"
    },
    {
      "width": 440,
      "height": 324,
      "url": "https://static.ah.nl/static/recepten/img_071515_440x324_JPG.jpg"
    },
    {
      "width": 1224,
      "height": 900,
      "url": "https://static.ah.nl/static/recepten/img_071515_1224x900_JPG.jpg"
    },
    {
      "width": 680,
      "height": 320,
      "url": "https://static.ah.nl/static/recepten/img_071515_680x320_JPG.jpg"
    },
    {
      "width": 1600,
      "height": 560,
      "url": "https://static.ah.nl/static/recepten/img_071515_1600x560_JPG.jpg"
    },
    {
      "width": 80,
      "height": 80,
      "url": "https://static.ah.nl/static/recepten/img_071515_Recipe_80.jpg"
    },
    {
      "width": 445,
      "height": 0,
      "url": "https://static.ah.nl/static/recepten/img_071515_445x_JPG.jpg"
    },
    {
      "width": 120,
      "height": 120,
      "url": "https://static.ah.nl/static/recepten/img_071515_Recipe_120.jpg"
    },
    {
      "width": 2048,
      "height": 1496,
      "url": "https://static.ah.nl/static/recepten/img_071515_2048x1496_JPG.jpg"
    },
    {
      "width": 890,
      "height": 0,
      "url": "https://static.ah.nl/static/recepten/img_071515_890x_JPG.jpg"
    }
  ],
  "stepByStepQuality": "PERFECT",
  "ingredients": [
    {
      "quantity": 1,
      "description": {
        "singular": "aubergine",
        "plural": "aubergines"
      },
      "completeText": "1 aubergine"
    },
    {
      "quantity": 1,
      "description": {
        "singular": "courgette",
        "plural": "courgettes"
      },
      "completeText": "1 courgette"
    },
    {
      "quantity": 1,
      "description": {
        "singular": "rode paprika",
        "plural": "rode paprika's"
      },
      "completeText": "1 rode paprika"
    },
    {
      "quantity": 1,
      "quantityUnit": {
        "singular": "teen",
        "plural": "tenen"
      },
      "description": {
        "singular": "knoflook",
        "plural": "knoflook"
      },
      "completeText": "1 teen knoflook"
    },
    {
      "quantity": 50,
      "quantityUnit": {
        "singular": "ml",
        "plural": "ml"
      },
      "description": {
        "singular": "traditionele olijfolie"
      },
      "completeText": "50 ml traditionele olijfolie"
    },
    {
      "quantity": 350,
      "quantityUnit": {
        "singular": "g",
        "plural": "g"
      },
      "description": {
        "singular": "kikkererwten in pot"
      },
      "additionalInfo": "afgespoeld en uitgelekt",
      "completeText": "350 g kikkererwten in pot"
    },
    {
      "quantity": 2,
      "quantityUnit": {
        "singular": "el",
        "plural": "el"
      },
      "description": {
        "singular": "citroensap"
      },
      "completeText": "2 el citroensap"
    },
    {
      "quantity": 1,
      "quantityUnit": {
        "singular": "tl",
        "plural": "tl"
      },
      "description": {
        "singular": "gemalen komijn"
      },
      "completeText": "1 tl gemalen komijn"
    },
    {
      "quantity": 1,
      "quantityUnit": {
        "singular": "el",
        "plural": "el"
      },
      "description": {
        "singular": "tahini in pot"
      },
      "additionalInfo": "sesampasta",
      "completeText": "1 el tahini in pot"
    },
    {
      "quantity": 225,
      "quantityUnit": {
        "singular": "g",
        "plural": "g"
      },
      "description": {
        "singular": "halloumi kaas"
      },
      "additionalInfo": "Griekse variant",
      "completeText": "225 g halloumi kaas"
    },
    {
      "quantity": 8,
      "description": {
        "singular": "verse groene asperge",
        "plural": "verse groene asperges"
      },
      "completeText": "8 verse groene asperges"
    },
    {
      "quantity": 4,
      "description": {
        "singular": "vloerkadet",
        "plural": "vloerkadetten"
      },
      "completeText": "4 vloerkadetten"
    }
  ],
  "kitchenAppliances": [
    {
      "quantity": 1,
      "scalable": false,
      "completeText": "barbecue"
    },
    {
      "quantity": 1,
      "scalable": false,
      "completeText": "staafmixer"
    }
  ],
  "tips": [],
  "tastyWith": [],
  "preparationSummary": [
    "Steek de barbecue aan. Snijd de aubergine en courgette in plakken van ca. 1 cm dik. Halveer de paprika, verwijder de zaadlijsten en snijd het vruchtvlees in 4 stukken. Doe alle gesneden groenten in een schaal. Snijd ½ teen knoflook fijn en voeg toe. Bestrooi met peper en zout en besprenkel met de olie. Schep om.",
    "Doe ondertussen de kikkererwten in een zeef, spoel af en laat uitlekken. Doe ze vervolgens in een hoge beker of kom. Voeg het citroensap, de rest van de knoflook, komijn en tahini toe. Pureer met de staafmixer tot een dikke puree. Breng op smaak met peper en zout. Gril de groenten 6 min. op de barbecue. Keer regelmatig. Doe ze terug in de schaal als ze gaar zijn.",
    "Snijd de halloumi in 8 plakken. Gril de plakken 3 min. op de barbecue. Keer halverwege. Snijd de vloerkadetten doormidden en gril de broodjes 1 min. op de snijkant. Besmeer alle broodhelften met houmous. Beleg met aubergine, groene asperges, halloumi, paprika en courgette. Dek af met de bovenste helften."
  ],
  "courseTypes": [],
  "popularityInformation": {
    "rating": {
      "averageRate": 3.62791,
      "numberOfRates": 43,
      "averageRateRounded": 4
    },
    "numberOfFavorites": 1748,
    "numberOfTimesInShoppingListLastWeek": 0
  },
  "nutricionalValues": [
    {
      "name": "energie",
      "unit": "kcal",
      "value": 590
    },
    {
      "name": "eiwit",
      "unit": "g",
      "value": 25
    },
    {
      "name": "koolhydraten",
      "unit": "g",
      "value": 49
    },
    {
      "name": "vet",
      "unit": "g",
      "value": 31
    },
    {
      "name": "waarvan verzadigd",
      "unit": "g",
      "value": 12
    },
    {
      "name": "natrium",
      "unit": "mg",
      "value": 710
    },
    {
      "name": "vezels",
      "unit": "g",
      "value": 8
    }
  ],
  "favourite": false
}

const expected = {"averageRate": 3.62791, "courses": ["hoofdgerecht"], "description": "Ooit wel eens zo'n lekkere burger zonder vlees van de barbecue gegeten? Doe ons er nog maar een! ", "imageLarge": "https://static.ah.nl/static/recepten/img_071515_2048x1496_JPG.jpg", "imageMedium": "https://static.ah.nl/static/recepten/img_071515_1024x748_JPG.jpg", "imageSmall": "https://static.ah.nl/static/recepten/img_071515_Recipe_300.jpg", "ingredients": ["aubergine", "aubergines", "courgette", "courgettes", "rode paprika", "rode paprika's", "knoflook", "knoflook", "traditionele olijfolie", "kikkererwten in pot", "citroensap", "gemalen komijn", "tahini in pot", "halloumi kaas", "verse groene asperge", "verse groene asperges", "vloerkadet", "vloerkadetten"], "kcal": 590, "kitchenAppliances": ["barbecue", "staafmixer"], "preparationSummary": ["Steek de barbecue aan. Snijd de aubergine en courgette in plakken van ca. 1 cm dik. Halveer de paprika, verwijder de zaadlijsten en snijd het vruchtvlees in 4 stukken. Doe alle gesneden groenten in een schaal. Snijd ½ teen knoflook fijn en voeg toe. Bestrooi met peper en zout en besprenkel met de olie. Schep om.", "Doe ondertussen de kikkererwten in een zeef, spoel af en laat uitlekken. Doe ze vervolgens in een hoge beker of kom. Voeg het citroensap, de rest van de knoflook, komijn en tahini toe. Pureer met de staafmixer tot een dikke puree. Breng op smaak met peper en zout. Gril de groenten 6 min. op de barbecue. Keer regelmatig. Doe ze terug in de schaal als ze gaar zijn.", "Snijd de halloumi in 8 plakken. Gril de plakken 3 min. op de barbecue. Keer halverwege. Snijd de vloerkadetten doormidden en gril de broodjes 1 min. op de snijkant. Besmeer alle broodhelften met houmous. Beleg met aubergine, groene asperges, halloumi, paprika en courgette. Dek af met de bovenste helften."], "recipeTime": 30, "servingType": "personen", "servingsNumber": 4, "sourceId": 1185786, "sourceUrl": "https://ms.ah.nl/rest/ah/v1/facades/recipes/1185786", "tagCloud": ["zonder vlees/vis", "barbecue", "mediterraan", "grillen"], "title": "Halloumiburgers met gegrilde groenten", "url": "https://www.ah.nl/allerhande/recept/R-R1185786"}
