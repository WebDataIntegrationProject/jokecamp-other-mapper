const mapPosition = require('./mapPosition')

function mapPlayer(player, date) {
  return {
    fullName: player.name,
    birthDate: undefined,
    birthplace: undefined,
    nationality: undefined,
    height: player.height,
    weight: undefined,
    shirtNumberOfClub: player.shirt,
    shirtNumberOfNationalTeam: undefined,
    position: mapPosition(player.position),
    preferedFoot: undefined,
    caps: undefined,
    isInNationalTeam: undefined,
    clubMembershipValidAsOf: date
  }
}

module.exports = mapPlayer
