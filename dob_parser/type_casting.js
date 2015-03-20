var _ = require('underscore')

//all the fields in order
var fields_in_order = ['job','doc','borough','house','streetName','block','lot','bin','jobType','jobStatus','jobStatusDescrp','latestActionDate','buildingType','CB','cluster','landmark','adultEstab','loftBoard','cityOwned','littleE','PCFiled','eFiling','plumbing','mechanical','boiler','fuelBurning','fuelStorage','standPipe','sprinkler','fireAlarm','equipment','fireSuppresion','curbCut','other','otherDescript','applicantName','applicantTitle', 'professionalLicense','professionalCert','preFilingDate','paidDate','fullyPaidDate','assignedDate','approvedDate','fullyPermitted','initialCost','totalEstFee','feeStatus','existZoningSqft','proposedZoningSqft','horizontalEnlrgmt','verticalEnlrgmt','enlrgmtSqft','streetFrontage','existStories','proposedStories','existHeight','proposedHeight','existDwellUnits','proposedDwellUnits','existOccupancy','proposedOccupancy','siteFill','zoneDist1','zoneDist2','zoneDist3','zoneSpecial1','zoneSpecial2','ownerType','nonProfit','ownerName','ownerBusinessName','ownerHouseStreet','ownerCityStateZip','ownerPhone','jobDescription','bbl', 'address']

//object containing the type of each field
// 'text', 'integer', 'number', 'boolean', 'date', 'money'
var types = {
    job: 'text',
    doc: 'integer',
    borough: 'text',
    house: 'house',
    streetName: 'text',
    block: 'integer',
    lot: 'integer',
    bin: 'integer',
    jobType: 'text',
    jobStatus: 'text',
    jobStatusDescrp: 'text',
    latestActionDate: 'date',
    buildingType: 'text',
    CB: 'text',
    cluster: 'boolean',
    landmark: 'boolean',
    adultEstab: 'boolean',
    loftBoard: 'boolean',
    cityOwned: 'boolean',
    littleE: 'boolean',
    PCFiled: 'boolean',
    eFiling: 'boolean',
    plumbing: 'boolean',
    mechanical: 'boolean',
    boiler: 'boolean',
    fuelBurning: 'boolean',
    fuelStorage: 'boolean',
    standPipe: 'boolean',
    sprinkler: 'boolean',
    fireAlarm: 'boolean',
    equipment: 'boolean',
    fireSuppresion: 'boolean',
    curbCut: 'boolean',
    other: 'boolean',
    otherDescript: 'text',
    applicantName: 'text',
    applicantTitle: 'text',
    professionalLicense: 'text',
    professionalCert: 'boolean',
    preFilingDate: 'date',
    paidDate: 'date',
    fullyPaidDate: 'date',
    assignedDate: 'date',
    approvedDate: 'date',
    fullyPermitted: 'date',
    initialCost: 'money',
    totalEstFee: 'money',
    feeStatus: 'text',
    existZoningSqft: 'integer',
    proposedZoningSqft: 'integer',
    horizontalEnlrgmt: 'boolean',
    verticalEnlrgmt: 'boolean',
    enlrgmtSqft: 'integer',
    streetFrontage: 'integer',
    existStories: 'integer',
    proposedStories: 'integer',
    existHeight: 'integer',
    proposedHeight: 'integer',
    existDwellUnits: 'integer',
    proposedDwellUnits: 'integer',
    existOccupancy: 'text',
    proposedOccupancy: 'text',
    siteFill: 'text',
    zoneDist1: 'text',
    zoneDist2: 'text',
    zoneDist3: 'text',
    zoneSpecial1: 'text',
    zoneSpecial2: 'text',
    ownerType: 'text',
    nonProfit: 'boolean',
    ownerName: 'text',
    ownerBusinessName: 'text',
    ownerHouseStreet: 'text',
    ownerCityStateZip: 'text',
    ownerPhone: 'text',
    jobDescription: 'text',
    bbl: 'number',
    address: 'text'
  }

//input: field str or number, index of field (column number)
//output: value or false. 
function type_cast(field, i) {
  
  
  //gets the column
  var field_name = fields_in_order[i];
  //gets the type of the column
  var type = _.values(_.pick(types, field_name))[0]

  //integer
  if (type === 'integer') {
    return parseInt(field);
  //money
  } else if (type === 'money') {
    return removesMoneySign(field);
  //boolean: note that it return 'false' as a string. 
  } else if (type === 'boolean') {
    if (field) {
      if (field === ' ') {
        return 'false';
      }
      return 'true';
    } else {
      return 'false';
    }
  //date
  } else if (type === 'date') {
    if (field) {
      if (field === '0' || field === '0.0') {
        return false;
      } else {
      return field.slice(0, 10);
      }
    }
    else {
      return false;
    }
  //text
  } else if (type === 'text') {
    return field;
  //varchar() and char() get called and return the max number of characters 
  }  else if (typeof type === 'number') {
    if (field.length <= type) {
      return field;
    } else {
      return field.slice(0,type);
    }
  // house
  } else if (type === 'house') {
    if (field) {
      return field.replace('.0', '');
    } else {
      return false;
    }
    
  }
  else if (type === 'number') {
    return field;
  }
  // error
  else {
    return console.error('typcasting error - ' + field + ' - ' + fields_in_order[i]);
  }
}

//helper functions
function varchar(chars) {
  return chars;
}
function char(chars) {
  return chars;
}
function removesMoneySign(money) {
   if (money === 0 || money === '0') {
    return 0;
   } else if (typeof money === 'number') {
    return money;
   } else if (typeof money === 'string') {
    return money.replace('$', '');
   } else {
    console.log('the money is not a string or a number');
    return 'undefined';
   }
}
function removeWhiteSpace(field) {
 if (typeof field === 'string') {
  return field.trim();
 } else {
  return field;
 }
}

module.exports = {
  cast: type_cast,
  fields: fields_in_order,
  types: types
}