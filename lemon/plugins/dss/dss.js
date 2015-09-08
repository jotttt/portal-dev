$(function () {
    chart = new Highcharts.Chart(Highcharts.merge({ // kujundus asub eraldi failis: bar_theme, merge liidab antud koodi kujundusega kokku.
        chart: {
            type: 'column',
            renderTo: 'container',
            options3d: {
                enabled: true,
                alpha: 9,
                beta: 35,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: 'Eelarve täitmine ja prognoos.'
        },
        xAxis: {
            categories: [
                '01CI',
                'ÜPIT07',
                'ÜPIT08',
                'Kokku'
            ]
        },
        yAxis: [{
                min: 0,
                title: {
                    text: '€ (tuh.)',
                    x: -15
                }
            }, {
                title: {
                    text: ''
                },
                opposite: true
            }],
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true,
            formatter: function () {
                var suhe = Math.round(this.points[0].y / this.points[1].y * 100);
                return 'Eelarve: <b>' + this.points[0].y + '</b><br>' +
                        'Prognoos: <b>' + this.points[1].y + '</b><br>' +
                        'Suhe: <b>' + suhe + '%</b><br>';
            }
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0,
                depth: 25

            }
        },
        series: [
            {
                name: 'Prognoos',
                color: COLORS.GRAY,
                data: [698702, 353071, 289677, 1341450]
            },
            {
                name: 'Eelarve',
                color: COLORS.DARK_MAGENTA,
                data: [656000, 520000, 325000, 1501000]
            }
        ]
    }, bar_theme));

});
