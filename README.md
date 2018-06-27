# disfood
Door aan te geven welke ingrediënten je niet lust worden suggesties gegeven voor gerechten die je kan maken met ingrediënten te koop in jouw lokale supermarkt. Momenteel wordt alleen Albert Heijn ondersteund maar willen wij dit concept uitrollen voor alle bekende supermarkten in Nederland. 

## Waarom?
Vaak weten we juist meer wat we níet willen eten, dan wat we wél willen eten. Laat deze app voor je werken op momenten dat je even niet meer weet waar je trek in hebt. In plaats van aan te geven wat je wel zou willen eten kan je met deze app aangeven wat je juist *niet* wilt eten. Ben je geen fan van spruitjes? Of rode bietjes? Geef dat op in de app en je zal geen gerechten zien waar dat in zit. Dat maakt de keus wat makkelijker op momenten dat je snel inspiratie nodig hebt.

Daarbij komt ook: gerechten waarvan je weet dat je ze bij je lokale supermarkt kan kopen zal je ook sneller maken; brengt stukje gemak met zich mee. Daarom tonen we gerechten per winkel, zo kan jij je tijd efficiënter kan indelen.

Met behulp van machine learning worden gerechten suggesties specifieker aangepast op jouw wensen. Waardoor je zelf nog minder hoeft na te denken. 

## Scheduled workers
Below are a few scheduled worker scripts. They should run every 24 hours.
1. `forever worker.js` get's all recipes from a source
2. `forever worker-labels.js` creates labels based on the recipe image and translates labels from English to Dutch
3. 
## Image Labelling using Google Cloud Vision API
Images from the source website go through Google's Cloud Vision API to detect labels. The labels can be used to further specify recipes. Although this is not 100% correct, we can use the `score` and `topicality` to determine a treshold.

Use `GOOGLE_CLOUD_VISION_CREDENTIALS` env var for the JSON credentials.

## Development ENV variables
Use the following env variables for local development:
`ACCESS_TOKEN=` < ask repo maintainer
`BASE_URL=` < ask repo maintainer
`RECIPE_BASE_URL=` < ask repo maintainer
`NODE_ENV=development`
`DATABASE_URL=postgres://disfood:disfood@localhost:5432/disfood`
`REDIS_URL=redis://localhost:6381`
`POSTGRES_PASSWORD=disfood`
`POSTGRES_USER=disfood`
`POSTGRES_DB=disfood`

The `POSTGRES_PASSWORD`, `POSTGRES_USER`, `POSTGRES_DB` is used for Docker to create that database in a container on your local machine. Don't use those credentials in the project files. Instead, use `DATABASE_URL`.
