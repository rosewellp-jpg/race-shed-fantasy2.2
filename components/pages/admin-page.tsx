import { getLeagueData } from '@/lib/data';
import { Pill, SectionTitle } from '@/components/ui';

const repoTree = `race-shed-fantasy/
├── app/
├── components/
├── data/league-data.json
├── imports/
│   └── templates/
├── lib/
├── public/
├── scripts/sync-data.mjs
├── package.json
└── README.md`;

export function AdminPage() {
  const data = getLeagueData();

  return (
    <div className="stack-lg">
      <section className="card">
        <SectionTitle title="Commissioner workflow" subtitle="Built around the exact weekly rhythm you described." right={<Pill>${data.league.entryFee} weekly buy-in</Pill>} />
        <div className="stack-sm">
          <p><strong>Setup:</strong> maintain players, buy-in, and scoring rules in Excel first.</p>
          <p><strong>Weekly Picks:</strong> enter each player and their 3 car numbers.</p>
          <p><strong>Race Results:</strong> paste in finishing positions after the race ends.</p>
          <p><strong>Race Summary:</strong> review the scored week and confirm the winner.</p>
          <p><strong>Repo update:</strong> sync the site data, commit to GitHub, and let Vercel redeploy the broadcast board.</p>
        </div>
      </section>

      <section className="grid-two">
        <div className="card">
          <SectionTitle title="League config" subtitle="This is the current JSON league setup loaded by the app." />
          <pre className="admin-code">{JSON.stringify(data.league, null, 2)}</pre>
        </div>
        <div className="card">
          <SectionTitle title="Repo structure" subtitle="These are the files and folders you upload to GitHub." />
          <pre className="admin-code">{repoTree}</pre>
        </div>
      </section>

      <section className="card">
        <SectionTitle title="Weekly deployment path" subtitle="The cleanest V2 commissioner lane for now." />
        <ol className="plain-list">
          <li>Update the Excel commissioner workbook after each race.</li>
          <li>Export or edit the matching CSV/JSON source files inside <code>imports</code> or <code>data</code>.</li>
          <li>Run <code>npm run sync:data</code> locally if you are using CSV templates.</li>
          <li>Review the site in local dev with <code>npm run dev</code>.</li>
          <li>Commit and push to GitHub.</li>
          <li>Vercel redeploys the latest standings automatically.</li>
        </ol>
      </section>

      <section className="card">
        <SectionTitle title="Excel tabs to mirror" subtitle="These are the workbook pages this app is designed to pair with." />
        <div className="mini-grid">
          {['Setup', 'Points System', 'Race Schedule', 'Weekly Picks', 'Race Summary', 'Race Results', 'Driver Stats', 'Dashboard', 'TV Leaderboard'].map((tab) => (
            <div key={tab} className="mini-card">
              <p className="tiny">Workbook tab</p>
              <strong>{tab}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
