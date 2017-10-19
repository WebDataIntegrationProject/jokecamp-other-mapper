const _ = require('lodash')
const moment = require('moment')

const { writeXml } = require('./database')
const mapPlayer = require('./helpers/mapPlayer')
const mapClub = require('./helpers/mapClub')

const ratings = require('./input-data/ratings')

function getDate(str) {
  return moment(str).format('YYYY-MM-DD')
}

// const sample = _.sampleSize(ratings, 2)

const players = _.chain(ratings)
  .flatMap((match) => {
    const homeTeamPlayers = _.map(match.home_team_players, (player, id) => {
      const date = getDate(match.start_time)
      return _.merge(
        mapPlayer(player, date),
        { id, club_id: match.home_team_id }
      )
    })
    const awayTeamPlayers = _.map(match.away_team_players, (player, id) => {
      const date = getDate(match.start_time)
      return _.merge(
        mapPlayer(player, date),
        { id, club_id: match.away_team_id }
      )
    })
    return _.union(homeTeamPlayers, awayTeamPlayers)
  })
  .groupBy('id')
  .flatMap(playerGroup => _.maxBy(playerGroup, 'clubMembershipValidAsOf'))
  .map(player => _.omit(player, ['id']))
  .value()

const clubs = _.chain(ratings)
  .flatMap((match) => {
    const date = getDate(match.start_time)
    const homeTeam = _.merge(mapClub(match, 'home', date), { id: match.home_team_id })
    const awayTeam = _.merge(mapClub(match, 'away', date), { id: match.away_team_id })
    return [homeTeam, awayTeam]
  })
  .groupBy('id')
  .flatMap((clubGroup) => {
    const mostRecentClubEntryWithStadium = _.chain(clubGroup)
      .filter(club => club.nameOfStadium)
      .maxBy('date')
      .value()
    const nameOfStadium = _.get(mostRecentClubEntryWithStadium, 'nameOfStadium')
    const mostRecentClubEntry = _.maxBy(clubGroup, 'date')
    mostRecentClubEntry.nameOfStadium = nameOfStadium
    return mostRecentClubEntry
  })
  .value()

const playersGroupedByClub = _.groupBy(players, 'club_id')

const clubsWithPlayers = _.map(clubs, (club) => {
  const players = playersGroupedByClub[`${club.id}`]
  return _.merge(
    _.omit(club, ['id', 'date']),
    {
      players: _.map(players, player => _.omit(player, 'club_id'))
    }
  )
})

console.log(`Number of clubs: ${clubsWithPlayers.length}`)
const numberOfPlayers = _.chain(clubsWithPlayers).flatMap(club => club.players).size().value()
console.log(`Number of players: ${numberOfPlayers}`)

writeXml(clubsWithPlayers, 'jokecamp-others.xml')
