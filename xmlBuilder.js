const _ = require('lodash')
const builder = require('xmlbuilder')

function buildXmlString(clubs, filename) {

  const xmlOptions = {
    version: '1.0',
    encoding: 'UTF-8'
  }
  const clubsElement = builder.create('clubs', xmlOptions)
  
  _.forEach(clubs, (club) => {
    const clubElement = clubsElement.ele('club')
    _.forEach(club, (clubValue, clubKey) => {
      if (clubKey !== 'players') {
        clubElement.ele(clubKey, clubValue)
      } else {
        const playersElement = clubElement.ele('players')
        _.forEach(club.players, (player) => {
          const playerElement = playersElement.ele('player')
          _.forEach(player, (playerValue, playerKey) => {
            playerElement.ele(playerKey, playerValue)
          })
        })
      }
    })
  })
  
  return clubsElement.end({ pretty: true })
}

module.exports = {
  buildXmlString
}
