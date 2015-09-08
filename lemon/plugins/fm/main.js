$("#check").click(function(e) {
    var site_url = $(location).attr("href").split("/");
    var room_id = $("#room_id").val();
    var barcode = $("#barcode").val().toUpperCase();
    var fetch_url = "/query/" + site_url[4] + "/fa:" + barcode + ":check";

    $.getJSON(fetch_url).done(function(data) {
        var row;
        var icon = "check";
        var ts = Math.floor($.now() / 1000);

        if ((data.timestamp + 86400) < ts || data.timestamp === 0)
             icon = "check";

        row = "<tr id='fa_" + data.fa_no + data.seq_no_txt + "' ts='" + data.timestamp + "'>";
        row += "<td><input type='checkbox' name='fa[" + data.fa_no + data.seq_no_txt + "]' checked></td>";
        row += "<td data-toggle='modal' data-target='#asset_data' data-fa_no='" + data.fa_no + data.seq_no_txt + "'>" + data.fa_no + data.seq_no_txt + "</td>";
        row += "<td>" + "</td>";
        row += "<td>" + data.descr + "</td>";
        row += "<td>" + data.last_seen + " <i class='fa fa-" + icon + "'></i></td>";
        row += "<td>" + data.last_seen_by + "</td>";
        row += "</tr>";

        if (document.getElementById("fa_" + data.fa_no))
            $("#fa_" + data.fa_no).replaceWith(row);
        else
            $("#room_fa > tbody:last").append(row);

        $("#room_fa").append($("#room_fa tr").get().sort(function(a, b) {
            return $(b).attr("ts") - $(a).attr("ts");
        }));

    }).fail(function() {
        alert("Antud koodiga inventari ei leitud!");
        return false;
    });

    $("#barcode").val("").focus();
});

$("#barcode").keypress(function(e) {
    if (e.which === 13)
        $("#check").trigger("click");
});


$("#confirm_inventory").click(function() {
    $("#edit_room").trigger("submit");
});

$('#asset_data').on('show.bs.modal', function (e) {
    var fa_no = $(e.relatedTarget).data('fa_no');
    var site = $(location).attr("href").split("/");
    var url = "/load/" + site[4] + "/asset:" + fa_no;
    $(this).find(".modal-body").load(url);
});

function init_datatables() {
    if ($.fn.dataTable.isDataTable("#dataTable")) {
        table = $("#dataTable,#dataTable2,#dataTableBig").DataTable();
    }
    else {
        var done = false;

        table = $("#dataTable,#dataTable2").DataTable({
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

        table2 = $("#dataTableBig").DataTable({
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
    }
}

$(document).ready(function() {
    load_datatables(init_datatables);
});
