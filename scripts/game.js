class Game {
    constructor(ctx, player, obstacles, enemies, background, projectiles){
        this.ctx = ctx;
        this.player = player;
        this.obstacles = obstacles;
        this.enemies = enemies;
        this.background = background;
        this.frameNumber = 0;
        this.projectiles = projectiles;
        this.isJumping = false;

        document.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            if (event.code === 'Space') {
                this.isJumping = true;
                if(this.isJumping) this.player.jump(this.frameNumber);
                this.isJumping = false;
            }

            /*document.addEventListener("keyup", (event) => { // not working :(
                if (this.isJumping){
                    setTimeout(()=>{this.isJumping = false;}, 100)
                }
            })*/
        });


        document.addEventListener('keyup', (event) => {
            if ((event.code === 'KeyS') && (this.isJumping === false)){
                this.projectiles.shootDentures(this.player);
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
        this.destroyEnemies();
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

    draw(){
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.background.draw(this.frameNumber);
        this.obstacles.draw(this.frameNumber);
        this.enemies.draw(this.frameNumber);
        this.player.draw(this.frameNumber);
        this.projectiles.draw(this.frameNumber);
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
               if(nurse.x > this.ctx.canvas.width) this.enemies.nurses.splice(indexNurse, 1)

                let distanceX = dentures.x - nurse.x;
                let distanceY = dentures.y - nurse.y;

                if((distanceX > -15 && distanceX < 1)&&(distanceY > -15 && distanceY < 1)) {   
                    this.enemies.nurses.splice(indexNurse,1)
                    this.projectiles.dentures.splice(indexDenture, 1)
                }
                
                console.log("distance", distanceX, distanceY)
           
           })


        })

        this.obstacles.chairs.forEach((chair, indexChair)=>{
            if(chair.x < -500) this.obstacles.chairs.splice(indexChair, 1)
            console.log("chairs", this.obstacles.chairs.length)
        })
    }

    gameOver(){
        this.stop();
        this.ctx.save();
    }

}