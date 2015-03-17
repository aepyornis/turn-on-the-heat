# turn-on-the-heat

Displaying, analyzing, visualizing and investigating heat & hot water complaints in New York City.

## uses:

  * Bootstrap 3.3.2
  * Leaflet 0.7.3
  * node v0.10
  * express 4.12
  * python to download and handle HPD data

## files:

  * server.js -> run 'node server.js' to start server. Go to localhost:8080.
  * download_all _complaints.js -> downloads all complaints as an array of JSON objects to folder ./data/json. You might have to create that folder beforehand. Each day is saved as a separate file: i.e. '2014-12-01.txt'
  * csv_generator.py -> reads txt/json files created by  the above script, adds bbl using nyc geoclient and saves each one as a .csv file in ./data/csv
  * sql_generator.py -> reads csv files created from csv_generator and creates a SQL file. Includes INSERT and CREATE TABLE statements. 

## todo

  * correctly send yesterday's data to client
  * filter options