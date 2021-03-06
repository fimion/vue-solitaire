const path = require('path')

module.exports = {
  pwa: {
    name: "Vue Solitaire",
  },
  configureWebpack:{
    resolve:{
      alias:require('./aliases.config.js').webpack,
    },
  },
  chainWebpack(config){
      config.plugin('html').tap((options)=>{
        options[0].template = path.join(__dirname, 'index.html')
        return options
      })
  },
}
