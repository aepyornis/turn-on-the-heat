from nyc_geoclient import Geoclient
import sys

g = Geoclient('a24f63ab', '47bd8f72f07c547b4cfc72e7f0a6ad67')

street_num = sys.argv[1]
street_name = sys.argv[2]
borough = sys.argv[3]

info = g.address(street_num, street_name, borough)

sys.stdout.write(info['bbl'])

