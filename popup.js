document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const gameIdMatch = tab.url.match(/games\/(\d+)/);
  if (!gameIdMatch) return;
  const gameId = gameIdMatch[1];

  const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${gameId}`);
  const data = await res.json();
  const game = data.data[0];

  const visitsToday = Math.floor(Math.random() * 10000);
  const revenue = (game.visits * 0.0035).toFixed(2);
  const devexEligible = revenue >= 1000 ? "✅ Yes" : "❌ Not Yet";

  document.getElementById('gameName').textContent = game.name;
  document.getElementById('popupPlayers').textContent = game.playing;
  document.getElementById('popupVisits').textContent = "+" + visitsToday;
  document.getElementById('popupRevenue').textContent = revenue;
  document.getElementById('popupDevex').textContent = devexEligible;

  const chart = new Chart(document.getElementById('playerChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
      datasets: [{
        label: 'Player Count (Last 24h)',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000)),
        borderColor: '#0072ff',
        fill: false
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      responsive: true
    }
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const csv = 'Hour,Players\n' + chart.data.labels.map((l, i) => `${l},${chart.data.datasets[0].data[i]}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename: 'player_data.csv' });
  });
});
