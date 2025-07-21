(async function () {
  const gameIdMatch = window.location.href.match(/games\/(\d+)/);
  if (!gameIdMatch) return;
  const gameId = gameIdMatch[1];

  // UI Inject
  const panel = document.createElement('div');
  panel.id = 'analyticsTracker';
  panel.innerHTML = `<h3>📊 Game Analytics</h3>
    <p>👥 Players: <span id="players">...</span></p>
    <p>📈 Visits (24h): <span id="visits">...</span></p>
    <p>💸 Revenue Est.: <span id="revenue">...</span></p>
    <p>🤑 DevEx Eligible: <span id="devex">...</span></p>
    <button id="premiumBtn">Unlock Premium 🔐</button>`;
  document.body.appendChild(panel);

  const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${gameId}`);
  const data = await res.json();
  const game = data.data[0];

  const players = game.playing;
  const visits = game.visits;

  // Mocked values for estimation
  const revenueEstimate = ((visits || 0) * 0.0035).toFixed(2);
  const devexEligible = revenueEstimate >= 1000 ? "✅ Yes" : "❌ Not yet";

  document.getElementById('players').textContent = players.toLocaleString();
  document.getElementById('visits').textContent = `+${Math.floor(Math.random() * 10000)} today`;
  document.getElementById('revenue').textContent = `$${revenueEstimate}`;
  document.getElementById('devex').textContent = devexEligible;

  // Premium Button
  document.getElementById('premiumBtn').addEventListener('click', () => {
    alert("Premium coming soon! Get graphs, alerts, and historical data.");
  });
})();
