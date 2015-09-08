//http://stackoverflow.com/questions/10133100/javascript-variable-scope-the-evils-of-globals/10133133#10133133
(function () {
    load_include_js(init_include_js);

    function load_include_js(callback) {
        $.getScript("https://static.ttu.ee/portal/ext/cms/include.min.js", callback);
    }

    function init_include_js() {
        include('https://static.ttu.ee/portal/ext/cms/handlebars.runtime-v3.0.1.js', function () {
            load_css();
            load_highcharts();
            load_datepicker(init_datepicker);
//            include(
//                    '/lemon/plugins/dss/templates/tpl.js',
//                    function () {
//
//                    });
        });
    }


    $(document).ready(function () {
        //debugger;
    });

    function load_highcharts() {
        include(
                'https://portal-dev.ttu.ee/ext/highcharts/highcharts.src.js',
                'https://static.ttu.ee/wiki/1.1/charts/themes/bar_theme.js',
                function () {
                    include(
                            'https://portal-dev.ttu.ee/ext/highcharts/highcharts-3d.src.js',
                            function () {
                                include('https://portal-dev.ttu.ee/ext/highcharts/modules/exporting.src.js',
                                        function () {
                                            include('/lemon/plugins/dss/dss.js');
                                        });
                            });
                });
    }

    function load_css() {
        if (!$("link[href='/lemon/plugins/dss/main.css']").length) {
            $("head").append(
                    "<link rel='stylesheet' type='text/css' href='https://static.ttu.ee/portal/ext/datepicker/1.3.0/datepicker.css' />" +
                    "<link rel='stylesheet' type='text/css' href='/lemon/plugins/dss/main.css' />");
        }
    }

    function init_datepicker() {
    $(".datepicker").datepicker({
        startDate: "01.2011",
//        endDate: "31.12.2020",
//        language: "et",
//        keyboardNavigation: false,
        //calendarWeeks: true,
//        todayHighlight: true,
          format: "mm-yyyy",
    startView: "months",
    minViewMode: "months"
    });
}


})(); // Called right away
