BEGIN TRANSACTION;

DROP TABLE super_complaints;
CREATE TABLE super_complaints AS (SELECT c.bbl AS bbl,
       c.address AS address,
       jobs.ownername AS jobs_owner,
       jobs.ownerbusinessname AS jobs_business,
       jobs.latestactiondate AS jobs_date,
       jobs.ownerphone AS owner_phone,
       pluto.ownername AS pluto_owner,
       pluto.unitsres AS units_res,
       pluto.borocode AS boro,
       c.total_complaints AS total_complaints
       -- c2.latitude AS lat,
       -- c2.longitude AS lng
FROM
   (SELECT complaints.address,
          count(complaints.bbl) AS total_complaints,
          complaints.bbl,
    FROM complaints
    GROUP BY complaints.address,
             complaints.bbl) AS c
    LEFT JOIN
        (SELECT *
         FROM
            (SELECT DISTINCT ON (bbl) bbl,
                         ownername,
                         ownerbusinessname,
                         latestactiondate,
                         ownerphone
            FROM dobjobs
            ORDER BY bbl) AS dob
        ORDER BY dob.latestactiondate DESC ) AS jobs ON c.bbl = jobs.bbl
  LEFT OUTER JOIN pluto ON c.bbl = pluto.bbl

LEFT OUTER JOIN (SELECT longitude, latitude,bbl FROM complaints) as c2 ON c.bbl = c2.bbl
ORDER BY total_complaints DESC);


END TRANSACTION;