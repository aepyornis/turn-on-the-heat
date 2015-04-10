# turn-on-the-heat

Displaying, analyzing, visualizing and investigating heat & hot water complaints in New York City.

## uses:

  * Bootstrap 3.3.2
  * Leaflet 0.7.3
  * node v0.10
  * express 4.12
  * python to download and handle HPD data
  * tiles generated with TileMill

## files:

  * server.js: run 'node server.js' to start server. Go to localhost:300.
  * download_all _complaints.js: downloads all complaints as an array of JSON objects to folder ./data/json. You might have to create that folder beforehand. Each day is saved as a separate file: i.e. '2014-12-01.txt'
  * csv_generator.py: reads txt/json files created by  the above script, adds bbl using nyc geoclient and saves each one as a .csv file in ./data/csv
  * sql_generator.py: reads csv files created from csv_generator, geocodes them with the NYC geoclient API, and creates a SQL file. Includes INSERT and CREATE TABLE statements. 
  * pluto_to_sql.py: generates SQL file from pluto data
  * dob_parser: Inserts dobjobs data into postgres. See [Dobjobs](https://github.com/aepyornis/DOB-Jobs)
  * super-complaints.sql: creates the full database table with all three sources joined. 

## todo

  * filter options?
  * another zoom level
  * automatic database update?
  * 