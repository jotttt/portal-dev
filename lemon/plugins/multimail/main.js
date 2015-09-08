//http://stackoverflow.com/questions/10133100/javascript-variable-scope-the-evils-of-globals/10133133#10133133
(function () {
    load_include_js(init_include_js);
    function load_include_js(callback) {
        $.getScript("https://static.ttu.ee/portal/ext/cms/include.min.js", callback);
    }

    function init_include_js() {
        include(
        'https://static.ttu.ee/portal/ext/cms/handlebars.runtime-v3.0.1.js', function () {
            include('https://static.ttu.ee/portal/sb-admin-2/1.0.5/bower_components/datatables/media/js/jquery.dataTables.min.js',
                    function () {
                        include('https://static.ttu.ee/portal/sb-admin-2/1.0.5/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js',
                                '/lemon/plugins/multimail/multimail.js', function () {
                                });
                    });
            load_css();
        });
    }

    $(document).ready(function () {
        //debugger;
    });

    function load_css() {
        if (!$("link[href='/lemon/plugins/cms/main.css']").length) {
            $("head").append(
                    "<link rel='stylesheet' type='text/css' href='/lemon/plugins/cms/main.css' />");
            $("head").append(
                    "<link rel='stylesheet' type='text/css' href='https://static.ttu.ee/portal/dropzone/dropzone.css' />");

        }
    }

})(); // Called right away

