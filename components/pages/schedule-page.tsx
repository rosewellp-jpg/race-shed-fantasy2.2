import { getLeagueData } from '@/lib/data';
import { Pill, SectionTitle } from '@/components/ui';

export function SchedulePage() {
  const data = getLeagueData();

  return (
    <section className="card">
      <SectionTitle
        title="Race schedule"
        subtitle="Mirror this page to your Excel Race Schedule tab so the repo and workbook stay aligned."
        right={<Pill>{data.races.length} races loaded</Pill>}
      />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Race</th>
              <th>Track</th>
              <th>Status</th>
              <th>Winning Car</th>
            </tr>
          </thead>
          <tbody>
            {data.races.map((race) => (
              <tr key={race.id}>
                <td>{race.week}</td>
                <td>{race.date}</td>
                <td><strong>{race.name}</strong></td>
                <td>{race.track}</td>
                <td>{race.status}</td>
                <td>{race.winnerCar ? `#${race.winnerCar}` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
