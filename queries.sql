-- buildings with the most complaints
SELECT bbl, address, count(bbl) as total_complaints FROM complaints GROUP BY bbl, address ORDER BY total_complaints DESC;

-- buildings with most compplaints with pluto ownership information
SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       pluto.ownername AS owner,
       count(complaints.bbl) AS total_complaints
FROM complaints,
     pluto
WHERE complaints.bbl = pluto.bbl
GROUP BY complaints.bbl,
         complaints.address,
         pluto.ownername
ORDER BY total_complaints DESC;


-- most complaints joined  with pluto and DOBjobs
SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       pluto.unitsres AS units_res,
       dobjobs.ownername AS jobs_owner,
       dobjobs.ownerbusinessname AS jobs_business,
       count(complaints.bbl) AS total_complaints
FROM complaints
LEFT JOIN pluto ON complaints.bbl = pluto.bbl
LEFT JOIN dobjobs ON complaints.bbl = dobjobs.bbl
GROUP BY complaints.bbl,
       complaints.address,
       pluto.unitsres,
       dobjobs.ownername,
       dobjobs.ownerbusinessname
ORDER BY total_complaints DESC;



--COUNT not joined
SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       count(complaints.bbl) AS total_complaints
FROM complaints
GROUP BY complaints.bbl,
         complaints.address
ORDER BY total_complaints DESC;

--JOINED NOT COUNTED
SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       dobjobs.ownername AS jobs_owner
FROM complaints
LEFT JOIN dobjobs ON complaints.bbl = dobjobs.bbl
GROUP BY complaints.bbl,
         complaints.address,
         dobjobs.ownername;

--COUNTED and JOINED, but wrong count
SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       dobjobs.ownername AS jobs_owner,
       count(complaints.bbl) AS total_complaints
FROM complaints
LEFT JOIN dobjobs ON complaints.bbl = dobjobs.bbl
GROUP BY complaints.bbl,
         complaints.address,
         dobjobs.ownername
ORDER BY total_complaints DESC;


-- COUNTED and JOINED correct, but not distinct 
SELECT c.bbl AS bbl,
       c.address AS address,
       dobjobs.ownername AS jobs_owner,
       dobjobs.ownerbusinessname as jobs_business
       c.total_complaints as total_complaints
FROM ( SELECT complaints.address, count(complaints.bbl) as total_complaints, complaints.bbl FROM complaints GROUP BY complaints.address, complaints.bbl) as c
LEFT JOIN  dobjobs ON c.bbl = dobjobs.bbl
ORDER BY total_complaints DESC;


-- counted, joined with distinct bbls, but not in the right order
SELECT c.bbl AS bbl,
       c.address AS address,
       jobs.ownername AS jobs_owner,
       jobs.ownerbusinessname as jobs_business,
       c.total_complaints as total_complaints
FROM ( SELECT complaints.address, count(complaints.bbl) as total_complaints, complaints.bbl FROM complaints GROUP BY complaints.address, complaints.bbl) as c
LEFT JOIN  (SELECT DISTINCT on (bbl) bbl, ownername, ownerbusinessname FROM dobjobs ORDER BY bbl) as jobs ON c.bbl = jobs.bbl
ORDER BY total_complaints DESC;

--counted, joined with dobjobs and pluto
SELECT c.bbl AS bbl,
       jobs.ownername AS jobs_owner,
       jobs.ownerbusinessname as jobs_business,
       jobs.latestactiondate as jobs_date,
       c2.address AS address,
       pluto.unitsres as units_res,
       pluto.ownername as pluto_owner,
       c.total_complaints as total_complaints
FROM ( SELECT count(complaints.bbl) as total_complaints, complaints.bbl FROM complaints GROUP BY complaints.bbl) as c
LEFT JOIN  (SELECT DISTINCT on (bbl) bbl, ownername, ownerbusinessname, latestactiondate FROM dobjobs ORDER BY bbl, latestactiondate DESC) as jobs ON c.bbl = jobs.bbl
LEFT JOIN (SELECT DISTINCT on (bbl) bbl, address FROM complaints) as c2 ON c2.bbl = c.bbl
LEFT JOIN pluto on pluto.bbl = c.bbl
ORDER BY total_complaints DESC;

-- counted, joined with dobjobs and pluto with correct ordering
SELECT c.bbl AS bbl,
       jobs.ownername AS jobs_owner,
       jobs.ownerbusinessname as jobs_business,
       jobs.latestactiondate as jobs_date,
       c2.address AS address,
       pluto.unitsres as units_res,
       pluto.ownername as pluto_owner,
       c.total_complaints as total_complaints
FROM ( SELECT count(complaints.bbl) as total_complaints, complaints.bbl FROM complaints GROUP BY complaints.bbl) as c
LEFT JOIN (SELECT * FROM (SELECT DISTINCT on (bbl) bbl, ownername, ownerbusinessname, latestactiondate FROM dobjobs ORDER BY bbl) as dob ORDER BY dob.latestactiondate DESC) as jobs ON c.bbl = jobs.bbl
LEFT JOIN (SELECT DISTINCT on (bbl) bbl, address FROM complaints) as c2 ON c2.bbl = c.bbl
LEFT JOIN pluto on pluto.bbl = c.bbl
ORDER BY total_complaints DESC;


--DISTINCT BBLs from dobjobs subquery
SELECT * FROM (SELECT DISTINCT on (bbl) bbl, ownername, ownerbusinessname, latestactiondate FROM dobjobs ORDER BY bbl) as dob ORDER BY dob.latestactiondate DESC;

SELECT DISTINCT on (bbl) bbl, ownername, ownerbusinessname, latestactiondate FROM dobjobs ORDER BYlatestactiondate DESC;


SELECT c.bbl AS bbl,
       jobs.ownername AS jobs_owner,
       jobs.ownerbusinessname as jobs_business,
       jobs.latestactiondate as jobs_date,
       pluto.unitsres as units_res,
       pluto.ownername as pluto_owner,
       c.total_complaints as total_complaints
FROM ( SELECT count(complaints.bbl) as total_complaints, complaints.bbl FROM complaints GROUP BY complaints.bbl) as c
LEFT JOIN (SELECT * FROM (SELECT DISTINCT on (bbl) bbl, ownername, ownerbusinessname, latestactiondate FROM dobjobs ORDER BY bbl) as dob ORDER BY dob.latestactiondate DESC) as jobs ON c.bbl = jobs.bbl
ORDER BY total_complaints DESC;


