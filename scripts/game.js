class Game {
    constructor(ctx, player, obstacles, enemies, background, projectiles){
        this.ctx = ctx;
        this.player = player;
        this.obstacles = obstacles;
        this.enemies = enemies;
        this.background = background;
        this.frameNumber = 0;
        this.projectiles = projectiles;
        this.hasShot = false;
        this.score = 0;

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
        this.score = 0;
        this.background.init();
        this.player.init();
        this.obstacles.init();
        this.enemies.init();
        this.projectiles.init();
    };

    play(){
        this.move();
        this.draw();
        this.destroyEnemies();
        this.scoreUpdate();

        if (this.checkCollisions()) {
            console.log('oops');
            this.gameOver();
        }
        
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

        return collisions;
    }

    destroyEnemies(){
        this.enemies.nurses.forEach((nurse, indexNurse)=>{

            this.projectiles.dentures.forEach((dentures, indexDenture)=>{
               if(dentures.x > this.ctx.canvas.width) this.projectiles.dentures.splice(indexDenture, 1)
               if(nurse.x < -500) this.enemies.nurses.splice(indexNurse, 1)

                /*let distanceX = dentures.x - nurse.x;
                let distanceY = dentures.y - nurse.y - 35; // -35 bc if not it doesn't collide in the y axis
        
                if((distanceX > -15 && distanceX < 1)&&(distanceY > -15 && distanceY < 1)) {   
                    this.enemies.nurses.splice(indexNurse,1)
                    this.projectiles.dentures.splice(indexDenture, 1)
                }*/
                
                let collides = nurse.x <= dentures.x + dentures.width &&
                nurse.x + nurse.width >= dentures.x &&  
    
                nurse.y <= dentures.y + dentures.height &&
                nurse.y + nurse.height >= dentures.y;
                
                if(collides) {
                    this.enemies.nurses.splice(indexNurse,1)
                    this.projectiles.dentures.splice(indexDenture,1)
                }

                //console.log("distance", distanceX, distanceY)
           
           })


        })

        this.obstacles.chairs.forEach((chair, indexChair)=>{
            if(chair.x < -500) this.obstacles.chairs.splice(indexChair, 1)
            console.log("chairs", this.obstacles.chairs.length)
        })
    }

    draw(){
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.obstacles.draw(this.frameNumber);
        this.enemies.draw(this.frameNumber);
        this.player.draw(this.frameNumber);
        this.projectiles.draw(this.frameNumber);
        this.drawScore();
    }

    scoreUpdate(){
        if(this.frameNumber !== 0 && this.frameNumber%300 === 0)this.score ++
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
        this.ctx.font = "bold 32px sans-serif";
        this.ctx.fillText(
            "Game Over",
            this.ctx.canvas.width/2,
            this.ctx.canvas.height/2
        );
        this.ctx.restore();
    }

}