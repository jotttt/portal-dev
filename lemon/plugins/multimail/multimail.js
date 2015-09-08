/*
 * TODO:
 */

//http://stackoverflow.com/questions/10133100/javascript-variable-scope-the-evils-of-globals/10133133#10133133
(function () {
    var t; //translations
    var lang = $('#_lang').attr('class');

    var sess_id = $('#_sess_id').attr('class');
    var focus = $('#_focus').attr('class');
    var urlSplit = $(location).prop('href').split('/');
    var baseUrl = urlSplit[0] + '//' + urlSplit[2];

    //init_datatables();
    //$('#add_job_btn').attr("disabled", true);
    $('#upload_btn').attr("disabled", true);


// Mediamanager dropzone
    include('https://static.ttu.ee/portal/dropzone/dropzone-amd-module.js', function () {
        if ($('#mediamanager_dropzone').length) {
//                                      Dropzone.options.mydropzone = {
//                                          paramName : 'uploader[]',
//                                          url : 'https://upload.ttu.ee/put/' + sess_id + '/' + uid
//                                    };
            $("div#mediamanager_dropzone").dropzone(
                    {
                        init: function () {
//                            this.on("completemultiple", function () {
//                                on_media_uploaded_files();
//                            });
                            this.on("processing", function (file) {
                                var t = this;
                                getUid()
                                        .done(function (uid) {
                                            if (!uid) {
                                                alert('error');
                                            }
                                            else {
                                                t.options.url = 'https://upload.ttu.ee/put/' + sess_id + '/' + uid;
                                            }
                                        });
                                alert(t.options.url);

                            });
                        },
                        url: 'https://upload.ttu.ee/put/' + sess_id + '/' + 'AF2YUR',
                        maxFilesize: 25,
                        uploadMultiple: true,
                        autoProcessQueue: true,
                        paramName: 'uploader'
                                //paramName: 'uploader[]'

                    }
            );
        }
//                                    Dropzone.options.mydropzone = {
//                                        init: function () {
//                                            this.on("processing", function (file) {
//                                                this.options.url = "/some-other-url";
//                                            });
//                                        }
//                                    };
    });




//new Dropzone("div#mydropzone", {
//  paramName: "uploader", // The name that will be used to transfer the file
//  maxFilesize: 2,
//  url : 'https://upload.ttu.ee/put/' + sess_id + '/' + uid
//});

//Dropzone.options.myAwesomeDropzone = {
//  paramName: "uploader", // The name that will be used to transfer the file
//  maxFilesize: 2, // MB
    //accept: function(file, done) {
//    if (file.name == "justinbieber.jpg") {
//      done("Naha, you don't.");
//    }
//    else { done(); }
    //}
//};

    $('#create_job_btn').on('click', function (e) {
        e.preventDefault();
        var uid;
        getUid().done(function (data) {
            if (!data) {
                alert('error');
            }
            else {
                uid = data;
                $('#job_id').attr('value', uid);
                getUploadModal(uid)
                        .done(function (json) {
                            if (!json) {
                                alert('error');
                            }
                            else {
                                $('#upload-modal').empty().html(json.modal);
                                $('#div-upload_btn').append(json.iframe);
                                $('#div-dropzone').append(json.dropzone);
                                //$('#add_job_btn').attr("disabled", false);
                                $('#upload_btn').attr("disabled", false);
                                $('#create_job_btn').attr("disabled", true);
                                include('https://static.ttu.ee/portal/dropzone/dropzone-amd-module.js', function () {
                                    if ($('#mydropzone').length) {
//                                      Dropzone.options.mydropzone = {
//                                          paramName : 'uploader[]',
//                                          url : 'https://upload.ttu.ee/put/' + sess_id + '/' + uid
//                                    };
                                        $("div#mydropzone").dropzone(
                                                {
                                                    init: function () {
                                                        this.on("completemultiple", function () {
                                                            uploaded_files();
                                                        });
                                                    },
                                                    url: 'https://upload.ttu.ee/put/' + sess_id + '/' + uid,
                                                    maxFilesize: 25,
                                                    uploadMultiple: true,
                                                    autoProcessQueue: true,
                                                    paramName: 'uploader'
                                                            //paramName: 'uploader[]'

                                                }
                                        );
                                    }
//                                    Dropzone.options.mydropzone = {
//                                        init: function () {
//                                            this.on("processing", function (file) {
//                                                this.options.url = "/some-other-url";
//                                            });
//                                        }
//                                    };
                                });


                            }
                        });
            }
        });
    });


    function uploaded_files() {
        var sess_id = $("#_sess_id").prop("class");
        var parent = $(".uploaded-files").data("parent");
        var url = "/query/" + sess_id + "/files:" + parent;

        $.getJSON(url, function (data) {
            var time, size;
            var fd = new Date();
            var html =
                    "<input type='hidden' name='sess_id' value='" + sess_id + "'>" +
                    "<input type='hidden' name='user_agent' value='" + navigator.userAgent + "'>" +
                    "<table style='width: 100%; border: 1px solid #ccc'>";

            $.each(data, function (key, val) {
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

                //if ($("#task_status").val() == 1) {
                html += "<td style='padding-left: 10px'>";

                if (val.size < 5242880)
                    html += "<input type='checkbox' name='attachments[]' class='attachments' data-size='" + val.size + "' value='" + val.hash + "'>";
                else
                    html += "<input type='checkbox' disabled/>";

                html += "</td>";
                //}

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

    function wordwrap(str, width, brk, cut) {
        brk = brk || 'n';
        width = width || 75;
        cut = cut || false;

        if (!str) {
            return str;
        }
        var regex = '.{1,' + width + '}(\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\S+?(\s|$)');

        return str.match(RegExp(regex, 'g')).join(brk);
    }

    function getUid() {
        var cmd = 'uid';
        var url = baseUrl + '/query/' + sess_id + '/multimail:' + cmd;

        return $.ajax({
            type: 'get',
            dataType: 'text',
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }


    function getUploadModal(uid) {
        var cmd = 'getuploadmodal';
        var url = baseUrl + '/query/' + sess_id + '/multimail:' + cmd + ':' + uid;

        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: url
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fail(errorThrown);
        });
    }



    function init_datatables() {
        if ($.fn.dataTable.isDataTable("#multimailJobsDone")) {
            table = $("#multimailJobsDone").DataTable();
        }
        else {
            var done = false;

            table = $("#multimailJobsDone").DataTable({
                "processing": true, // processing indicator
                //"serverSide": true,
                //"ajax": "https://portal-dev.ttu.ee/query/" + sess_id + "/multimail:done",
                "columns": [
                    {"data": "name"},
                    {"data": "subject"},
                    {"data": "id"}
                ],
                ordering: true,
                searching: true,
                "lengthMenu": [10, 25, 50, 100],
                "pageLength": 50,
                "order": [[0, "desc"]],
                "fnInitComplete": function () {
                    if (!done) {
                        $("#page-wrapper").fadeIn(200);
                        done = true;
                    }
                },
                language: {
                    "sProcessing": "Palun oodake, koostan kuvamiseks nimekirja!",
                    "sLengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
                    "sZeroRecords": "&nbsp;", //Otsitavat vastet ei leitud.",
                    "sInfo": "Kuvatud: _TOTAL_ kirjet (_START_-_END_)",
                    "sInfoEmpty": "Otsinguvasteid ei leitud",
                    "sInfoFiltered": " - filteeritud _MAX_ kirje seast.",
                    "sSearch": "Otsi:",
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



    function ellipsis(text, n) {
        if (text.length > n)
            return text.substring(0, n) + "...";
        else
            return text;
    }

    function fail(error) {
        if (error === 'Unauthorized') {
            window.location.replace(baseUrl + '/' + focus + '/' + sess_id);
        }
        else {
            alert(error);
        }
    }

    /* ülesande real klikkides lae vastav detailvaade */

    $(".req_row").click(function () {
        $("#page-wrapper").load($(this).data("href"), function () {
            $.getScript("/lemon/plugins/multimail/main.js");
        });
    });


////////// Mediamanager
    function on_media_uploaded_files() {
        var sess_id = $("#_sess_id").prop("class");

        var url = "/query/" + sess_id + "/files:" + parent;

        $.getJSON(url, function (data) {
            var time, size;
            var fd = new Date();
            var html =
                    "<input type='hidden' name='sess_id' value='" + sess_id + "'>" +
                    "<input type='hidden' name='user_agent' value='" + navigator.userAgent + "'>" +
                    "<table style='width: 100%; border: 1px solid #ccc'>";

            $.each(data, function (key, val) {
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

                //if ($("#task_status").val() == 1) {
                html += "<td style='padding-left: 10px'>";

                if (val.size < 5242880)
                    html += "<input type='checkbox' name='attachments[]' class='attachments' data-size='" + val.size + "' value='" + val.hash + "'>";
                else
                    html += "<input type='checkbox' disabled/>";

                html += "</td>";
                //}

                //html += "<td style='padding: 10px'><i class=''></i></td>";
                html += "<td style='padding: 10px'><a href='" + val.fetch_url + "'>" + wordwrap(val.name, 40, " ") + "</a></td>";
                html += "<td style='padding: 10px; padding-left: 0px; padding-right: 0px; text-align: right; white-space: nowrap'>" + size + "</td>";
                html += "<td style='padding: 10px; white-space: nowrap'>" + time + "</td>";
                html += "</tr>";
            });

            html += "</table>";

            $("#media-uploaded-files").html(html);
        });
    }


//        function getUid() {
//        var cmd = 'uid';
//        var url = baseUrl + '/query/' + sess_id + '/multimail:' + cmd;
//
//        return $.ajax({
//            type: 'get',
//            dataType: 'text',
//            url: url
//        }).fail(function (jqXHR, textStatus, errorThrown) {
//            fail(errorThrown);
//        });
//    }




})(); // Called right away

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
            url: url,
            async: false
