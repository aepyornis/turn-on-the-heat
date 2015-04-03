# pluto to SQL
import glob
import csv

create_table = """CREATE TABLE pluto (
    cd integer,
    bldgclass text,
    ownername text,
    numfloords integer,
    unitsres integer,
    yearbuilt integer,
    borocode integer,
    bbl numeric
);"""

# num, string -> string
# doubles single quotes
def double_quotes(index, field):
    # index of fields to double quote
    if index in (1,2):
        no_more_slashes = field.replace("\\", "")
        return "'" + no_more_slashes.replace("'", "''") + "'"
    else:
        return field

# string -> string
# reduces and modifies one row and generates an INSERT statment
def insert_statement(row):
    # select these fields from pluto
    # CD, BldgClass, OwnerName, NumFloors, UnitsRes, YearBuilt, BBL
    selected = [3, 25, 29, 42, 43, 58, 68, 69]
    reduced = [row[i] for i in selected]
    # double quotes for sql
    doubled = [double_quotes(index, field) for index, field in enumerate(reduced)]

    return "INSERT INTO pluto VALUES (" + ",".join(doubled) + ");\n"

# string -> void.
# writes insert statments to sql_file
def csv_to_sql(filepath):
    with open(filepath) as f:
        # ignores first line
        next(f)
        # handles file as CSV
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            sql_file.write(insert_statement(row))

# get all pluto csvs
list_of_files = glob.glob('./data/pluto/*.csv')

# open sql_file at data/pluto.sql
sql_file = open('./data/pluto.sql', 'w')

# write create table statment
sql_file.write(create_table)
sql_file.write('\n')

# write insert statments for all files
for path in list_of_files:
    print "working on " + path
    csv_to_sql(path)

# close sql_file
sql_file.close()

