$("#dataTable,#dataTable2,#dataTable3,#dataTable4,#dataTable5").DataTable({
    ordering: true,
    searching: true,
    "lengthMenu": [10, 25, 50, 100],
    "pageLength": 50,
    "columnDefs": [{
	"targets": [ 0 ],
	"visible": false,
	"searchable": false
    }],
    "order": [[ 0, "desc" ]],
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
