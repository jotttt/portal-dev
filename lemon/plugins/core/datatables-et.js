$('#dataTable,#dataTable2,#dataTable3,#dataTable4').DataTable({
    ordering: true,
    searching: true,
    "lengthMenu": [20, 100, 200],
    language: {
        "sProcessing": "Palun oodake, koostan kuvamiseks nimekirja!",
        "sLengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
        "sZeroRecords": "Otsitavat vastet ei leitud.",
        "sInfo": "Kuvatud: _TOTAL_ kirjet (_START_-_END_)",
        "sInfoEmpty": "",
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

$('#dataTableBig,#dataTableBig2,#dataTableBig3,#dataTableBig4').DataTable({
    ordering: true,
    searching: true,
    "lengthMenu": [200, 500, 1000],
    language: {
        "sProcessing": "Palun oodake, koostan kuvamiseks nimekirja!",
        "sLengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
        "sZeroRecords": "Otsitavat vastet ei leitud.",
        "sInfo": "Kuvatud: _TOTAL_ kirjet (_START_-_END_)",
        "sInfoEmpty": "",
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
