import { buildPlayerStandings } from '@/lib/data';

export function TvLeaderboardPage() {
  const standings = buildPlayerStandings();

  return (
    <div className="tv-board">
      <div className="tv-header">
        <p className="eyebrow">Live from The Race Shed</p>
        <h2>Championship Leaderboard</h2>
        <p className="muted">Built for the wall-mounted TV, Sunday watch parties, and instant bragging rights.</p>
      </div>

      <div className="tv-grid">
        {standings.map((row, index) => (
          <div key={row.player} className="tv-row card">
            <div className="tv-rank">{index + 1}</div>
            <div>
              <p className="tv-player">{row.player}</p>
              <p className="muted">{row.tier} player • {row.playedWeeks} starts • {row.wins} weekly wins</p>
            </div>
            <div className="tv-meta hide-sm">
              <p className="tiny">Last week</p>
              <strong>{row.lastWeekPoints}</strong>
            </div>
            <div className="tv-meta hide-sm">
              <p className="tiny">Best week</p>
              <strong>{row.bestWeek}</strong>
            </div>
            <div className="tv-meta hide-md">
              <p className="tiny">Average</p>
              <strong>{row.average}</strong>
            </div>
            <div className="tv-score">{row.totalPoints}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
