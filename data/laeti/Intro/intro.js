// Schedule Data
const menScheduleData = [
    { date: 'Vendredi 2 août', time: '10 h 00', round: 'Premier tour' },
    { date: 'Samedi 3 août', time: '19 h 00', round: 'Repêchage' },
    { date: 'Dimanche 4 août', time: '18 h 30', round: 'Demi-finale' },
    { date: 'Mardi 6 août', time: '19 h 00', round: 'Finale' }
];

const womenScheduleData = [
    { date: '6 août', time: '10 h 05', round: 'Round 1' },
    { date: '7 août', time: '12 h 45', round: 'Repêchage' },
    { date: '8 août', time: '19 h 35', round: 'Demi-finale' },
    { date: '10 août', time: '20 h 25', round: 'Finale' }
];

// Top Players Data
const menTopPlayersData = [
    { rank: 1, athlete: 'John Doe', country: 'USA', score: 100 },
    { rank: 2, athlete: 'Max Mustermann', country: 'GER', score: 98 },
    { rank: 3, athlete: 'Jean Dupont', country: 'FRA', score: 95 }
];

const womenTopPlayersData = [
    { rank: 1, athlete: 'Jane Doe', country: 'USA', score: 100 },
    { rank: 2, athlete: 'Maria Musterfrau', country: 'GER', score: 98 },
    { rank: 3, athlete: 'Marie Dubois', country: 'FRA', score: 95 }
];

// Function to load schedule data into the tables
function loadScheduleData() {
    const menScheduleTable = d3.select('#men-schedule-table tbody');
    const womenScheduleTable = d3.select('#women-schedule-table tbody');

    menScheduleTable.selectAll('tr')
        .data(menScheduleData)
        .enter()
        .append('tr')
        .html(d => `<td>${d.date}</td><td>${d.time}</td><td>${d.round}</td>`);

    womenScheduleTable.selectAll('tr')
        .data(womenScheduleData)
        .enter()
        .append('tr')
        .html(d => `<td>${d.date}</td><td>${d.time}</td><td>${d.round}</td>`);
}

// Function to load top players data into the tables
function loadTopPlayersData() {
    const menPlayersTable = d3.select('#men-players-table tbody');
    const womenPlayersTable = d3.select('#women-players-table tbody');

    menPlayersTable.selectAll('tr')
        .data(menTopPlayersData)
        .enter()
        .append('tr')
        .html(d => `<td>${d.rank}</td><td>${d.athlete}</td><td>${d.country}</td><td>${d.score}</td>`);

    womenPlayersTable.selectAll('tr')
        .data(womenTopPlayersData)
        .enter()
        .append('tr')
        .html(d => `<td>${d.rank}</td><td>${d.athlete}</td><td>${d.country}</td><td>${d.score}</td>`);
}

// Functions to show and hide the appropriate schedule table
function showSchedule(gender) {
    const menSchedule = document.getElementById('men-schedule');
    const womenSchedule = document.getElementById('women-schedule');
    if (gender === 'men') {
        menSchedule.classList.add('active');
        womenSchedule.classList.remove('active');
    } else {
        menSchedule.classList.remove('active');
        womenSchedule.classList.add('active');
    }
}

// Functions to show and hide the appropriate top players table
function showPlayers(gender) {
    const menPlayers = document.getElementById('men-players');
    const womenPlayers = document.getElementById('women-players');
    if (gender === 'men') {
        menPlayers.classList.add('active');
        womenPlayers.classList.remove('active');
    } else {
        menPlayers.classList.remove('active');
        womenPlayers.classList.add('active');
    }
}

// Load data when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    loadScheduleData();
    loadTopPlayersData();
});
