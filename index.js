const dropcss = require('dropcss')
const { getOptions } = require('loader-utils')
const concat = require('@ianwalter/concat')

module.exports = async function purgecssLoader (css) {
  const options = getOptions(this)
  options.html = await concat(...options.html)
  const cleaned = dropcss({ css, ...options })
  return cleaned.css
}
