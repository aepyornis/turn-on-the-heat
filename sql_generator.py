import glob

def insert_statement(line):
  return 'INSERT INTO complaints VALUES (' + line + ');\n'

create_table = """CREATE TABLE complaints (
  uniquekey integer PRIMARY KEY,
  created_date timestamp,
  closed_date timestamp,
  status text,
  address text,
  zip integer,
  longitude numeric,
  latitude numeric,
  bbl numeric
);"""


list_of_files = glob.glob('./data/csv/*.csv')

sql_file = open('./data/sql.sql', 'w')

sql_file.write(create_table)
sql_file.write('\n')

for path in list_of_files:
  f = open(path, 'r')
  lines = f.read().splitlines()
  for line in lines:
    sql_file.write(insert_statement(line))

sql_file.close()

