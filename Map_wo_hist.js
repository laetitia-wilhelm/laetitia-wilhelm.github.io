(async () => {
    try {
        // Fetch topology data
        const topology = await fetch('https://code.highcharts.com/mapdata/custom/world.topo.json')
            .then(response => response.json());
        console.log("Topology loaded:", topology);

        // Fetch medal JSON data
        /*const medalJson = await fetch('../medalsIndex.json')
            .then(response => response.json());
        console.log("Medal Json loaded:", medalJson);*/

        // Fetch another medal data JSON
        const data = await fetch('../data/medals.json')
            .then(response => response.json());
        console.log("Medal Json:", data);

        // Make codes uppercase to match the map data
        data.forEach(p => {
            p.code = p.Nation.toUpperCase();
        });

        // Extract disciplines dynamically from the data
        const disciplines = ['1500', '800', '400', '200', '100'];

        // Extract medal types
        const medalTypes = ['Gold', 'Silver', 'Bronze'];

        // Initialize the map chart
        const mapChart = Highcharts.mapChart('container_map', {
            chart: {
                map: topology,
                spacing: 1,
                backgroundColor: null,
            },
            title: {
                text: null
            },

            mapView: {
                zoom: 2
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'top'
                }
            },
            legend: {
                title: {
                    text: 'Medals won'
                },
                align: 'left',
                verticalAlign: 'bottom',
                floating: true,
                layout: 'vertical',
                valueDecimals: 0,
                backgroundColor: null,
                symbolRadius: 0,
                symbolHeight: 14
            },
            colors: [
                'rgba(173, 216, 230, 0.2)',  
                'rgba(173, 216, 230, 0.6)',
                'rgba(173, 216, 230, 1)', 
                'rgba(144, 202, 169, 0.6)', 
                'rgba(144, 202, 169, 0.8)', 
                'rgba(107, 185, 131, 0.8)'      
            ],
            
            
            colorAxis: {
                dataClassColor: 'category',
                dataClasses: [{
                    to: 2
                }, {
                    from: 2,
                    to: 10
                }, {
                    from: 10,
                    to: 20
                }, {
                    from: 20,
                    to: 50
                }, {
                    from: 50,
                    to: 100
                }, {
                    from: 100
                }]
            },
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
                joinBy: ['iso-a3', 'code'],
                dataLabels: {
                    enabled: false,
                    color: '#FFFFFF',
                    format: '{point.Nation}'
                },
                name: 'Medals per country',
                tooltip: {
                    pointFormat: '<b>{point.Nation} : {point.Total_full}</b><br/>Gold: {point.Gold_full}<br/>Silver: {point.Silver_full}<br/>Bronze: {point.Bronze_full}'
                },
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                    select: {
                        color: 'rgba(255, 153, 51, 0.5)',
                        borderColor: 'orange',
                        dashStyle: 'shortdot'
                    }
                },
                point: {
                    events: {
                        click: function () {
                            updateHistogram(this);
                        }
                    }
                }
            }]
        });

        // Function to update histogram
        const updateHistogram = (selectedPoint) => {
            const selectedData = data.find(country => country.code === selectedPoint.code);
            const seriesData = medalTypes.map(medal => {
                return {
                    name: medal,
                    data: disciplines.map(discipline => selectedData[`${medal}_${discipline}`])
                };
            });

            if (!window.histogramChart) {
                window.histogramChart = Highcharts.chart('country-chart', {
                    chart: {
                        type: 'column',
                        backgroundColor: null
                    },
                    title: {
                        text: `Medals won by ${selectedPoint.Nation}`
                    },
                    xAxis: {
                        categories: disciplines,
                        title: {
                            text: 'Discipline [m]'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of Medals'
                        },
                        allowDecimals: false,
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: false,
                        backgroundColor:
                            null,
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x} m</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: seriesData.map((series, i) => ({
                        ...series,
                        color: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32'
                    }))
                });
            } else {
                window.histogramChart.update({
                    title: {
                        text: `Medals won by ${selectedPoint.Nation}`
                    },
                    xAxis: {
                        categories: disciplines
                    },
                    series: seriesData.map((series, i) => ({
                        ...series,
                        color: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32'
                    }))
                });
            }
        };

    } catch (error) {
        console.error('Error:', error);
    }
})();