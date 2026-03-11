import { buildSeasonSummary, getDriverName } from '@/lib/data';
import { Pill, SectionTitle, StatCard } from '@/components/ui';

export function DashboardPage() {
  const summary = buildSeasonSummary();
  const leader = summary.standings[0];
  const latest = summary.latestRace;
  const nextRace = summary.nextRace;

  return (
    <div className="stack-lg">
      <section className="hero">
        <div className="card">
          <p className="eyebrow">Broadcast mode fantasy league</p>
          <h2>{summary.completedRaceCount > 0 ? 'Race Shed Fantasy V2' : 'RACE-SHED-FANTASY command center'}</h2>
          <p className="hero-copy">
            Built for your Excel commissioner workflow and styled to feel more like a NASCAR broadcast board. This version is set up
            for weekly three-car picks, Sunday scoring, a TV-ready leaderboard, and a clean GitHub to Vercel deployment path.
          </p>
          <div className="stack-sm" style={{ marginTop: 16 }}>
            <div className="badge-row">
              <span>League identity</span>
              <Pill>{summary.standings.length} tracked players</Pill>
            </div>
            <div className="badge-row">
              <span>Scoring model</span>
              <Pill>1st = 55 pts • 2nd = 35 pts • 3 picks per player</Pill>
            </div>
            <div className="badge-row">
              <span>Commissioner workflow</span>
              <Pill>Excel → JSON/CSV → GitHub → Vercel</Pill>
            </div>
          </div>
        </div>

        <div className="card hero-panel">
          <div>
            <p className="eyebrow">Season leader</p>
            <div className="hero-score">
              <span>{leader?.player ?? 'TBD'}</span>
              <strong>{leader?.totalPoints ?? 0}</strong>
            </div>
            <p className="muted">{leader?.wins ?? 0} weekly wins • {leader?.average ?? 0} average points per race</p>
          </div>

          <div className="stack-sm">
            {latest ? (
              <div className="mini-card">
                <p className="tiny">Latest race winner</p>
                <strong>{latest.winner}</strong>
                <p className="muted">{latest.race.name} • winning car #{latest.race.winnerCar} {getDriverName(latest.race.winnerCar ?? 0)}</p>
              </div>
            ) : null}
            {nextRace ? (
              <div className="mini-card">
                <p className="tiny">Next race up</p>
                <strong>Week {nextRace.week}</strong>
                <p className="muted">{nextRace.name} • {nextRace.track} • {nextRace.date}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid-four">
        <StatCard label="Season Pot" value={`$${summary.seasonPot}`} subtext="Buy-ins tracked from submitted picks" />
        <StatCard label="Completed Races" value={summary.completedRaceCount} subtext="Season started at COTA" />
        <StatCard label="Upcoming Races" value={summary.upcomingRaceCount} subtext="Ready for the next Sunday slate" />
        <StatCard label="Total Entries" value={summary.activeEntries} subtext="Three-car pick slips logged so far" />
      </div>

      <section className="card">
        <SectionTitle title="Championship standings" subtitle="Season total, weekly wins, best week, and latest score swing." />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Tier</th>
                <th>Weeks</th>
                <th>Wins</th>
                <th>Best Week</th>
                <th>Last Week</th>
                <th>Total</th>
                <th>Avg</th>
              </tr>
            </thead>
            <tbody>
              {summary.standings.map((row, index) => (
                <tr key={row.player}>
                  <td>{index + 1}</td>
                  <td><strong>{row.player}</strong></td>
                  <td>{row.tier}</td>
                  <td>{row.playedWeeks}</td>
                  <td>{row.wins}</td>
                  <td>{row.bestWeek}</td>
                  <td>{row.lastWeekPoints}</td>
                  <td>{row.totalPoints}</td>
                  <td>{row.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid-two">
        <div className="card">
          <SectionTitle title="Recent race podium" subtitle={latest ? `${latest.race.name} • ${latest.race.track}` : 'No completed race yet'} />
          {latest ? (
            <ol className="podium-list">
              {latest.entries.slice(0, 3).map((entry) => (
                <li key={entry.player}>
                  <span>{entry.player}</span>
                  <strong>{entry.total} pts</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted">Add race results to see your latest podium.</p>
          )}
        </div>

        <div className="card">
          <SectionTitle title="This build is meant for both screens" subtitle="Clean enough for a laptop, bold enough for The Race Shed TV." />
          <div className="mini-grid">
            <div className="mini-card">
              <p className="tiny">Dashboard</p>
              <strong>Fast season view</strong>
              <p className="muted">Standings, pot, next race, and momentum.</p>
            </div>
            <div className="mini-card">
              <p className="tiny">Leaderboard</p>
              <strong>TV-ready</strong>
              <p className="muted">Big typography and at-a-glance stats.</p>
            </div>
            <div className="mini-card">
              <p className="tiny">Admin</p>
              <strong>Commissioner lane</strong>
              <p className="muted">Weekly update path from Excel to deploy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
