const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new Player(ctx);
const background = new Background(ctx);
const obstacles = new Obstacles(ctx);
const enemies = new Enemies(ctx);
const projectiles = new Projectiles(ctx);
const helicopters = new Helicopters(ctx);
const helibullets = new Helibullets(ctx);

const game = new Game(ctx, player, obstacles, enemies, background, projectiles, helicopters, helibullets);

const startButton = document.getElementById('start-button');

startButton.addEventListener(
    'click', () => {
        startButton.textContent = 'RESTART';
        startButton.blur()
        game.start();
    }
)

console.log('what');