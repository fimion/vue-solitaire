const path = require('path')


function resolveSrc(_path) {
  return path.resolve(__dirname, _path)
}

module.exports = {
  pwa: {
    name: "Vue Solitaire",
  },
  configureWebpack:{
    resolve:{
      alias:{
        '^':resolveSrc('./src'),
        '^components': resolveSrc('./src/components'),
        '^assets': resolveSrc('./src/assets'),
        '^store': resolveSrc('./src/store'),
        '^global': resolveSrc('./src/global'),
      },
    },
  },
}
