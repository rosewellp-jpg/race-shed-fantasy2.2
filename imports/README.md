Drop CSV exports from your Excel commissioner workbook in this folder.

Recommended CSV filenames:
- players.csv
- drivers.csv
- race_schedule.csv
- weekly_picks.csv
- race_results.csv

Then run:

npm run sync:data

This V2 sync script can rebuild `data/league-data.json` from those CSVs.
Use the files in `/imports/templates` as the header format.
