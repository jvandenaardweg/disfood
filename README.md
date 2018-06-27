# disfood
Get a random receipe containing food ingredients you like by excluding ingredients you don't like

## Scheduled workers
Below are a few scheduled worker scripts. They should run every 24 hours.
1. `forever worker.js` get's all recipes from a source
2. `forever worker-labels.js` creates labels based on the recipe image and translates labels from English to Dutch

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
