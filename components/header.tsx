import Link from 'next/link';

const links = [
  ['Dashboard', '/'],
  ['TV Leaderboard', '/leaderboard'],
  ['Schedule', '/schedule'],
  ['Weekly Picks', '/picks'],
  ['Race Results', '/results'],
  ['Driver Stats', '/drivers'],
  ['Admin', '/admin'],
];

export function Header() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Sunday afternoon battle board</p>
        <h1>RACE-SHED-FANTASY</h1>
        <p className="muted subhead">Excel commissioner workbook + GitHub repo + Vercel broadcast board.</p>
      </div>
      <nav className="navgrid">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="navlink">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
