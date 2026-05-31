const gammaMeter = document.getElementById('gammaMeter');
const betaMeter = document.getElementById('betaMeter');
const canvas = document.getElementById('gameCenter');
canvas.width = canvas.offsetWidth;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const player = { x: 75, y: 75, radius: 37.5 };

function drawPlayer() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.lineWidth = 2;
        ctx.fill();
}

window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth
});

window.addEventListener('deviceorientation', (e) => {
        const { alpha, beta, gamma } = e;
        
        gammaMeter.textContent = `Gamma: ${e.gamma}`;
        betaMeter.textContent = `Beta: ${e.beta}`;
});

drawPlayer();