BEGIN TRANSACTION;

CREATE TABLE "dobjobs"(
    job text,
    doc integer,
    borough text,
    house text,
    streetName text,
    block integer,
    lot integer,
    bin integer,
    jobType text,
    jobStatus text,
    jobStatusDescrp text,
    latestActionDate date,
    buildingType text,
    CB text,
    cluster boolean,
    landmark boolean,
    adultEstab boolean,
    loftBoard boolean,
    cityOwned boolean,
    littleE boolean,
    PCFiled boolean,
    eFiling boolean,
    plumbing boolean,
    mechanical boolean,
    boiler boolean,
    fuelBurning boolean,
    fuelStorage boolean,
    standPipe boolean,
    sprinkler boolean,
    fireAlarm boolean,
    equipment boolean,
    fireSuppresion boolean,
    curbCut boolean,
    other boolean,
    otherDescript text,
    applicantName text,
    applicantTitle text,
    professionalLicense text,
    professionalCert boolean,
    preFilingDate date,
    paidDate date,
    fullyPaidDate date,
    assignedDate date,
    approvedDate date,
    fullyPermitted date,
    initialCost money,
    totalEstFee money,
    feeStatus text,
    existZoningSqft integer,
    proposedZoningSqft integer,
    horizontalEnlrgmt boolean,
    verticalEnlrgmt boolean,
    enlrgmtSqft integer,
    streetFrontage integer,
    existStories integer,
    proposedStories integer,
    existHeight integer,
    proposedHeight integer,
    existDwellUnits integer,
    proposedDwellUnits integer,
    existOccupancy text,
    proposedOccupancy text,
    siteFill text,
    zoneDist1 text,
    zoneDist2 text,
    zoneDist3 text,
    zoneSpecial1 text,
    zoneSpecial2 text,
    ownerType text,
    nonProfit boolean,
    ownerName text,
    ownerBusinessName text,
    ownerHouseStreet text,
    ownerCityStateZip text,
    ownerPhone text,
    jobDescription text,
    bbl numeric,
    address text
);

END TRANSACTION;
