import { buildDriverStats } from '@/lib/data';
import { Pill, SectionTitle } from '@/components/ui';

export function DriverStatsPage() {
  const drivers = buildDriverStats();

  return (
    <section className="card">
      <SectionTitle
        title="Driver stats"
        subtitle="Use this page to spot hot cars, reliable plays, and popular picks across your league."
        right={<Pill>{drivers.length} tracked cars</Pill>}
      />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Car</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Starts</th>
              <th>Wins</th>
              <th>Podiums</th>
              <th>Top 10s</th>
              <th>Best</th>
              <th>Avg</th>
              <th>Picked</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.carNumber}>
                <td><strong>#{driver.carNumber}</strong></td>
                <td>{driver.name}</td>
                <td>{driver.team}</td>
                <td>{driver.startsTracked}</td>
                <td>{driver.wins}</td>
                <td>{driver.podiums}</td>
                <td>{driver.top10s}</td>
                <td>{driver.bestFinish ?? '—'}</td>
                <td>{driver.averageFinish ?? '—'}</td>
                <td>{driver.timesPicked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
