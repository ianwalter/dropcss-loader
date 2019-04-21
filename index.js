const dropcss = require('dropcss')
const { getOptions } = require('loader-utils')
const mapFiles = require('map-files')

const toString = (acc, file) => acc + file.contents.toString()

module.exports = function purgecssLoader (css) {
  const options = getOptions(this)
  options.html = Object.values(mapFiles(options.html)).reduce(toString, '')
  const cleaned = dropcss({ css, ...options })
  return cleaned.css
}
