const gammaMeter = document.getElementById('gammaMeter');
const betaMeter = document.getElementById('betaMeter');
const canvas = document.getElementById('gameCenter');
canvas.width = canvas.offsetWidth;
canvas.height = 500;
console.log(canvas.width, canvas.height);

const ctx = canvas.getContext('2d');

const player = { x: canvas.width/2 , y:canvas.height * 0.8, radius: 37.5 };

const bgimg = new Image();
bgimg.src = './assets/gameBackground.png'; // "OMG AI IM GOING TO KILL THIS FAGGOT"

const playerSprite = new Image();
playerSprite.src = './assets/playerModel2.png';

window.onload = function() {
        console.log("loaded", bgimg.width, bgimg.height);
        draw();
}

let bgY = 0;
const bgSpeed = 0.35;

function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(bgimg, 0, bgY);
        ctx.drawImage(bgimg, 0, bgY - canvas.height);

        bgY += bgSpeed;

        if (bgY >= canvas.height) { bgY = 0 }

        ctx.drawImage(playerSprite, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2);
}

window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth
});

window.addEventListener('deviceorientation', (e) => {
        const { alpha, beta, gamma } = e;

        if (e.gamma < - 15) {
                player.x -= 2;
        }

        if (e.gamma > 15) {
                player.x += 2;
        }
        
        gammaMeter.textContent = `Gamma: ${e.gamma}`;
        betaMeter.textContent = `Beta: ${e.beta}`;

        player.x = Math.max(player.radius, Math.min(canvas.width  - player.radius, player.x));

        draw();
});

draw();