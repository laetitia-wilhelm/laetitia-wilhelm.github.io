# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Paul McIntyre | 302264 |
| Elisa Bianchi | 300928 |
| Laetitia Wilhelm | 298015 |

## Welcome to our website

Welcome to our website, where we explore the thrilling world of 1500m Olympic races through dynamic and insightful visualizations. Here, you'll find a range of interactive tools and graphics designed make your knowledge about race strategies, global medal distributions, and performance trends over time grow.


**Analyzing Race Strategies via Split Times**
We propose to investigate the various race strategies employed by athletes by analyzing their split times. This visualization will allow users to interact with the data, revealing how different strategies unfold throughout the race. By categorizing tactics such as "sit and kick," "negative split," "front running," and "even pace," viewers will gain insights into the strengths and weaknesses of each approach and the contexts in which they succeed or fail.

**World Map Medal**
The world medal visualization presents a map with the distribution of Olympic medals won in running disciplines across the world.
It uses dynamic and interactive tools, to enable the users to explore each country's medal detail in a ludic way. By clicking on a country, viewers can access to the medal distribution between the disciplines, including their types. This tool provides a global perspective of countries perfomance in Olympic races.

The second visualization present the history of medals won by each country in the 1500m discipline. The user can interact with the graph to see the winner's name.



**Top-k Countries Race Times as a Time-Series Bar Chart**
We propose to visualize the performance trends of the top-performing countries through a time-series bar chart. This chart will depict the chronometric performance of athletes over various Olympic events, highlighting patterns and fluctuations in race times. By examining these trends, users will be able to identify how different countries' performances have evolved, providing a detailed temporal analysis of the sport.




## Structure

Our [website](https://laetitia-wilhelm.github.io/index.html) is structured the following way:

```sh
├── README.md 
├── index.html <-- introduction page
├── home.html <-- news page
├── data.html
├── country_times.html
├── description.html
├── race_strategies.html
├── world_medals.html
├── team.html
├── data/
    ├── elisa/ <-- country times data
    └──  laeti/ <-- map & news data
├── images/<-- all header images
├── javascript/
    ├── countdown.js <-- countdown structure
    ├── elisa_script.js <-- country times
    ├── fadOut.js <-- main page transition
    ├── histogram.js <-- Medal History
    ├── Map_wo_hist.js <-- Medal Map
    └──  tableTransition.js <-- Home news
```