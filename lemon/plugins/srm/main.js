var form_valid = true;

function init_validation(fields) {
    form_valid = true;

    $(fields).removeClass("required");
    $(".req").hide();
}

function check_required(field) {
    var fields = field.split(",");

    for (var a = 0; a < fields.length; a++) {
        if (!$("#" + fields[a]).val() && !$("#" + field[a]).is(":disabled")) {
            $("#" + fields[a]).addClass("required");
            $("#req_" + fields[a]).show();

            if (form_valid) {
                $("#" + fields[a]).focus();
                form_valid = false;
            }
        }
    }
}

function mark_required(field) {
    if ($("#" + field).is(":disabled"))
        return;

    $("#" + field).addClass("required");
    $("#req_" + field).show();

    if (form_valid) {
        $("#" + field).focus();
        form_valid = false;
    }
}

function on_request_add() {
    init_validation("#service,#details,#subject");

    if ($("#service").val() == "39:40" && !$("#subject").val())
        mark_required("subject");

    check_required("service,details");

    return form_valid;
}

function on_request_update() {
    if ($("#details2").prop("enabled")) {
        init_validation("#details2");
        check_required("details2");
    }

    return form_valid;
}

function on_request_comment() {
    if ($("#details2").prop("disabled")) {
        init_validation("#commentbox");
        check_required("commentbox");
    }

    return form_valid;
}

function on_task_add() {
    init_validation("#subject,#requester,#details,#comment,#closing_reason,#commentbox");
    check_required("subject,requester,details");

    if ($("#task_status").val() == 2 && !$("#closing_reason").val())
        mark_required("closing_reason");

    if (($("#task_status").val() == 1 && !$("#commentbox").val()) ||
        ($("#task_status").val() == 2 && !$("#skip_notice").is(":checked") && !$("#commentbox").val()))
        mark_required("commentbox");

    /* kontrolli, kas tellija väli tundub üldse õige? */

    var req = $("#requester").val();

    /* kui kasutajanimes on '@'-märk, siis kontrolli kas on korrektne email */

    if (req.indexOf('@') != -1) {
        if (!validate_email(req))
            mark_required("requester");
    }
    else { /* kontrolli, kas kasutajanimi eksisteerib süsteemis */
        $.post("/api/query:srm:requester", { requester: req }, function(result) {
            if (result == "failed")
                mark_required("requester");
        });
    }

    return form_valid;
}

/*$(".uploaded-files").on("click", ".attachments", function() {
    var selected_fs = 0;

    $(".attachments").each(function() {
        if ($(this).is(":checked"))
            selected_fs += $(this).data("size");
    });
});*/

$("#requester").keyup(function() {
    var req = $("#requester").val();

    if (req.length > 2) {
        $.post("/api/query:srm:search", { requester: req }).done(function(data) {
            $("#choose_requester").html(data).show();
        });
    }
});

$("#choose_requester").on("click", ".pick_requester", function() {
    $("#requester").val($(this).data("uid"));
    $("#choose_requester").val("").hide();
});

$("#choose_requester").mouseleave(function() {
   $("#choose_requester").val("").hide();
});

/*  tavakasutaja esitatud tellimuse puhul, kui valib liigitamata teenus,
    siis kuvatakse täpsutamise lahtrit */

$("#service").change(function() {
    if ($("#service").val() == "39:40")
	$("#service_specify").show();
    else {
	//$("#subject").val("");
	$("#service_specify").hide();
    }
});

/* emaili kustutamine */

$(".msg_remove").click(function(e) {
    e.preventDefault();

    var url = $(this).attr("href");
    var args = url.split("/");
    var msg_id = args[3].split(":");
    var read = $(this).closest("h4").hasClass("read");
    var unread = parseInt($("#unread_emails_badge").html());

    $.ajax({ url: url }).done(function(content) {
        if (content == "OK") { // kui kustutamine oli edukas
            if (!read) // kui oli värske meil siis vähenda ka lugemata kirjade numbrit
                $("#unread_emails_badge").html(unread - 1);

            $("#msg_" + msg_id[1]).hide(); // siis peida rida
        }
    });
});

/* kuva kustutatud emailid */

$(".show_deleted_emails").click(function() {
   $(".deleted").toggle();
});

/* märgi kõik loetuks */

$(".msg_markread").click(function(e) {
    e.preventDefault();

    var url = $(this).attr("href");

    $.ajax({ url: url }).done(function(content) {
        if (content == "OK") {
            $("#mailbox .panel-title").css("color", "#aaa");
            $("#unread_emails_badge").html("0");
        }
    });
});

/* emaili sisu hankimine */

$(".msg_details").click(function(e) {
    e.preventDefault();

    var url = $(this).attr("href");
    var args = url.split("/");
    var msg_id = args[3].split(":");

    if (!$("#sender_" + msg_id[1]).html()) {
        $.ajax({ url: url }).done(function(content) {
            var obj = JSON.parse(content);

            $("#sender_" + msg_id[1]).html(obj.from);
            $("#subject_" + msg_id[1]).html(obj.subject);
            $("#time_" + msg_id[1]).html(obj.mdate + " (" + obj.size + " KB)");
            $("#body_" + msg_id[1]).html(obj.body_plain_full.replace(/(\r\n|\n|\r)/gm, "<br/>"));
        });
    }
});

/* kui suunatakse töö siis muuda ülesande staatus määratuks */

$("#owner_id").change(function() {
   $("#task_status").val(0);
   //$("#comment").prop("disabled", true);
});

/* kui teenuse tüüp on intsident siis kuva teenuse dropdown */

$("#task_type").change(function() {
    if ($("#task_type").val() <= 30) {
	$("#service").show();
    } else {
	$("#service").hide();
    }
});

$("#skip_notice").click(function() {
    if ($(this).is(":checked"))
       $("#comment_mark").hide();
    else
       $("#comment_mark").show();
});

/* kui ülesande staatus on määratud, siis kommentaari osa on disabled */
/* kui ülesande staatus on lõpetatud, siis kuva lõpetamise olekud ja kulutatud aeg */

$("#task_status").change(function() {
    /*if ($("#task_status").val() == 0)
	$("#comment").prop("disabled", true);
    else
	$("#comment").prop("disabled", false);*/

    uploaded_files();

    if ($("#task_status").val() == 1 || ($("#task_status").val() == 2 && !$("#skip_notice").is(":checked")))
        $("#comment_mark").show();
    else
        $("#comment_mark").hide();

    if ($("#task_status").val() == 2)
	$("#hide_closing_reason,#used_time").show();
    else
	$("#hide_closing_reason,#used_time").hide();
});

/* et saaks vajadusel detailvaadetest väljumisel uuesti parent' tab aktiivseks teha */

$(".nav-tabs a").on("click", function(e) {
    e.preventDefault();

    if (!$(this).hasClass("nonav") && !$(this).parent().hasClass("disabled"))
        last_tab = $(this).attr("href").substr(1);
});

/* ülesande real klikkides lae vastav detailvaade */

$(".req_row").click(function() {
    $("#page-wrapper").load($(this).data("href"), function() {
        $.getScript("/lemon/plugins/srm/main.js");
    });
});

/* reinitsialiseeri (kui vaja) js pluginad */

function init_dropzone() {
    var sess_id = $("#_sess_id").prop("class");
    var parent = $(".uploaded-files").data("parent");

    $(".dropzone").dropzone({
        init: function() {
            this.on("completemultiple", function() {
                uploaded_files();
            });
        },
	url: 'https://upload.ttu.ee/put/' + sess_id + '/' + parent,
        maxFilesize: 25,
        uploadMultiple: true,
        autoProcessQueue: true,
        paramName: 'uploader'
    });
}

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
    if ($.fn.dataTable.isDataTable("#dataTable")) {
        table = $("#dataTable,#dataTable2,#dataTable3,#dataTable4,#dataTable5,#dataTable6").DataTable();
    }
    else {
        var done = false;

        table = $("#dataTable,#dataTable2,#dataTable3,#dataTable4,#dataTable5,#dataTable6").DataTable({
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
            "fnInitComplete": function() {
                if (!done) {
                    $("#page-wrapper").fadeIn(200);
                    done = true;
                }
            },
            language: {
                "sProcessing": "Palun oodake, koostan kuvamiseks nimekirja!",
                "sLengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
                "sZeroRecords": "&nbsp;",//Otsitavat vastet ei leitud.",
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

/* lae pluginate css'id */

function load_css() {
    if (!$("link[href='/lemon/plugins/srm/main.css']").length) {
        $("head").append(
            "<link rel='stylesheet' type='text/css' href='https://static.ttu.ee/portal/ext/datepicker/1.3.0/datepicker.css' />" +
            "<link rel='stylesheet' type='text/css' href='https://static.ttu.ee/portal/ext/icheck/flat/blue.css' />" +
            "<link rel='stylesheet' type='text/css' href='https://static.ttu.ee/portal/dropzone/min/basic.min.css' />" +
            "<link rel='stylesheet' type='text/css' href='https://static.ttu.ee/portal/dropzone/min/dropzone.min.css' />" +
            "<link rel='stylesheet' type='text/css' href='/lemon/plugins/srm/main.css' />");
    }
}

function uploaded_files() {
    var sess_id = $("#_sess_id").prop("class");
    var parent = $(".uploaded-files").data("parent");
    var url = "/query/" + sess_id + "/files:" + parent;

    $.getJSON(url, function(data) {
        var time, size;
        var fd = new Date();
        var html =
                "<input type='hidden' name='sess_id' value='" + sess_id + "'>" +
                "<input type='hidden' name='user_agent' value='" + navigator.userAgent + "'>" +
                "<table style='width: 100%; border: 1px solid #ccc'>";

        $.each(data, function(key, val) {
            if (val.size >= 1048576)
                size = Math.round((val.size / 1048576) * 10) / 10 + "MB";
            else
                size = Math.round(val.size / 1024) + "KB";

            fd.setTime(val.time * 1000);
            time = fd.getDate() + "." + (fd.getMonth() + 1) + "." + fd.getFullYear() + " ";
            time += fd.getHours() + ":";

            if (fd.getMinutes() < 10)
                time += "0";

            time += fd.getMinutes();

            html += "<tr style='border-bottom: 1px solid #ccc'>";

            if ($("#task_status").val() == 1) {
                html += "<td style='padding-left: 10px'>";

                if (val.size < 5242880)
                    html += "<input type='checkbox' name='attachments[]' class='attachments' data-size='" + val.size + "' value='" + val.hash + "'>";
                else
                    html += "<input type='checkbox' disabled/>";

                html += "</td>";
            }

            //html += "<td style='padding: 10px'><i class=''></i></td>";
            html += "<td style='padding: 10px'><a href='" + val.fetch_url + "'>" + wordwrap(val.name, 40, " ") + "</a></td>";
            html += "<td style='padding: 10px; padding-left: 0px; padding-right: 0px; text-align: right; white-space: nowrap'>" + size + "</td>";
            html += "<td style='padding: 10px; white-space: nowrap'>" + time + "</td>";
            html += "</tr>";
        });

        html += "</table>";

        $(".uploaded-files").html(html);
    });
}

function wordwrap( str, width, brk, cut ) {
    brk = brk || 'n';
    width = width || 75;
    cut = cut || false;

    if (!str) { return str; }
    var regex = '.{1,' +width+ '}(\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\S+?(\s|$)');

    return str.match( RegExp(regex, 'g') ).join( brk );
}

function validate_email(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

$(document).ready(function() {
    load_css();

    load_dropzone(init_dropzone);
    load_datepicker(init_datepicker);
    load_datatables(init_datatables);

    uploaded_files();
});
