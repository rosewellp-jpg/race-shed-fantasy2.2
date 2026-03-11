# RACE-SHED-FANTASY V2

A broadcast-style NASCAR fantasy league app built to pair with an Excel commissioner workbook and deploy cleanly to GitHub + Vercel.

## What is included

- Dashboard home page with season cards, recent podium, next race, and standings
- TV Leaderboard page with large-format race-shed display styling
- Race Schedule page
- Weekly Picks page with scored breakdowns
- Race Results page with weekly totals and pot tracking
- Driver Stats page with wins, podiums, top 10s, and pick counts
- Commissioner Admin page with the weekly workflow and repo structure
- Seed 2026 league data in `data/league-data.json`
- CSV templates and a working sync script in `imports/` and `scripts/sync-data.mjs`

## Current starter data loaded

This V2 build includes a starter version of your 2026 league with:

- League name: `RACE-SHED-FANTASY`
- Core players: Meg, Pat, Darin, Alz, Joe
- Occasional players: Deric, Eve
- Tracked races: COTA and Phoenix
- Next race placeholder: Las Vegas
- Picks and results based on the race details shared so far

## Local setup

```bash
npm install
npm run dev
```

## Weekly commissioner workflow

1. Update the Excel workbook tabs.
2. Export the matching tabs to CSV.
3. Place those files in `/imports` using the same filenames as the templates.
4. Run `npm run sync:data`.
5. Review the site locally.
6. Commit and push to GitHub.
7. Vercel redeploys the update.

## CSV files expected by the sync script

- `players.csv`
- `drivers.csv`
- `race_schedule.csv`
- `weekly_picks.csv`
- `race_results.csv`

Template files are already included in `/imports/templates`.

## GitHub setup

Upload the full unzipped project contents to GitHub:

```bash
git init
git add .
git commit -m "Build RACE-SHED-FANTASY V2"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Vercel deployment

1. Import the GitHub repo into Vercel.
2. Framework preset: `Next.js`
3. Build command: `next build`
4. Leave the output settings as default.
5. Deploy.

## Important note about editing live data

This V2 build is still a Git-based commissioner workflow. It does not include a live database or browser-side admin writes.

That means:

- Excel can stay your source of truth
- GitHub stores your current app state
- Vercel publishes the latest push

## Recommended V3 ideas

- Password-protected commissioner page
- CSV drag-and-drop upload UI
- Supabase or Neon database for live updates without Git commits
- Prize ledger and winnings history
- Player profile pages
- Race-by-race trend charts
