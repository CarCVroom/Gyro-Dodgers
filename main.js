const gammaMeter = document.getElementById('gammaMeter');
const betaMeter = document.getElementById('betaMeter');
const canvas = document.getElementById('gameCenter');
const button = document.getElementById('controls');
canvas.width = canvas.offsetWidth;
canvas.height = 500;
console.log(canvas.width, canvas.height);

let inGame = false;

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
console.log(isMobile)

const ctx = canvas.getContext('2d');

if (!isMobile) { // checks if device is PC
        drawNotOnMobile();
} else { 
        drawPause();
}

const player = { x: canvas.width/2 , y:canvas.height * 0.8, radius: 33 };

const playerSprite = new Image();
playerSprite.src = './assets/playerModel2.png';

const bgimg = new Image();
bgimg.src = './assets/gameBackground.png'; // "OMG AI IM GOING TO KILL THIS FAGGOT"
const bgimg2 = new Image();
bgimg2.src = './assets/gameBackground2.png';
const bgimg3 = new Image();
bgimg3.src = './assets/gameBackground3.png';

window.onload = function() {
        console.log("loaded", bgimg.width, bgimg.height);
        drawPause();
}

let bgY = 0;
const bgSpeed = 0.35;

function drawNotOnMobile() {
        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(bgimg2, 0, bgY, canvas.width, canvas.height);
        ctx.font = '75px Oxnaium';
        ctx.fillStyle = '#d7b3ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        ctx.shadowColor = '#b000ff'
        ctx.shadowBlur = 30;
        ctx.strokeStyle = "#24002a";
        ctx.lineWidth = 6;
        ctx.strokeText("Please use your mobile phone, and hold it vertical", canvas.width/2, canvas.height * 0.1);
        ctx.shadowBlur = 20; 
        ctx.fillStyle = "#d7b3ff";

        ctx.fillText("Please use your mobile phone, and hold it vertical", canvas.width/2, canvas.height * 0.1);
}

function drawPause() {
        inGame = false;
        ctx.clearRect(0,0, canvas.width, canvas.height);  

        ctx.drawImage(bgimg, 0, bgY, canvas.width, canvas.height);
        ctx.font = "65px Oxanium";
        ctx.fillStyle = '#d7b3ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        ctx.shadowColor = '#b000ff'
        ctx.shadowBlur = 30;
        ctx.strokeStyle = "#24002a";
        ctx.lineWidth = 6;
        ctx.strokeText("Press start", canvas.width/2, canvas.height * 0.1);
        ctx.shadowBlur = 20; 
        ctx.fillStyle = "#d7b3ff";

        ctx.fillText("Press start", canvas.width/2, canvas.height * 0.1);
}

function startGame() {
        inGame = true;
        button.remove();

        draw();
}

function draw() { // if 3 hits floor 1 and 2 go over to og spots and do stuff, it worked idk why but it does work
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(bgimg2, 0, bgY, canvas.width, canvas.height);
        ctx.drawImage(bgimg, 0, bgY - canvas.height, canvas.width, canvas.height);
        ctx.drawImage(bgimg3, 0, bgY - 2 * canvas.height, canvas.width, canvas.height);

        bgY += bgSpeed;

        if (bgY >= 2 * canvas.height) { bgY = 0 } // omg it works bruh.

        ctx.drawImage(playerSprite, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2);
}

window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth // test again
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

        if (inGame) { draw(); } else { drawPause(); }
});