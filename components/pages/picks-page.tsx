import { buildWeeklyEntries, getDriverName, getLeagueData } from '@/lib/data';
import { EmptyState, Pill, SectionTitle } from '@/components/ui';

export function PicksPage() {
  const data = getLeagueData();

  return (
    <div className="stack-lg">
      {data.races.map((race) => {
        const entries = buildWeeklyEntries(race.id);
        return (
          <section className="card" key={race.id}>
            <SectionTitle
              title={`Week ${race.week}: ${race.name}`}
              subtitle={`${race.track} • ${race.date}`}
              right={<Pill>{entries.length} pick slips</Pill>}
            />
            {entries.length ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Pick 1</th>
                      <th>Pick 2</th>
                      <th>Pick 3</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={`${race.id}-${entry.player}`}>
                        <td><strong>{entry.player}</strong></td>
                        {entry.breakdown.map((item) => (
                          <td key={`${entry.player}-${item.carNumber}`}>
                            #{item.carNumber} {getDriverName(item.carNumber)}
                            {race.status === 'completed' ? <div className="tiny">P{item.position ?? '-'} • {item.points} pts</div> : null}
                          </td>
                        ))}
                        <td>{race.status === 'completed' ? entry.total : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No picks added yet" copy="Drop in this week's three-car picks and this race will populate automatically." />
            )}
          </section>
        );
      })}
    </div>
  );
}
