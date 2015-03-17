import json
from nyc_geoclient import Geoclient
import os

# geoclienet api tokens and setup

g = Geoclient('a24f63ab', '47bd8f72f07c547b4cfc72e7f0a6ad67')

# string -> string
def trim(str):
 return ' '.join(str.split())

# dict -> string
def json_to_csv(complaint):

  def handle_null(key, quotes):
    if key in complaint and quotes:
      return ("'" + complaint[key] + "',")
    elif key in complaint:
      return (complaint[key] + ",")
    else:
      return "NULL,"

  string = ''
  string += (complaint['unique_key'] + ',')
  string += handle_null('created_date', True)
  string += handle_null('status', True)
  string += handle_null('incident_address', True)
  string += handle_null('incident_zip', False)
  string += handle_null('longitude', False)
  string += handle_null('latitude', False)
  return string

# string (address), string (borough) -> string (bbl)
def geocode(address, borough):
  space_index = address.find(' ')
  street_num = address[:space_index]
  street_name = address[space_index:]

  geocode_result = g.address(street_num, street_name, borough)

  if 'bbl' in geocode_result:
    print geocode_result['bbl'] + " - " + address
    return geocode_result['bbl']
  else:
    print 'NULL'
    return 'NULL'


# string (filename) -> saves csv to './data/csv'
def write_csv(filename):
  print "converting " + filename
  # open file
  f = open('./data/json/' + filename, 'r')
  # open csv file
  csv_filepath = './data/csv/' + filename[:10] + '.csv'
  if (os.path.isfile(csv_filepath)):
    return
  else:
    w = open(csv_filepath, 'w')

    complaints = json.load(f)

    for complaint in complaints:
      csv = json_to_csv(complaint)
      csv += geocode(complaint['incident_address'], complaint['borough'])
      csv += '\n'
      w.write(csv)

    w.close()


jsons = os.listdir('./data/json')

for j in jsons:
  write_csv(j)
