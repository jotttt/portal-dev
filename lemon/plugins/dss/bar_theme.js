var bar_theme = {
    colors: [COLORS.DARK_MAGENTA, COLORS.MEDIUM_MAGENTA, COLORS.LIGHT_MAGENTA, COLORS.LIGHT_GRAY, COLORS.VERY_LIGHT_MAGENTA, COLORS.BLACK, COLORS.LIGHTER_MAGENTA,
        COLORS.DARK_GRAY, COLORS.GRAY, COLORS.VERY_DARK_MAGENTA],
    chart: {
        backgroundColor: COLORS.WHITE,
        spacingBottom: 10,
        spacingTop: 20,
        spacingLeft: 10,
        spacingRight: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHT_GRAY,
        style: {
            fontFamily: "Verdana, sans-serif",
            fontSize: '10px'
        }
    },
    title: {
        style: {
            fontSize: '14px',
            //fontFamily: 'Verdana, sans-serif', // wrong
            font: '14pt Verdana, sans-serif',
            fontWeight: 'plain',
            color: COLORS.MEDIUM_MAGENTA
        },
        align: 'left',
        x: 20,
        y: 15
    },
    subtitle: {
        style: {
            fontSize: '14px',
            font: '14pt Verdana, sans-serif',
            //fontSize: '12px',
            fontWeight: 'plain',
            color: COLORS.BLACK
        },
        align: 'left',
        x: 20,
        y: 30
    },
    xAxis: {
        labels: {
            style: {
                fontSize: '12px',
                fontWeight: 'plain', // bold not working
                color: COLORS.BLACK
            }
        }
    },
    yAxis: {
        gridLineColor: COLORS.LIGHT_GRAY
    },
    plotOptions: {
        series: {
            events: {
                legendItemClick: function () {
                    return false; // <== returning false will cancel the default action
                }
            },
            colorByPoint: true,
            dataLabels: {// numbrid diagrammide otstes
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold'
                },
                color: COLORS.DARK_GRAY
            }
        }
    },
    credits: {
        enabled: CREDITS_ENABLED
    }
};
