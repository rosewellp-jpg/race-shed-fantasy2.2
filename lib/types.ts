export type PlayerTier = 'core' | 'occasional';

export type Player = {
  name: string;
  tier: PlayerTier;
  active: boolean;
};

export type Driver = {
  carNumber: number;
  name: string;
  team: string;
};

export type Result = {
  position: number;
  carNumber: number;
};

export type Race = {
  id: number;
  week: number;
  name: string;
  track: string;
  date: string;
  status: 'completed' | 'upcoming';
  winnerCar: number | null;
  results: Result[];
};

export type Pick = {
  raceId: number;
  player: string;
  cars: number[];
};

export type LeagueData = {
  league: {
    name: string;
    season: number;
    entryFee: number;
    players: Player[];
    corePlayers: string[];
    occasionalPlayers: string[];
  };
  pointsTable: Record<string, number>;
  drivers: Driver[];
  races: Race[];
  picks: Pick[];
};

export type StandingRow = {
  player: string;
  tier: string;
  playedWeeks: number;
  wins: number;
  feesPaid: number;
  totalPoints: number;
  average: number;
  bestWeek: number;
  lastWeekPoints: number;
};

export type WeeklyEntry = {
  player: string;
  cars: number[];
  breakdown: {
    carNumber: number;
    position: number | null;
    points: number;
  }[];
  total: number;
};

export type WeeklyRaceSummary = {
  race: Race;
  winner: string;
  entries: WeeklyEntry[];
  activePlayers: number;
  pot: number;
};
