// source https://olympics.com/en/paris-2024/schedule/athletics

const schedules = {
    women: [
        { date: '6 August', time: '10:05', round: 'Round 1' },
        { date: '7 August', time: '12:45', round: 'Repêchage' },
        { date: '8 August', time: '19:35', round: 'Semi-final' },
        { date: '10 August', time: '20:25', round: 'Final' },
    ],
    men: [
        { date: '2 August', time: '10:00', round: 'First Round' },
        { date: '3 August', time: '19:00', round: 'Repêchage' },
        { date: '4 August', time: '18:30', round: 'Semi-final' },
        { date: '6 August', time: '19:00', round: 'Final' },
    ]
};

/*dynamic row population of the table*/
function renderSchedule(gender) {
    const scheduleTable = d3.select(`#${gender}-schedule-table tbody`);

    scheduleTable.selectAll('tr') 
        .data(schedules[gender])
        .enter()
        .append('tr')
        .html(d => `<td>${d.date}</td><td>${d.time}</td><td>${d.round}</td>`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderSchedule('women');
    renderSchedule('men');
    console.log('schedule.js loaded');
});
