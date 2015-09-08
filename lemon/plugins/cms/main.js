//http://stackoverflow.com/questions/10133100/javascript-variable-scope-the-evils-of-globals/10133133#10133133
(function () {
    load_include_js(init_include_js);

    function load_include_js(callback) {
        $.getScript("https://static.ttu.ee/portal/ext/cms/include.min.js", callback);
    }

    function init_include_js() {
//                include('https://static.ttu.ee/portal/ext/cms/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML','https://static.ttu.ee/portal/ext/cms/handlebars.runtime-v3.0.1.js', function () {
        //include('https://static.ttu.ee/portal/ext/cms/mathjax/MathJax.js?config=TeX-AMS-MML_SVG', 'https://static.ttu.ee/portal/ext/cms/handlebars.runtime-v3.0.1.js', function () {

        include('https://static.ttu.ee/portal/ext/cms/handlebars.runtime-v3.0.1.js', function () {
            include('/lemon/plugins/cms/templates/tpl.js', '/lemon/plugins/cms/cms.js','/lemon/plugins/cms/LZString.js', function () {
                include('https://static.ttu.ee/portal/ext/cms/mathjax/MathJax.js?config=TeX-AMS-MML_SVG', function () {

                    //main();
                });
            });
            load_css();
        });
    }


    $(document).ready(function () {
        //debugger;
        //configureMathJax();
        //load_include_js(init_include_js);
    });

//    function load_highcharts() {
//        https://static.ttu.ee/wiki/1.1/charts/highcharts/highcharts-custom.js
//                https://static.ttu.ee/wiki/1.1/charts/themes/bar_theme.js
//                https://static.ttu.ee/wiki/1.1/charts/themes/donut_theme.js
//                https://static.ttu.ee/wiki/1.1/charts/js/it_survey_2014/script.js
//    }

    function load_css() {
        if (!$("link[href='/lemon/plugins/cms/main.css']").length) {
            $("head").append(
                    "<link rel='stylesheet' type='text/css' href='/lemon/plugins/cms/main.css' />");
        }
    }

    function configureMathJax() {

setTimeout(function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://static.ttu.ee/portal/ext/cms/mathjax/MathJax.js?config=TeX-AMS-MML_SVG";
    document.getElementsByTagName("head")[0].appendChild(script);
  },3000);


    }
})(); // Called right away

function saveToLocalStorage(key, data, dataId) {
    var compressedJSON = LZString.compressToUTF16(JSON.stringify({data: data, dataId: dataId, saveTime: new Date()}));
    localStorage.setItem(key, compressedJSON);
}
// localStorage detection
function supportsLocalStorage() {
    if (typeof (Storage) === 'undefined') {
        return false;
    }
    try {
        localStorage.getItem("___test_key");
        return true;
    } catch (e) {
        return false;
    }
}
