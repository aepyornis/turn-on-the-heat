BEGIN TRANSACTION;

CREATE TABLE super_complaints AS (SELECT c.bbl AS bbl,
       c.address AS address,
       jobs.ownername AS jobs_owner,
       jobs.ownerbusinessname AS jobs_business,
       jobs.latestactiondate AS jobs_date,
       jobs.ownerphone AS owner_phone,
       pluto.ownername AS pluto_owner,
       pluto.unitsres AS units_res,
       pluto.borocode AS boro,
       c.total_complaints AS total_complaints,
       c.latitude AS lat,
       c.longitude AS lng
FROM
   (SELECT complaints.address,
          count(complaints.bbl) AS total_complaints,
          complaints.bbl,
          complaints.longitude,
          complaints.latitude
    FROM complaints
    GROUP BY complaints.address,
             complaints.bbl,
             complaints.longitude,
              complaints.latitude) AS c
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
    LEFT JOIN pluto ON c.bbl = pluto.bbl
ORDER BY total_complaints DESC);


END TRANSACTION;