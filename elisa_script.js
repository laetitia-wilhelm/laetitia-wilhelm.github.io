const menDataUrl = './data/elisa/graph_data_men.json'; // Path to your men's JSON file
const womenDataUrl = './data/elisa/graph_data_women.json'; // Path to your women's JSON file

const svg = d3.select("svg");
const margin = { top: 50, right: 30, bottom: 40, left: 200 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([0, height]).padding(0.1);

const color = d3.scaleOrdinal().range(d3.schemeTableau10.concat(d3.schemeSet3)); // Use a combination of color schemes for variety

let gXAxis = g.append("g").attr("class", "x axis");
let gYAxis = g.append("g").attr("class", "y axis");

const yearLabel = d3.select("#year-label");

let interval;
let isPlaying = false;
let yearIndex = 0;
let years = [];
let formattedData = [];
let bestTimes = {};

const slider = d3.select("#slider")
    .attr("max", 0) // This will be updated once data is loaded
    .on("input", function() {
        yearIndex = +this.value;
        update(years[yearIndex]);
    });

const playButton = d3.select("#play-pause");
playButton.on("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        play();
    } else {
        pause();
    }
    playButton.classed("active", isPlaying);
});

const genderToggle = d3.select("#gender-toggle");
genderToggle.on("change", function() {
    pause();
    const dataUrl = this.checked ? womenDataUrl : menDataUrl;
    loadData(dataUrl);
});

const play = () => {
    playButton.text("Pause");
    interval = setInterval(() => {
        yearIndex = (yearIndex + 1) % years.length;
        if (yearIndex === 0) {
            pause();
        } else {
            update(years[yearIndex]);
            slider.property("value", yearIndex);
        }
    }, 1000);
};

const pause = () => {
    playButton.text("Play");
    clearInterval(interval);
};

const update = year => {
    // Filter and sort the data based on the best time for the specific year
    const topData = formattedData.map(d => {
        const yearData = d.values.find(v => v.year === year);
        return {
            name: d.name,
            value: yearData ? yearData.value : 0,
            bestTime: yearData ? yearData.bestTime : Infinity,
            medals: yearData ? yearData.medals : { G: 0, S: 0, B: 0 } // Assuming medals is an object with counts
        };
    }).sort((a, b) => {
        // Sort based on best times for the specific year
        if (a.bestTime === Infinity && b.bestTime === Infinity) return 0;
        if (a.bestTime === Infinity) return 1;
        if (b.bestTime === Infinity) return -1;
        return a.bestTime - b.bestTime;
    });

    // Update the domains based on the sorted data
    x.domain([0, d3.max(topData, d => d.value) * 1.1]);
    y.domain(topData.map(d => d.name));

    // Update the axes
    gXAxis.transition().duration(750).call(d3.axisTop(x).ticks(width / 80));
    gYAxis.transition().duration(750).call(d3.axisLeft(y).tickSizeOuter(0));

    // Bind the data to the bars
    const bars = g.selectAll(".bar").data(topData, d => d.name);

    // Enter selection: add new bars
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", x(0))
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", d => color(d.name))
        .transition().duration(750);

    // Update selection: update existing bars
    bars.transition().duration(750)
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth());

    // Exit selection: remove old bars
    bars.exit().transition().duration(750).attr("width", 0).remove();

    // Add text for best time
    const text = g.selectAll(".text").data(topData, d => d.name);
    text.enter().append("text")
        .attr("class", "text")
        .attr("x", 5)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", ".35em")
        .style("font-size", "12px")
        .text(d => {
            if (d.medals.total !== 0) {
                return `Best Time: 0${Math.floor(d.bestTime / 60)}:${(Math.floor(d.bestTime) % 60).toString().padStart(2, '0')}.${Math.round((d.bestTime % 1) * 100).toString().padStart(2, '0')}`;
            } else {
                return "";
            }
        })
        .transition().duration(750);

    text.transition().duration(750)
        .attr("x", 5)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .text(d => {
            if (d.medals.total !== 0) {
                return `Best Time: 0${Math.floor(d.bestTime / 60)}:${(Math.floor(d.bestTime) % 60).toString().padStart(2, '0')}.${Math.round((d.bestTime % 1) * 100).toString().padStart(2, '0')}`;
            } else {
                return "";
            }
        });

    text.exit().remove();

    const medalTypes = [
        { type: 'G', src: './data/elisa/gold_medal.png' },
        { type: 'S', src: './data/elisa/silver_medal.png' },
        { type: 'B', src: './data/elisa/bronze_medal.png' }
    ];

    const text_space = 15;
    const icon_space = 20;
    const dispMedalsGold = g.selectAll(".medal-icon-G").data(topData, d => d.name);
    const dispMedalsSilver = g.selectAll(".medal-icon-S").data(topData, d => d.name);
    const dispMedalsBronze = g.selectAll(".medal-icon-B").data(topData, d => d.name);

    // GOLD medal icons
    dispMedalsGold.enter().append("image")
        .attr("class", "medal-icon-G")
        .attr("x", d => Math.max(120 + 5, x(d.value) + 5))
        .attr("y", d => y(d.name) + y.bandwidth() / 2 - 8)
        .attr("width", 16)
        .attr("height", 22)
        .attr("xlink:href", d => {
            if (d.medals.G > 0) {
                return medalTypes[0].src;
            }
        })
        .transition().duration(750)
  
    dispMedalsGold.transition().duration(750)
        .attr("x", d => Math.max(120 + 5, x(d.value) + 5))
        .attr("y", d => y(d.name) + y.bandwidth() / 2 - 8)
        .attr("xlink:href", d => {
            if (d.medals.G > 0) {
                return medalTypes[0].src;
            }
        });

    // GOLD medal text
    const goldText = g.selectAll(".textG").data(topData, d => d.name);
    goldText.enter().append("text")
        .attr("class", "textG")
        .attr("x", d => Math.max(120 + 5 + text_space, x(d.value) + 5 + text_space))
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 5)
        .attr("dy", ".35em")
        .style("font-size", "12px")
        .text(d => {
            if (d.medals.G !== 0) {
                return `x${d.medals.G}`;
            } else {
                return "";
            }
        })
        .transition().duration(750);

    goldText.transition().duration(750)
        .attr("x", d => Math.max(120 + 5 + text_space, x(d.value) + 5 + text_space))
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 5)
        .text(d => {
            if (d.medals.G !== 0) {
                return `x${d.medals.G}`;
            } else {
                return "";
            }
        });

    goldText.exit().remove();

    // SILVER medal icons
    dispMedalsSilver.enter().append("image")
        .attr("class", "medal-icon-S")
        .attr("x", d => {
            if (d.medals.G > 0) {
                return Math.max(120 + 5 + icon_space + text_space, x(d.value) + 5 + icon_space + text_space);
            } 
            else {
                return Math.max(120 + 5, x(d.value) + 5);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 - 8)
        .attr("width", 16)
        .attr("height", 22)
        .attr("xlink:href", d => {
            if (d.medals.S > 0) {
                return medalTypes[1].src;
            }
        })
        .transition().duration(750)
  
    dispMedalsSilver.transition().duration(750)
        .attr("x", d => {
            if (d.medals.G > 0) {
                return Math.max(120 + 5 + icon_space + text_space, x(d.value) + 5 + icon_space + text_space);
            } 
            else {
                return Math.max(120 + 5, x(d.value) + 5);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 - 8)
        .attr("xlink:href", d => {
            if (d.medals.S > 0) {
                return medalTypes[1].src;
            }
        });

    // SILVER medal text
    const silverText = g.selectAll(".textS").data(topData, d => d.name);
    silverText.enter().append("text")
        .attr("class", "textS")
        .attr("x", d => {
            if (d.medals.G > 0) {
                return Math.max(120 + 5 + icon_space + text_space * 2, x(d.value) + 5 + icon_space + text_space * 2);
            } 
            else {
                return Math.max(120 + 5 + text_space , x(d.value) + 5 + text_space);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 5)
        .attr("dy", ".35em")
        .style("font-size", "12px")
        .text(d => {
            if (d.medals.S !== 0) {
                return `x${d.medals.S}`;
            } else {
                return "";
            }
        })
        .transition().duration(750);

    silverText.transition().duration(750)
        .attr("x", d => {
            if (d.medals.G > 0) {
                return Math.max(120 + 5 + icon_space + text_space * 2, x(d.value) + 5 + icon_space + text_space * 2);
            } 
            else {
                return Math.max(120 + 5 + text_space , x(d.value) + 5 + text_space);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 5)
        .text(d => {
            if (d.medals.S !== 0) {
                return `x${d.medals.S}`;
            } else {
                return "";
            }
        });

    silverText.exit().remove();

    // BRONZE medal icons
    dispMedalsBronze.enter().append("image")
        .attr("class", "medal-icon-B")
        .attr("x", d => {
            if (d.medals.G > 0) {
                if (d.medals.S > 0) {
                    return Math.max(120 + 5 + icon_space * 2 + text_space * 2, x(d.value) + 5 + icon_space * 2 + text_space * 2);
                }
                return Math.max(120 + 5 + icon_space + text_space, x(d.value) + 5 + icon_space + text_space);
            } 
            if (d.medals.S > 0) {
                return Math.max(120 + 5 + icon_space + text_space, x(d.value) + 5 + icon_space + text_space);
            }
            else {
                return Math.max(120 + 5, x(d.value) + 5);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 - 8)
        .attr("width", 16)
        .attr("height", 22)
        .attr("xlink:href", d => {
            if (d.medals.B > 0) {
                return medalTypes[2].src;
            }
        })
        .transition().duration(750)
  
    dispMedalsBronze.transition().duration(750)
        .attr("x", d => {
            if (d.medals.G > 0) {
                if (d.medals.S > 0) {
                    return Math.max(120 + 5 + icon_space * 2 + text_space * 2, x(d.value) + 5 + icon_space * 2 + text_space * 2);
                }
                return Math.max(120 + 5 + icon_space + text_space, x(d.value) + 5 + icon_space + text_space);
            } 
            if (d.medals.S > 0) {
                return Math.max(120 + 5 + icon_space + text_space, x(d.value) + 5 + icon_space + text_space);
            }
            else {
                return Math.max(120 + 5, x(d.value) + 5);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 - 8)
        .attr("xlink:href", d => {
            if (d.medals.B > 0) {
                return medalTypes[2].src;
            }
        });

    // BRONZE medal text
    const bronzeText = g.selectAll(".textB").data(topData, d => d.name);
    bronzeText.enter().append("text")
        .attr("class", "textB")
        .attr("x", d => {
            if (d.medals.G > 0) {
                if (d.medals.S > 0) {
                    return Math.max(120 + 5 + icon_space * 2 + text_space * 3, x(d.value) + 5 + icon_space * 2 + text_space * 3);
                }
                return Math.max(120 + 5 + icon_space + text_space * 2, x(d.value) + 5 + icon_space + text_space * 2);
            } 
            if (d.medals.S > 0) {
                return Math.max(120 + 5 + icon_space + text_space * 2, x(d.value) + 5 + icon_space + text_space * 2);
            }
            else {
                return Math.max(120 + 5 + text_space, x(d.value) + 5 + text_space);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 5)
        .attr("dy", ".35em")
        .style("font-size", "12px")
        .text(d => {
            if (d.medals.B !== 0) {
                return `x${d.medals.B}`;
            } else {
                return "";
            }
        })
        .transition().duration(750);

    bronzeText.transition().duration(750)
        .attr("x", d => {
            if (d.medals.G > 0) {
                if (d.medals.S > 0) {
                    return Math.max(120 + 5 + icon_space * 2 + text_space * 3, x(d.value) + 5 + icon_space * 2 + text_space * 3);
                }
                return Math.max(120 + 5 + icon_space + text_space * 2, x(d.value) + 5 + icon_space + text_space * 2);
            } 
            if (d.medals.S > 0) {
                return Math.max(120 + 5 + icon_space + text_space * 2, x(d.value) + 5 + icon_space + text_space * 2);
            }
            else {
                return Math.max(120 + 5 + text_space, x(d.value) + 5 + text_space);
            }
        })
        .attr("y", d => y(d.name) + y.bandwidth() / 2 + 5)
        .text(d => {
            if (d.medals.B !== 0) {
                return `x${d.medals.B}`;
            } else {
                return "";
            }
        });

    bronzeText.exit().remove();



    // Update the year label
    yearLabel.text(year);
};


const loadData = (dataUrl) => {
    d3.json(dataUrl).then(data => {
        // Clear previous data
        g.selectAll("*").remove();

        const countryData = {};
        years = [];
        
        data.forEach(d => {
            const year = d.year;
            let totalMedals = 0;
            for (const country in d.medal_counts) {
                const medals = d.medal_counts[country];
                totalMedals += medals.total;
                if (!countryData[country]) {
                    countryData[country] = { total: 0, bestTimes: {}, medals: {} };
                }
                countryData[country][year] = medals.total;
                countryData[country].total += medals.total;
                countryData[country].medals[year] = medals;

                // Assuming best_times is part of the data structure
                if (d.best_times && d.best_times[country]) {
                    countryData[country].bestTimes[year] = d.best_times[country];
                }
            }
            // Only add the year if there are medals
            if (totalMedals > 0) {
                years.push(year);
            }
        });

        const countries = Object.keys(countryData);
        formattedData = countries.map(country => {
            return {
                name: country,
                values: years.map(year => ({
                    year,
                    value: countryData[country][year] || 0,
                    bestTime: countryData[country].bestTimes[year] || Infinity,
                    medals: countryData[country].medals[year] || { G: 0, S: 0, B: 0 }
                }))
            };
        });

        x.domain([0, d3.max(formattedData, d => d3.max(d.values, v => v.value))]);
        y.domain(countries);

        gXAxis = g.append("g").attr("class", "x axis").call(d3.axisTop(x).ticks(width / 80));
        gYAxis = g.append("g").attr("class", "y axis").call(d3.axisLeft(y).tickSizeOuter(0));

        slider.attr("max", years.length - 1);
        yearIndex = 0;
        update(years[yearIndex]);
    });
};

// Load the initial data
loadData(womenDataUrl);