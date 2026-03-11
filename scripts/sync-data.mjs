import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const importsDir = path.join(root, 'imports');
const dataFile = path.join(root, 'data', 'league-data.json');
const reportFile = path.join(importsDir, 'last-sync-report.json');

const expectedFiles = ['players.csv', 'drivers.csv', 'race_schedule.csv', 'weekly_picks.csv', 'race_results.csv'];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function exists(file) {
  return fs.existsSync(path.join(importsDir, file));
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];

  const parseLine = (line) => {
    const cells = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    cells.push(current.trim());
    return cells;
  };

  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {});
  });
}

function csvRows(file) {
  return parseCsv(fs.readFileSync(path.join(importsDir, file), 'utf8'));
}

function numberOrNull(value) {
  if (value === '' || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

const data = readJson(dataFile);
const filesFound = expectedFiles.filter(exists);

if (exists('players.csv')) {
  const rows = csvRows('players.csv');
  data.league.players = rows.map((row) => ({
    name: row.name,
    tier: row.tier === 'occasional' ? 'occasional' : 'core',
    active: row.active ? row.active.toLowerCase() !== 'false' : true,
  }));
  data.league.corePlayers = data.league.players.filter((player) => player.tier === 'core').map((player) => player.name);
  data.league.occasionalPlayers = data.league.players.filter((player) => player.tier === 'occasional').map((player) => player.name);
}

if (exists('drivers.csv')) {
  data.drivers = csvRows('drivers.csv').map((row) => ({
    carNumber: Number(row.carNumber),
    name: row.name,
    team: row.team,
  }));
}

if (exists('race_schedule.csv')) {
  data.races = csvRows('race_schedule.csv').map((row) => ({
    id: Number(row.id),
    week: Number(row.week),
    name: row.name,
    track: row.track,
    date: row.date,
    status: row.status === 'completed' ? 'completed' : 'upcoming',
    winnerCar: numberOrNull(row.winnerCar),
    results: [],
  }));
}

if (exists('weekly_picks.csv')) {
  data.picks = csvRows('weekly_picks.csv').map((row) => ({
    raceId: Number(row.raceId),
    player: row.player,
    cars: [row.car1, row.car2, row.car3].map(Number),
  }));
}

if (exists('race_results.csv')) {
  const resultRows = csvRows('race_results.csv');
  const grouped = new Map();

  for (const row of resultRows) {
    const raceId = Number(row.raceId);
    const entry = grouped.get(raceId) ?? [];
    entry.push({ position: Number(row.position), carNumber: Number(row.carNumber) });
    grouped.set(raceId, entry);
  }

  data.races = data.races.map((race) => ({
    ...race,
    results: grouped.get(race.id) ?? race.results ?? [],
  }));
}

fs.writeFileSync(dataFile, `${JSON.stringify(data, null, 2)}\n`);

const report = {
  syncedAt: new Date().toISOString(),
  importsFound: filesFound,
  outputFile: dataFile,
  totals: {
    players: data.league.players?.length ?? 0,
    drivers: data.drivers.length,
    races: data.races.length,
    picks: data.picks.length,
    completedRaces: data.races.filter((race) => race.status === 'completed').length,
  },
};

fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
