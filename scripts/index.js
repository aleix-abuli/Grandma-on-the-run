const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new Player(ctx);
const background = new Background(ctx);
const obstacles = new Obstacles(ctx);
const enemies = new Enemies(ctx);
const projectiles = new Projectiles(ctx);
const helicopters = new Helicopters(ctx);
const helibullets = new Helibullets(ctx);

const backgroundMusic = new Audio ('sound/bg-theme.mp3');
const jump = new Audio ('sound/jump.flac');
const dentures = new Audio ('sound/dentures.wav');
const enemyKill = new Audio ('sound/enemy.wav');
const over = new Audio ('sound/gameOver.wav');
const bulletSound = new Audio ('sound/helibullets.wav');

const game = new Game(ctx, player, obstacles, enemies, background, projectiles, helicopters, helibullets);

const startButton = document.getElementById('start-button');

startButton.addEventListener(
    'click', () => {
        startButton.textContent = 'RESTART';
        startButton.blur()
        game.start();
    }
)

