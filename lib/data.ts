import rawData from '@/data/league-data.json';
import { LeagueData, StandingRow, WeeklyEntry, WeeklyRaceSummary } from '@/lib/types';

const data = rawData as LeagueData;

function normalizeLeagueData(source: LeagueData): LeagueData {
  if (source.league.players?.length) return source;

  return {
    ...source,
    league: {
      ...source.league,
      players: [
        ...source.league.corePlayers.map((name) => ({ name, tier: 'core' as const, active: true })),
        ...source.league.occasionalPlayers.map((name) => ({ name, tier: 'occasional' as const, active: true })),
      ],
    },
  };
}

const normalized = normalizeLeagueData(data);

export function getLeagueData() {
  return normalized;
}

export function getPlayers() {
  return normalized.league.players;
}

export function getCompletedRaces() {
  return normalized.races.filter((race) => race.status === 'completed');
}

export function getUpcomingRaces() {
  return normalized.races.filter((race) => race.status === 'upcoming');
}

export function getRaceById(raceId: number) {
  return normalized.races.find((race) => race.id === raceId);
}

export function getDriverName(carNumber: number) {
  return normalized.drivers.find((driver) => driver.carNumber === carNumber)?.name ?? `Car ${carNumber}`;
}

export function getDriverTeam(carNumber: number) {
  return normalized.drivers.find((driver) => driver.carNumber === carNumber)?.team ?? 'Unknown Team';
}

export function getPointsForPosition(position?: number | null) {
  if (!position) return 0;
  return normalized.pointsTable[String(position)] ?? 0;
}

export function getResultPosition(raceId: number, carNumber: number) {
  const race = getRaceById(raceId);
  return race?.results.find((result) => result.carNumber === carNumber)?.position ?? null;
}

export function scorePick(raceId: number, carNumber: number) {
  return getPointsForPosition(getResultPosition(raceId, carNumber));
}

export function buildWeeklyEntries(raceId: number): WeeklyEntry[] {
  return normalized.picks
    .filter((pick) => pick.raceId === raceId)
    .map((pick) => {
      const breakdown = pick.cars.map((carNumber) => ({
        carNumber,
        position: getResultPosition(raceId, carNumber),
        points: scorePick(raceId, carNumber),
      }));

      return {
        player: pick.player,
        cars: pick.cars,
        breakdown,
        total: breakdown.reduce((sum, item) => sum + item.points, 0),
      };
    })
    .sort((a, b) => b.total - a.total || a.player.localeCompare(b.player));
}

export function buildWeeklySummary(): WeeklyRaceSummary[] {
  return getCompletedRaces().map((race) => {
    const entries = buildWeeklyEntries(race.id);
    const activePlayers = entries.length;
    return {
      race,
      winner: entries[0]?.player ?? 'TBD',
      entries,
      activePlayers,
      pot: activePlayers * normalized.league.entryFee,
    };
  });
}

export function buildPlayerStandings(): StandingRow[] {
  const completedRaces = getCompletedRaces();
  const latestCompleted = completedRaces.at(-1);

  return getPlayers()
    .map((player) => {
      const playerPicks = normalized.picks.filter((pick) => pick.player === player.name);
      const weeklyTotals = playerPicks.map((pick) => pick.cars.reduce((sum, car) => sum + scorePick(pick.raceId, car), 0));
      const totalPoints = weeklyTotals.reduce((sum, total) => sum + total, 0);
      const wins = completedRaces.filter((race) => buildWeeklyEntries(race.id)[0]?.player === player.name).length;
      const playedWeeks = playerPicks.length;
      const lastWeekPoints = latestCompleted
        ? normalized.picks
            .filter((pick) => pick.raceId === latestCompleted.id && pick.player === player.name)
            .flatMap((pick) => pick.cars)
            .reduce((sum, car) => sum + scorePick(latestCompleted.id, car), 0)
        : 0;

      return {
        player: player.name,
        tier: player.tier === 'core' ? 'Core' : 'Occasional',
        playedWeeks,
        wins,
        feesPaid: playedWeeks * normalized.league.entryFee,
        totalPoints,
        average: playedWeeks ? Number((totalPoints / playedWeeks).toFixed(1)) : 0,
        bestWeek: weeklyTotals.length ? Math.max(...weeklyTotals) : 0,
        lastWeekPoints,
      };
    })
    .filter((row) => row.playedWeeks > 0 || row.tier === 'Core')
    .sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins || a.player.localeCompare(b.player));
}

export function buildDriverStats() {
  return normalized.drivers
    .map((driver) => {
      const finishes = getCompletedRaces()
        .map((race) => race.results.find((result) => result.carNumber === driver.carNumber)?.position)
        .filter((value): value is number => typeof value === 'number');

      const timesPicked = normalized.picks.reduce((count, pick) => count + pick.cars.filter((car) => car === driver.carNumber).length, 0);
      const top10s = finishes.filter((finish) => finish <= 10).length;
      const podiums = finishes.filter((finish) => finish <= 3).length;
      const wins = finishes.filter((finish) => finish === 1).length;

      return {
        ...driver,
        startsTracked: finishes.length,
        bestFinish: finishes.length ? Math.min(...finishes) : null,
        averageFinish: finishes.length ? Number((finishes.reduce((sum, finish) => sum + finish, 0) / finishes.length).toFixed(1)) : null,
        worstFinish: finishes.length ? Math.max(...finishes) : null,
        top10s,
        podiums,
        wins,
        timesPicked,
      };
    })
    .sort((a, b) => b.wins - a.wins || b.top10s - a.top10s || (a.averageFinish ?? 999) - (b.averageFinish ?? 999));
}

export function buildSeasonSummary() {
  const standings = buildPlayerStandings();
  const weekly = buildWeeklySummary();
  const completedRaces = getCompletedRaces();
  const upcoming = getUpcomingRaces();

  return {
    standings,
    weekly,
    completedRaceCount: completedRaces.length,
    upcomingRaceCount: upcoming.length,
    seasonPot: standings.reduce((sum, row) => sum + row.feesPaid, 0),
    activeEntries: normalized.picks.length,
    nextRace: upcoming[0] ?? null,
    latestRace: weekly.at(-1) ?? null,
  };
}
