// Basic elements setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new Player(ctx);
const background = new Background(ctx);
const obstacles = new Obstacles(ctx);
const enemies = new Enemies(ctx);
const projectiles = new Projectiles(ctx);
const helicopters = new Helicopters(ctx);
const helibullets = new Helibullets(ctx);

// Audio setup
const backgroundMusic = new Audio ('sound/bg-theme.mp3');
const jump = new Audio ('sound/jump.flac');
const dentures = new Audio ('sound/dentures.wav');
const enemyKill = new Audio ('sound/enemy.wav');
const over = new Audio ('sound/gameOver.wav');
const bulletSound = new Audio ('sound/helibullets.wav');

//Game setup
const game = new Game(ctx, player, obstacles, enemies, background, projectiles, helicopters, helibullets);

//Start event
const startButton = document.getElementById('start-button');
const title = document.getElementById('title');
const description = document.getElementById('description');
const instructions = document.querySelector('.instructions');

startButton.addEventListener(
    'click', () => {
        title.classList.add('dispNone');
        description.classList.add('dispNone');
        instructions.classList.add('dispNone');
        canvas.classList.remove('dispNone');

        startButton.classList.add('relative');
        startButton.classList.remove('purpleBG');
        startButton.textContent = 'RESTART';
        startButton.blur();
        game.start();
    }
)

