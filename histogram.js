document.addEventListener('DOMContentLoaded', function () {
    let combinedData;

    function fetchData() {
        fetch('./mix_1500m.json')
            .then(response => response.json())
            .then(data => {
                combinedData = data;
                populateCountrySelector(combinedData);
                updateChart(combinedData, document.getElementById('countrySelect').value);
                console.log("Data 1500 m loaded:", data);
            })
            .catch(error => console.error('Error loading data:', error));
    }

    function populateCountrySelector(data) {
        const countrySelect = document.getElementById('countrySelect');
        const countries = [...new Set(data.map(item => item.Country))];
        countries.sort().forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        countrySelect.addEventListener('change', () => {
            updateChart(combinedData, countrySelect.value);
        });
    }

    function updateChart(data, selectedCountry) {
        const filteredData = data.filter(item => item.Country === selectedCountry);
        const years = [...new Set(filteredData.map(item => item.Year))].sort((a, b) => a - b);

        const medalData = years.map(year => {
            const yearData = filteredData.filter(item => item.Year === year);
            const goldCount = yearData.reduce((total, item) => total + item['Gold count'], 0);
            const silverCount = yearData.reduce((total, item) => total + item['Silver count'], 0);
            const bronzeCount = yearData.reduce((total, item) => total + item['Bronze count'], 0);
            return { 
                year: year, 
                gold: goldCount,
                silver: silverCount,
                bronze: bronzeCount,
                winners: {
                    gold: yearData.map(item => item['Gold Winner']).filter(winner => winner !== null).join(', '),
                    silver: yearData.map(item => item['Silver Winner']).filter(winner => winner !== null).join(', '),
                    bronze: yearData.map(item => item['Bronze Winner']).filter(winner => winner !== null).join(', ')
                }
            };
        });

        Highcharts.chart('container_hist', {
            chart: {
                type: 'column',
                backgroundColor : null
            },
            credits: {
                enabled: false
            },
            title: {
                text: `Medals won by ${selectedCountry}`
            },
            xAxis: {
                categories: years,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Medal Count'
                },
                allowDecimals: false
            },
            tooltip: {
                formatter: function () {
                    let tooltip = `<b>${this.x} </b><br/>`; // Year

                    // Create an object to store winners for each medal type
                    const winnersObj = {
                        gold: [],
                        silver: [],
                        bronze: []
                    };

                    // Loop through each point and add winners to the corresponding medal type
                    this.points.forEach(point => {
                        const medalType = point.series.name.toLowerCase();
                        const winner = point.point[`winners_${medalType}`];
                        if (winner && winnersObj[medalType].indexOf(winner) === -1) {
                            winnersObj[medalType].push(winner);
                        }
                    });

                    // Loop through each medal type and add information to the tooltip
                    ['gold', 'silver', 'bronze'].forEach(medalType => {
                        if (winnersObj[medalType].length > 0) {
                            tooltip += `${medalType.charAt(0).toUpperCase() + medalType.slice(1)} `;
                            tooltip += `Winner : ${winnersObj[medalType].join(', ')}<br/>`;
                        }
                    });

                    // Calculate total medals
                    const totalMedals = this.points.reduce((total, point) => total + point.y, 0);
                    tooltip += `Total: ${totalMedals}`;

                    return tooltip;
                },
                shared: true,
                useHTML: true
            },


            plotOptions: {
                column: {
                    stacking: 'normal', // Stacking medals
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                { name: 'Gold', data: medalData.map(item => item.gold > 0 ? { y: item.gold, winners_gold: item.winners.gold } : null), color: '#FFD700' },
                { name: 'Silver', data: medalData.map(item => item.silver > 0 ? { y: item.silver, winners_silver: item.winners.silver } : null), color: '#C0C0C0' },
                { name: 'Bronze', data: medalData.map(item => item.bronze > 0 ? { y: item.bronze, winners_bronze: item.winners.bronze } : null), color: '#CD7F32' }
            ]
        });
    }

    fetchData();
});