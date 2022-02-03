class Game {
    constructor(ctx, player, obstacles, enemies, background, projectiles, helicopters, helibullets){
        this.ctx = ctx;
        this.player = player;
        this.obstacles = obstacles;
        this.enemies = enemies;
        this.background = background;
        this.helicopters = helicopters;
        this.helibullets = helibullets;
        this.frameNumber = 0;
        this.projectiles = projectiles;
        this.hasShot = false;
        this.score = 0;
        this.frames = 0;

        document.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            if (event.code === 'Space') {
                this.player.jump(this.frameNumber);
            }
        });

        document.addEventListener('keyup', (event) => {
            if ((event.code === 'KeyS' && this.player.x === 100) && this.hasShot === false){
                
                this.projectiles.shootDentures(this.player);
                this.hasShot = true;

                setTimeout(() => {
                    this.hasShot = false;
                }, 300);
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
        this.frames = 0;
        this.obstacles.nurses = [];
        this.obstacles.chairs = [];
        this.helicopters.helicopters = [];
        console.log(this.frameNumber)
        this.score = 0;
        this.background.init();
        this.player.init();
        this.obstacles.init();
        this.enemies.init();
        this.projectiles.init();
        this.helicopters.init();
        this.helibullets.init();
    };

    play(){
        this.move();
        this.draw();
        this.destroyEnemies();
        this.scoreUpdate();
        this.increaseDifficulty();
        if (this.checkCollisions()) {
            console.log('oops');
            this.gameOver();
        }
        
        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this));
        }
        
        this.enemies.nurses.forEach(enemy => console.log('enemy', enemy.vx))
        this.obstacles.chairs.forEach(chair => console.log('chair', chair.vx))

        console.log('FRAMENUMBER',this.frameNumber)
        console.log('FRAMES',this.frames)
    };

    stop(){
        cancelAnimationFrame(this.frameNumber);
        this.frameNumber = null;
        
    }

    move(){
        this.frames ++;
        this.player.move(this.frames);
        this.background.move(this.frames);
        this.obstacles.move(this.frames);
        this.enemies.move(this.frames);
        this.projectiles.move(this.frames);
        this.helicopters.move(this.frames);
        this.helibullets.move(this.frames, this.helicopters.helicopters);
    }

    checkCollisions(){
        let collisions = false;


        if (this.obstacles.chairs.some((chair) =>
            this.player.collidesWith(chair)
                )
            )   {
            collisions = true;
        }

        if (this.enemies.nurses.some((nurse) =>
            this.player.collidesWith(nurse)
                )
            )   {
            collisions = true;
        }

        if (this.helicopters.helicopters.some((helicopter) =>
            this.player.collidesWith(helicopter)
                )
            )   {
            collisions = true;
        }

        if (this.helibullets.bullets.some((bullet) =>
            this.player.collidesWith(bullet)
                )
            )   {
            collisions = true;
        }

        return collisions;
    }

    destroyEnemies(){
        this.enemies.nurses.forEach((nurse, indexNurse)=>{

            this.projectiles.dentures.forEach((dentures, indexDenture)=>{
               if(dentures.x > this.ctx.canvas.width) this.projectiles.dentures.splice(indexDenture, 1);
               if(nurse.x < -500) this.enemies.nurses.splice(indexNurse, 1);
                
                let collides = nurse.x <= dentures.x + dentures.width &&
                nurse.x + nurse.width >= dentures.x &&  
    
                nurse.y <= dentures.y + dentures.height &&
                nurse.y + nurse.height >= dentures.y;
                
                if(collides) {
                    this.enemies.nurses.splice(indexNurse,1)
                    this.projectiles.dentures.splice(indexDenture,1)
                }
           })
        })

        this.helicopters.helicopters.forEach((helicopter, indexHelicopter)=>{

            this.projectiles.dentures.forEach((dentures, indexDenture)=>{
               if(dentures.x > this.ctx.canvas.width) this.projectiles.dentures.splice(indexDenture, 1);
               if(helicopter.x < -500) this.helicopters.helicopters.splice(indexHelicopter, 1);
                
                let collides = helicopter.x <= dentures.x + dentures.width &&
                helicopter.x + helicopter.width >= dentures.x &&  
    
                helicopter.y <= dentures.y + dentures.height &&
                helicopter.y + helicopter.height >= dentures.y;
                
                if(collides) {
                    this.helicopters.helicopters.splice(indexHelicopter,1)
                    this.projectiles.dentures.splice(indexDenture,1)
                }
           })
        })

        this.obstacles.chairs.forEach((chair, indexChair)=>{
            if(chair.x < -500) this.obstacles.chairs.splice(indexChair, 1)
        })
    }

    increaseDifficulty(){
        this.enemies.increaseDifficulty(this.frameNumber);
        this.obstacles.increaseDifficulty(this.frameNumber);
        this.background.increaseVelocity(this.frameNumber);
    }

    draw(){
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.obstacles.draw(this.frameNumber);
        this.enemies.draw(this.frameNumber);
        this.player.draw(this.frameNumber);
        this.projectiles.draw(this.frameNumber);
        this.helicopters.draw(this.frameNumber);
        this.helibullets.draw(this.frameNumber);
        this.drawScore();
    }

    scoreUpdate(){
        if(this.frameNumber !== 0 && this.frameNumber % 20 === 0) this.score ++
    }

    drawScore(){
        this.ctx.save();
        this.ctx.fillStyle = "#450099";
        this.ctx.font = "bold 24px 'Press Start 2P'";
        this.ctx.fillText(`SCORE: ${this.score}`, 30, 50);
        this.ctx.restore();
    }
    
    gameOver(){
        this.stop();
        this.ctx.save();
        this.ctx.fillStyle = "rgba(69,0,154,0.7)";
        this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.font = "bold 32px 'Press Start 2P'";
        this.ctx.fillText(
            `Oops!\nBack to the asylum!`,
            this.ctx.canvas.width/2,
            this.ctx.canvas.height/2
        );
        this.ctx.restore();
    }

}