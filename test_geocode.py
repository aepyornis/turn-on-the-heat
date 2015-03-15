from nyc_geoclient import Geoclient
g = Geoclient('a24f63ab', '47bd8f72f07c547b4cfc72e7f0a6ad67')

gates = g.address('701', 'GATES AVENUE', 'BROOKLYN')

print gates