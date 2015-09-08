var site_url = $(location).attr("href").split("/");

g3 = new Dygraph(
            document.getElementById("graphdiv3"),
            "/query/" + site_url[4] + "/iostats",
            {
                rollPeriod: 7,
                showRoller: false
            }
    );
