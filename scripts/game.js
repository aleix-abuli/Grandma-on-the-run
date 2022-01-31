class Game {
    constructor(ctx, player, obstacles, enemies, background, projectiles){
        this.ctx = ctx;
        this.player = player;
        this.obstacles = obstacles;
        this.enemies = enemies;
        this.background = background;
        this.frameNumber = 0;
        this.projectiles = projectiles;

        document.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            if (event.code === 'Space') {
                this.player.jump(this.frameNumber);
            }
        });

        document.addEventListener('', (event) => {
            if (event.code === 'KeyS'){
                this.projectiles.getDentures();
            }
        })
    };

    start(){
        this.init();
        this.play();
    };

    init(){
        if(this.frameNumber) this.stop();
        this.frameNumber = 0;
        this.background.init();
        this.player.init();
        this.obstacles.init();
        this.enemies.init();
        this.projectiles.init();
    };

    play(){
        this.move();
        this.draw();
        if (this.checkCollisions()) this.gameOver();
        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this));
        }
    };

    stop(){
        cancelAnimationFrame(this.frameNumber);
        this.frameNumber = null;
    }

    move(){
        this.player.move(this.frameNumber);
        this.background.move(this.frameNumber);
        this.obstacles.move(this.frameNumber);
        this.enemies.move(this.frameNumber);
        this.projectiles.move(this.frameNumber);
    }

    draw(){
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.obstacles.draw(this.frameNumber);
        this.enemies.draw(this.frameNumber);
        this.player.draw(this.frameNumber);
        this.projectiles.draw(this.frameNumber);
    }

    checkCollisions(){

    }

    gameOver(){

    }

}