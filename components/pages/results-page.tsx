import { buildWeeklySummary, getDriverName } from '@/lib/data';
import { Pill, SectionTitle } from '@/components/ui';

export function ResultsPage() {
  const weekly = buildWeeklySummary();

  return (
    <div className="stack-lg">
      {weekly.map(({ race, entries, pot, winner }) => (
        <section className="card" key={race.id}>
          <SectionTitle
            title={race.name}
            subtitle={`${race.track} • ${race.date}`}
            right={<Pill>{winner} won the week • ${pot} pot</Pill>}
          />
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
                  <tr key={entry.player}>
                    <td><strong>{entry.player}</strong></td>
                    {entry.breakdown.map((item) => (
                      <td key={`${entry.player}-${item.carNumber}`}>
                        #{item.carNumber} {getDriverName(item.carNumber)}
                        <div className="tiny">P{item.position ?? '-'} • {item.points} pts</div>
                      </td>
                    ))}
                    <td>{entry.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
