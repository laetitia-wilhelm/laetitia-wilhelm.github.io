



(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());
    console.log("Topology loaded:", topology);



   /* let medalJson;
    try { 
        const medalJson = await fetch('../medalsIndex.json')
        .then(response => response.json())
        console.log("Medal Json loaded:", medalJson);
        }
        catch (error) {
            console.error('Error loading data:', error);
            console.log("check the type = type= text/javascript")
        }*/

    const data = await fetch('../data/medals.json')
        .then(response => response.json())
        console.log("Medal Json:", data);


    // Make codes uppercase to match the map data
    data.forEach(function (p) {
        p.code = p.Nation.toUpperCase();
    });
    



    Highcharts.mapChart('container', {
        chart: {
            map: topology,
            spacing : 1,
            backgroundColor: null,
        },

        title: {
            text: 'Total medals won by country',
        },
        subtitle: {
            text: 'Disciplines: 1500m - 800m - 400m - 200m - 100m'
        },


        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        /*legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'bottom',
            y: 50,
           
           
        },
*/
        /*colorAxis: {
            min: 0,
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#EFEFFF'],
                [30, '#4444FF'],
                [250, '#000022']
            ],

        },*/
        legend: {
            title: {
                text: 'Total medals won by country',
            },
            align: 'left',
            verticalAlign: 'bottom',
            floating: true,
            layout: 'vertical',
            valueDecimals: 0,
            backgroundColor: null,
            symbolRadius: 0,
            symbolHeight: 14,
        },
        
        colors: [
            'rgba(63,81,181,0.2)',  // Intense light blue with low opacity
            'rgba(63,81,181,0.4)',  // Intense medium light blue with moderate opacity
            'rgba(63,81,181,0.6)',  // Intense medium blue with medium opacity
            'rgba(103,58,183,0.6)', // Intense medium purple-blue with medium opacity
            'rgba(103,58,183,0.8)', // Intense dark purple-blue with higher opacity
            'rgba(103,58,183,1.0)'  // Intense darkest purple-blue with full opacity
        ],
        

        colorAxis: {
            dataClassColor: 'category',
            dataClasses: [{
                to: 5
            }, {
                from: 5,
                to: 10
            }, {
                from: 10,
                to: 30
            }, {
                from: 30,
                to: 100
            }, {
                from: 100,
                to: 150
            }, {
                from: 150,

            }]
        },

        /*data: {
            csv: document.getElementById('csv').innerText,
            seriesMapping: [{
                code: 0,
                value: 24
            }]
        },*/


        series: [{

            accessibility: {
                point: {
                    valueDescriptionFormat: '{xDescription}, {point.Total_full} '
                }
            },
            animation: {
                duration: 1000
            },
            data: data,
            colorKey: 'Total_full',
            joinBy: ['iso-a3', 'Nation'],
            dataLabels: {
                enabled: false,
                color: '#FFFFFF',
                format: '{point.Nation}'
            },

            name: 'Medals per country',
            tooltip: {
                pointFormat: ' <b> {point.Nation} : {point.Total_full}  </b> <br/> Gold : {point.Gold_full} <br/>Silver : {point.Silver_full} <br/>Bronze : {point.Bronze_full}'      

            },

            // pour clicker sur un pays
            allowPointSelect: true,
            cursor: 'pointer',
            states: {
                select: {
                    color: '#a4edba', //couleur verte à changer
                    borderColor: 'black',
                    dashStyle: 'shortdot'
                }
            },
        }]
    });

})();