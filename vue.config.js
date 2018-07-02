const fs = require('fs')

function loadFiles(files) {
  return files.map(fileName => fs.readFileSync(fileName, 'utf-8')).join('\n')
}


// See: https://github.com/vuejs/vue-cli/blob/dev/docs/config.md
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: loadFiles(['./src/styles/_variables.scss', './src/styles/_mixins.scss'])
      }
    }
  },
  pwa: {
    name: 'Disfood',
    themeColor: '#2e63b1',
    msTileColor: '#2e63b1',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true
    }
  },
  devServer: {
    port: 8080
  },
  pluginOptions: {
    critical: {
      width: 375,
      height: 565
    }
  }
}
