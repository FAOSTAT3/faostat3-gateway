var FS_HOME_CHART = (function() {

    function init() {
        initChart1('chart1');
    }

    function initChart1(id) {
        var title = $.i18n.prop('_' + id + 'Title');
        var subtitle = $.i18n.prop('_' + id + 'Subtitle');
        $("#" + id + 'Title').prepend(title)
        $("#" + id + 'Subtitle').html(subtitle)
        var serie = $.i18n.prop('_' + id + 'Serie');

        $('#' + id).highcharts({
            chart: {
                type: 'area', //Tipo di grafico:  area, areaspline, boxplot, bubble, column, line, pie, scatter, spline

                alignTicks: false,
                backgroundColor: '#FFFFFF', //Colore di background
                spacing: [20,1,1,1],//Spacing intorno (molto simile al margin - Di default il bottom è 15, qui l'ho messo a 10 per essere uguale agli altri)
                plotBorderColor: '#ffffff', //Colore bordo intorno solo area chart
                plotBorderWidth: 0, //Spessore bordo intorno solo area chart
                style: {
                    fontFamily: 'Roboto', // Font di tutto
                    fontSize: '12px', // La dimensione qui vale solo per i titoli
                    fontWeight: 300 // Con Roboto è molto bello giocare con i pesi
                },
                zoomType: 'xy', //Attiva lo zoom e stabilisce in quale dimensione
                resetZoomButton: {
                    position: {
                        align: 'right', //Allineamento zoom orizzontale
                        //verticalAlign:'middle' //Allineamento zoom verticale
                        x: -10
                    },
                    theme: {
                        fill: '#FFFFFF', //Colore di background pulsante reset zoom
                        stroke: '#666666', //Colore di stroke pulsante reset zoom
                        width: 60, //Larghezza del pulsante reset
                        style: {
                            textAlign: 'center', //CSS style aggiunto da me per centrare il testo
                            fontSize: 10
                        },
                        states: {
                            hover: {
                                fill: '#e6e6e6', //Colore di background hover pulsante reset zoom
                                stroke: '#666666', //Colore di stroke hover pulsante reset zoom
                                style: {
                                    //color: 'white' //Colore testo hover pulsante reset zoom
                                }
                            }
                        }
                    }

                }
            },
            colors: [ //Colori delle charts
                '#379bcd',
                '#76BE94',
                '#744490',
                '#E10079',
                '#2D1706',
                '#F1E300',
                '#F7AE3C',
                '#DF3328'
            ],
            credits: {
                enabled: false //Attiva o disattiva il link di HighCharts dalla chart
            },
            exporting: {
                enabled: false
            },
            navigation: { //Modifica lo stile dei bottoni e spesso del solo bottone dell'esportazione (lo sfondo)
                buttonOptions: {
                    theme: {
                        'stroke-width': 1, // Peso stroke del bottone
                        stroke: '#666666', // Colore stroke del bottone
                        r: 0, // Smusso stroke del bottone,
                        states: {
                            hover: {
                                stroke: '#666666', // Press stroke del bottone
                                fill: '#e6e6e6' // Rollover del bottone
                            },
                            select: {
                                stroke: '#666666', // Press stroke del bottone
                                fill: '#e6e6e6' // Press Fill del bottone
                            }
                        }
                    }
                }
            },
            legend: { //Modifica style della legenda
                enabled: true, //Attiva la legenda
                floating: false, // IMPORTANTE - Permette alla plot area di stare sotto alla legenda - si guadagna molto spazio
                backgroundColor: '#FFFFFF', //Colore di sfondo della legenda
                //layout: 'horizontal', //Tipologia di legenda
                align: 'center', //Allineamento orizzontale del box della legenda (left, center, right)
                verticalAlign: 'bottom', //allineamento verticale della legenda (top, middle, bottom)
                borderWidth: 0, //Spessore bordo della legenda
                symbolPadding: 10, //Distanza tra simbolo e legenda (default 5)
                itemStyle: {
                    cursor: 'pointer',
                    color: '#666666',
                    fontSize: '14px',
                    fontWeight: 300
                },
                itemHiddenStyle: { //Colore dell'elemento legenda quando è disattivato
                    color: '#eeeeee'
                },
                itemHoverStyle: { //Colore dell'elemento legenda in rollover
                    color: '#3ca7da'
                },
                navigation: { //Paginazione Legenda - stilizzazione
                    activeColor: '#3ca7da', //Colore freccia attiva legenda
                    inactiveColor: '#666666', //Colore freccia disattiva legenda
                    arrowSize: 8, //Dimensioni freccia
                    animation: true, //Attiva/Disattiva animazione
                    style: { //Stile CSS applicato solo alla navigazione della legenda
                        color: '#666666',
                        fontSize: '10px'
                    }
                }
            },
            plotOptions: {
                series: {
                    allowPointSelect: true, //Permette di selezionare i punti della chart
                    animation: { // Configura l'animazione di entrata
                        duration: 1000,
                        easing: 'swing'
                    },
                    connectNulls: true,
                    cropThreshold: 3,
                    lineWidth: 1, // IMPORTANTE - Cambia lo spessore delle linee della chart
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    fillColor: {
                        linearGradient: [0, 0, 0, 350],
                        stops: [
                            [0, 'rgba(55, 155, 205,0.5)'],
                            [1, 'rgba(255,255,255,0)']
                        ]
                    },
                    marker: {
                        enabled: true, //Attiva o disattiva i marker
                        symbol: 'circle', // Tipologia di marker
                        radius: 4,
                        lineWidth: 1,
                        lineColor: '#379bcd',
                        fillColor: '#FFFFFF',
                        states: {
                            hover: {
                                enabled: true, // Attiva o disattiva il marker quando si passa sopra la chart
                                symbol: 'circle',
                                fillColor: '#FFFFFF',
                                lineColor: '#3ca7da',
                                radius: 5,
                                lineWidth: 2
                            }
                        }
                    }
                }
            },
            title: {
                enabled: false,
                text: null,
                x: -20 //center
            },
            subtitle: {
                text: null,
                x: -20
            },
            xAxis: {
                categories: ['1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'],
                gridLineWidth:1, // IMPORTANTE - Attiva le linee verticali
                lineColor: '#e0e0e0',
                tickColor: '#e0e0e0',
                gridLineColor: '#eeeeee',
                tickLength: 7,
                labels: {
                    y: 25,
                    style: {
                        color: '#666666',
                        fontWeight: '300',
                        fontSize: 12
                    }
                }
            },
            yAxis: {
                floor: 800,
                ceiling: 1100,
                gridLineWidth: 1, // IMPORTANTE - Attiva le linee verticali
                lineWidth:1,
                //tickWidth: 1,
                lineColor: '#e0e0e0',
                gridLineColor: '#eeeeee',
                labels: {
                    style: {
                        color: '#666666',
                        fontWeight: '300',
                        fontSize: 12
                    }
                },
                title: {
                    enabled: false,
                    text: 'null'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                }]
            },
            tooltip: {
                valueSuffix: 'M',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderWidth: 1,
                shadow: false
            },
            series: [{
                name: serie,
                data: [1015, 1030, 1026, 1010, 973, 949, 944, 932, 933, 940, 957, 949, 944, 934, 931, 907, 890, 883, 878, 870, 854, 842]
            }]
        });
    }

    return {
        init: init,
        initChart1: initChart1
    };

})();