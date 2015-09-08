$('#dataTable,#dataTable2').DataTable({
    ordering: true,
    searching: true,
    "lengthMenu": [20, 100, 500],
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

$('#dataTableBig').DataTable({
    ordering: true,
    searching: true,
    "lengthMenu": [500],
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
