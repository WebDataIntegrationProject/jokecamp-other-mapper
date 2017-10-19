function mapClub(match, side, date) {
  return {
    date,
    name: match[`${side}_team_name`],
    coutry: undefined,
    nameOfStadium: side === 'home' ? match.venue_name : undefined,
    cityOfStadium: undefined,
    stadiumCapacity: undefined,
    league: match.competition[0].split(' - ')[0]
  }
}

module.exports = mapClub
