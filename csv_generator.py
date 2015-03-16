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
  string = ''
  string += (complaint['unique_key'] + ',')
  string += (complaint['created_date'] + ',')
  string += (complaint['status'] + ',')
  string += ("'" + trim(complaint['incident_address']) + "'" + ",")
  string += (complaint['incident_zip'] + ',')
  string += (complaint['longitude'] + ',')
  string += (complaint['latitude'] + ',')
  return string

# string (address), string (borough) -> string (bbl)
def geocode(address, borough):
  space_index = address.find(' ')
  street_num = address[:space_index]
  street_name = address[space_index:]

  geocode_result = g.address(street_num, street_name, borough)

  if 'bbl' in geocode_result:
    print geocode_result['bbl']
    return geocode_result['bbl']
  else:
    print 'NULL'
    return 'NULL'


def write_csv(filepath):
  # open file
  f = open('./data/json/' + filepath, 'r')
  # open csv file
  csv_filepath = './data/csv/' + filepath[:10] + '.csv'
  w = open(csv_filepath, 'w')

  complaints = json.load(f)

  for complaint in complaints:
    csv = json_to_csv(complaint)
    csv += geocode(complaint['incident_address'], complaint['borough'])
    csv += '\n'
    w.write(csv)

  w.close()


# ls = os.listdir('./data/json')

write_csv('2015-01-01.txt')
