const _ = require('lodash')

function mapPosition(position) {
  if (!position || position === 'Sub') return null
  if (position === 'GK') return 'GK'
  if (_.includes(['DC', 'DR', 'DL'] ,position)) return 'DF'
  if (_.includes(['MC', 'ML', 'MR', 'DMC', 'DML', 'DMR', 'AMC', 'AMR', 'AML'] ,position)) return 'MF'
  if (_.includes(['FW', 'FWL', 'FWR'] ,position)) return 'FW'
  return null
}

module.exports = mapPosition
