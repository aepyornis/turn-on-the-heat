$(document).ready(function() {
    datatable();
    //nav bar
    activate(4);
});

function datatable() {
  //create table html
  $('#complaints-table').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="full-table"></table>' );
  // add classes for bootstrap style
  $('#full-table').addClass("table table-striped table-condensed table-hover")
  //do the datatable magic
  $('#full-table').DataTable({
    serverSide: true,
    ajax: {
        url: '/datatables',
        type: 'GET'
    },
    "order": [[ 0, "desc" ]],
    columns: [
        { 
        "data": "total_complaints",
        "title": 'Total Complaints',
        'searchable': false
        },
        { 
          "data": "address",
          "title": "Address"
        },
        { 
          "data": "pluto_owner" ,
          "title": "Owner Name (Pluto)"
        },
        { 
          "data": "jobs_owner",
          "title": "Owner (DOB)" 
        },
        { 
          "data": "jobs_business",
          "title": "Owner's Business (DOB)"

        },
        { 
          "data": "jobs_date",
          "title": "DOB Source date",
          'searchable': false
        },
        { 
          "data": "units_res",
          "title": "Residential Units",
          'searchable': false
        }
    ]
  });
}
