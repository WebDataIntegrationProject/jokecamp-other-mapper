const fs = require('fs')
const path = require('path')

const xmlBuilder = require('./xmlBuilder')

function getFilePath(filename, folder) {
  return path.join(__dirname, folder, filename)
}

function writeXml(obj, filename) {
  const str = xmlBuilder.buildXmlString(obj, filename)
  const filepath = getFilePath(filename, 'output-data')
  fs.writeFileSync(filepath, str)
}

module.exports = {
  writeXml
}
