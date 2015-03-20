-- buildings with the most complaints
SELECT bbl, address, count(bbl) as total_complaints FROM complaints GROUP BY bbl, address ORDER BY total_complaints DESC;

-- buildings with most compplaints with pluto ownership information
SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       pluto.ownername AS OWNER,
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



SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       dobjobs.ownername as jobs_owner,
       dobjobs.ownerbusinessname as jobs_business,
       count(complaints.bbl) AS total_complaints
FROM complaints
INNER JOIN dobjobs on complaints.bbl = to_number(dobjobs.bbl, '9999999999')
GROUP BY complaints.bbl,
       complaints.address,
       dobjobs.ownername,
       dobjobs.ownerbusinessname
ORDER BY total_complaints DESC;

SELECT pluto.bbl, dobjobs.pluto
FROM pluto
INNER JOIN 



SELECT complaints.bbl AS bbl,
       complaints.address AS address,
       pluto.ownername AS OWNER,
       dobjobs.ownername AS jobs_owner,
       count(DISTINCT complaints.bbl) AS total_complaints
FROM complaints
LEFT JOIN pluto ON complaints.bbl = pluto.bbl
LEFT JOIN dobjobs ON complaints.bbl = dobjobs.bbl
GROUP BY complaints.bbl,
         complaints.address,
         pluto.ownername,
         dobjobs.ownername
ORDER BY total_complaints DESC;



SELECT c.bbl AS bbl,
       c.address AS address,
       dobjobs.ownername AS jobs_owner,
       count()
FROM complaints c
LEFT JOIN dobjobs ON c.bbl = dobjobs.bbl
INNER JOIN comlaints c ON c2.uniquekey = c.uniquekey
GROUP BY complaints.bbl,
         complaints.address,
         dobjobs.ownername
ORDER BY count DESC;


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


-- COUNTED and JOINED, correct!
SELECT c.bbl AS bbl,
       c.address AS address,
       dobjobs.ownername AS jobs_owner,
       c.total_complaints as total_complaints
FROM ( SELECT complaints.address, count(complaints.bbl) as total_complaints, complaints.bbl FROM complaints GROUP BY complaints.address, complaints.bbl) as c
LEFT JOIN  dobjobs ON c.bbl = dobjobs.bbl
ORDER BY total_complaints DESC;