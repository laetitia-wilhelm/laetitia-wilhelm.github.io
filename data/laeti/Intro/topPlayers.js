// source: https://worldathletics.org/records/all-time-toplists/middlelong/1500-metres/outdoor/men/senior

const topPlayers = {
    women: [
        { rank: 1, athlete: 'Faith KIPYEGON', country: 'KEN', countryFlag: 'https://flagcdn.com/w320/ke.png', score: 1523 },
        { rank: 2, athlete: 'Diribe WELTEJI', country: 'ETH', countryFlag: 'https://flagcdn.com/w320/et.png', score: 1447 },
        { rank: 3, athlete: 'Laura MUIR', country: 'GBR', countryFlag: 'https://flagcdn.com/w320/gb.png', score: 1417 },
        { rank: 4, athlete: 'Freweyni HAILU', country: 'ETH', countryFlag: 'https://flagcdn.com/w320/et.png', score: 1413 },
        { rank: 5, athlete: 'Ciara MAGEEAN', country: 'IRL', countryFlag: 'https://flagcdn.com/w320/ie.png', score: 1396 },
        { rank: 6, athlete: 'Birke HAYLOM', country: 'ETH', countryFlag: 'https://flagcdn.com/w320/et.png', score: 1392 },
        { rank: 7, athlete: 'Nelly CHEPCHIRCHIR', country: 'KEN', countryFlag: 'https://flagcdn.com/w320/ke.png', score: 1388 },
        { rank: 8, athlete: 'Jessica HULL', country: 'AUS', countryFlag: 'https://flagcdn.com/w320/au.png', score: 1378 },
        { rank: 9, athlete: 'Hirut MESHESHA', country: 'ETH', countryFlag: 'https://flagcdn.com/w320/et.png', score: 1360 },
        { rank: 10, athlete: 'Katie SNOWDEN', country: 'GBR', countryFlag: 'https://flagcdn.com/w320/gb.png', score: 1340 },
    ],
    men: [
        { rank: 1, athlete: 'Jakob INGEBRIGTSEN', country: 'NOR', countryFlag: 'https://flagcdn.com/w320/no.png', score: 1524 },
        { rank: 2, athlete: 'Yared NUGUSE', country: 'USA', countryFlag: 'https://flagcdn.com/w320/us.png', score: 1457 },
        { rank: 3, athlete: 'Josh KERR', country: 'GBR', countryFlag: 'https://flagcdn.com/w320/gb.png', score: 1404 },
        { rank: 4, athlete: 'Narve Gilje NORDÅS', country: 'NOR', countryFlag: 'https://flagcdn.com/w320/no.png', score: 1402 },
        { rank: 5, athlete: 'Abel KIPSANG', country: 'KEN', countryFlag: 'https://flagcdn.com/w320/ke.png', score: 1397 },
        { rank: 6, athlete: 'Reynold Kipkorir CHERUIYOT', country: 'KEN', countryFlag: 'https://flagcdn.com/w320/ke.png', score: 1397 },
        { rank: 7, athlete: 'Mario GARCÍA', country: 'ESP', countryFlag: 'https://flagcdn.com/w320/es.png', score: 1386 },
        { rank: 8, athlete: 'George MILLS', country: 'GBR', countryFlag: 'https://flagcdn.com/w320/gb.png', score: 1372 },
        { rank: 9, athlete: 'Azzedine HABZ', country: 'FRA', countryFlag: 'https://flagcdn.com/w320/fr.png', score: 1370 },
        { rank: 10, athlete: 'Cole HOCKER', country: 'USA', countryFlag: 'https://flagcdn.com/w320/us.png', score: 1345 },
    ]
};

function renderTopPlayers(gender) {
    const playersTable = d3.select(`#${gender}-players-table tbody`);

    playersTable.selectAll('tr')
        .data(topPlayers[gender])
        .enter()
        .append('tr')
        .html(d => `<td>${d.rank}</td><td>${d.athlete}</td><td><img src="${d.countryFlag}" class="flag">${d.country}</td><td>${d.score}</td>`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTopPlayers('women');
    renderTopPlayers('men');
    console.log('topPlayers.js loaded');
});
