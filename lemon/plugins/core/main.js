var last_tab = "a";
var dropzone = false;
var focus_js = {
    "helpdesk": "srm",
    "helpline": "srm",
    "request": "srm",
    "dns": "srm",
    "room": "fm",
    "building": "fm",
    "view": "cms",
    "edit": "cms",
    "msgprep": "multimail",
    "budget_diagram": "dss"
}

function load_dropzone(callback) {
    if (1) {
        $.getScript("https://static.ttu.ee/portal/dropzone/min/dropzone.min.js", callback);
    }
    else {
        if (callback && typeof (callback) === "function") {
            callback();
        }
    }
}

function load_icheck(callback) {
    if (!$.fn.iCheck) {
        $.getScript("https://static.ttu.ee/portal/ext/icheck/icheck-0.9.1.js", callback);
    }
    else {
        if (callback && typeof (callback) === "function") {
            callback();
        }
    }
}

function load_datepicker(callback) {
    if (!$.fn.datepicker) {
        $.getScript("https://static.ttu.ee/portal/ext/datepicker/1.3.0/bootstrap-datepicker.js", function () {
            $.getScript("https://static.ttu.ee/portal/ext/datepicker/1.3.0/locales/bootstrap-datepicker.et.js", callback);
        });
    }
    else {
        if (callback && typeof (callback) === "function") {
            callback();
        }
    }
}

function load_datatables(callback) {
    if (!$.fn.dataTable) {
        $.getScript("https://static.ttu.ee/portal/sb-admin-2/1.0.5/bower_components/datatables/media/js/jquery.dataTables.min.js", function () {
            $.getScript("https://static.ttu.ee/portal/sb-admin-2/1.0.5/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js", callback);
        });
    }
    else {
        if (callback && typeof (callback) === "function") {
            callback();
        }
    }
}

$("#wiki_help").on("show.bs.modal", function (e) {
    var fa_no = $(e.relatedTarget).data("fa_no");
    var site = $(location).attr("href").split("/");
    var url = "/query/" + site[4] + "/wiki";

    $(this).find(".modal-body").load(url);
});

$(document).ready(function() {
    $("#alertbox").delay(3300).fadeOut(2500);

    var site = $(location).attr("href").split("/");
    var sess = site[4].split("#");

    if (sess[1]) { /* et esmasel laadimisel ka laetaks õige js */
        $("#content-wrapper").fadeOut(100).load("/" + sess[1] + "/" + sess[0], function() {
            if (focus_js[sess[1]]) {
                var js_url = "/lemon/plugins/" + focus_js[sess[1]] + "/main.js";

                if (!$("script[src='" + js_url + "']").length)
                    $.getScript(js_url);
            }
        }).fadeIn(100);
    }
    else { /* juhul kui on juba dün. fookus küljes refreshi ajal */
        if (focus_js[site[3]]) {
            var js_url = "/lemon/plugins/" + focus_js[site[3]] + "/main.js";

            if (!$("script[src='" + js_url + "']").length)
                $.getScript(js_url);
        }
    }

    $(document).on("click", ".ajax-load", function(e) {
        e.preventDefault();

        var url = $(this).attr("href");

        if (!url)
            url = $(this).data("url");

        var args = url.split("/");
        var focus = args[1];

        window.history.replaceState(null, "", "/" + focus + "/" + args[2]);

        /* kui argumendiks on "parent_tab", siis suunatakse võimalusel viimati klikitud tab'i peale */

        if (args[3] == "parent" && last_tab)
            url = args.splice(0, 3).join("/") + "/" + last_tab;

        $("#content-wrapper").fadeOut(100).load(url, function(response, status, xhr) {
            if (status == "error" && (xhr.status == 404 || xhr.status == 401)) {
                //alert("Teie sessioon on aegunud. Palun logige uuesti sisse.");
                location.reload();
            }

            if (focus_js[focus]) {
                var js_url = "/lemon/plugins/" + focus_js[focus] + "/main.js";

                if (!$("script[src='" + js_url + "']").length) {
                    $.getScript(js_url);
                }
            }
        });

        if (focus_js[focus] != "srm")
            $("#content-wrapper").fadeIn(100);
    });

    $(document).on("submit", ".ajax-form", function(e) {
        e.preventDefault();

        var target = $(this).prop("action");
        var before = $(this).data("before");
        var after = $(this).data("after");
        var form = target.split("/");
        var focus = focus_js[form[3]];
        var url = "/query/" + form[4] + "/" + focus + ":form:" + $(this).prop("id");

        if (before && !window[before]())
            return false;

        $.post(url, $(this).serialize(),
            function(response) {
                if (after && !window[after](response))
                    return false;

                if (response["redirect"]) {
                    if (response["redirect"][0] == "/")
                        target = response["redirect"];
                    else {
                        if (response["redirect"] == "parent")
                            target = target + "/" + last_tab;
                        else
                            target = target + "/" + response["redirect"];
                    }
                }

                $("#content-wrapper").fadeOut(100).load(target, function() {
                    var js_url = "/lemon/plugins/" + focus + "/main.js";

                    if (!$("script[src='" + js_url + "']").length)
                        $.getScript(js_url);
                });
            },
            "json"
        );
    });
});
