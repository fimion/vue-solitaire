module.exports = {
  pwa: {
    name: "Vue Solitaire",
  },
  configureWebpack:{
    resolve:{
      alias:require('./aliases.config.js').webpack,
    },
  },
}
