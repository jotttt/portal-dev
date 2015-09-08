function init_icheck() {
    $('input[type=checkbox],input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
}

function init_datepicker() {
    $(".datepicker").datepicker({
        startDate: "01.01.2013",
        endDate: "31.12.2020",
        language: "et",
        keyboardNavigation: false,
        calendarWeeks: true,
        todayHighlight: true
    });
}

function init_datatables() {
    if ($.fn.dataTable.isDataTable('#dataTable')) {
        table = $('#dataTable').DataTable();
    }
    else {
        table = $('#dataTable').DataTable({
            ordering: true,
            searching: true,
            "lengthMenu": [10, 25, 50, 100],
            "pageLength": 50,
            "columnDefs": [{
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                }],
            "order": [[0, "desc"]],
            language: {
                "sProcessing": "Palun oodake, koostan kuvamiseks nimekirja!",
                "sLengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
                "sZeroRecords": "Otsitavat vastet ei leitud.",
                "sInfo": "Kuvatud: _TOTAL_ kirjet (_START_-_END_)",
                "sInfoEmpty": "Otsinguvasteid ei leitud",
                "sInfoFiltered": " - filteeritud _MAX_ kirje seast.",
                "sSearch": "Otsi k&otilde;ikide tulemuste seast:",
                "oPaginate": {
                    "sFirst": "Algus",
                    "sPrevious": "Eelmine",
                    "sNext": "J&auml;rgmine",
                    "sLast": "Viimane"
                }
            }
        });
    }
}

$(document).ready(function() {
    //alert("jah");
    load_icheck(init_icheck);
    load_datepicker(init_datepicker);
    load_datatables(init_datatables);
});
