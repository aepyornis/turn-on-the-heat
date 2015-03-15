CREATE TABLE complaints (
  uniquekey integer PRIMARY KEY,
  created_date timestamp,
  closed_date timestamp,
  zip integer,
  address text,
  street_name text,
  city text,
  status text,
  updated timestamp,
  cb text,
  borough text,
  x integer,
  y integer,
  lat numeric,
  long numeric
);

COPY complaints FROM 'complaints.csv' WITH csv;

