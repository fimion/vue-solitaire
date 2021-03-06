const path = require('path')

function resolveSrc(_path) {
  return path.resolve(__dirname, _path)
}


const aliases = {
  '@components': 'src/components',
  '@assets': 'src/assets',
  '@store': 'src/store',
  '@global': 'src/global',
  '@class': 'src/class',
  '@template': 'src/template',
  '@src': 'src',
}


module.exports = {
  webpack: {},
  vite:[],
}

for(const alias in aliases){
  const aliasTo = aliases[alias]
  module.exports.webpack[alias] = resolveSrc(aliasTo)
  module.exports.vite.push({find:new RegExp(alias), replacement:resolveSrc(aliasTo)})
}
