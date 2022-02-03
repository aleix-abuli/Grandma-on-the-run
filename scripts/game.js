class Game {
    constructor(ctx, player, obstacles, enemies, background, projectiles, helicopters, helibullets){
        this.ctx = ctx;
        this.player = player;
        this.projectiles = projectiles;
        this.obstacles = obstacles;
        this.enemies = enemies;
        this.background = background;
        this.helicopters = helicopters;
        this.helibullets = helibullets;
        this.hasShot = false;
        this.score = 0;
        this.frames = 0;
        this.frameNumber = 0;

        // Event listener for jumping
        document.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            if (event.code === 'Space') {
                this.player.jump();
                jump.play();
            }
        });

        // Event listener for shooting
        document.addEventListener('keyup', (event) => {
            if ((event.code === 'KeyS' && this.player.x === 100) && this.hasShot === false){
                
                this.projectiles.shootDentures(this.player.y);
                this.hasShot = true;
                dentures.play();

                setTimeout(() => {
                    this.hasShot = false;
                }, 300);
            }
        })
    };
    


    // ------ GAME LOOP METHODS ------

    // Start on click
    start(){
        this.init();
        this.play();
        
    };

    // Initialization
    init(){
        if(this.frameNumber) this.stop();
        this.frameNumber = 0;
        this.frames = 0;
        this.score = 0;
        this.background.init();
        this.player.init();
        this.obstacles.init();
        this.enemies.init();
        this.projectiles.init();
        this.helicopters.init();
        this.helibullets.init();
        backgroundMusic.play();
    };


    // Play every frame
    play(){
        this.move();
        this.destroyEnemies();
        this.scoreUpdate();
        this.increaseDifficulty();
        this.draw();

        if (this.checkCollisions()) this.gameOver();
        
        if (this.frameNumber !== null) {
            this.frameNumber = requestAnimationFrame(this.play.bind(this))
        }
    };


    // Stop when initializing to set everyhting back to the start
    stop(){
        cancelAnimationFrame(this.frameNumber);
        this.frameNumber = null;
        backgroundMusic.pause();
    };


    // Move every frame
    move(){
        this.frames ++;
        this.player.move(this.frames);
        this.background.move(this.frames);
        this.obstacles.move(this.frames);
        this.enemies.move(this.frames);
        this.projectiles.move(this.frames);
        this.helicopters.move(this.frames);
        this.helibullets.move(this.frames, this.helicopters.helicopters);
    };


    // Increasing difficulty every x frames
    increaseDifficulty(){
        this.enemies.increaseDifficulty(this.frames);
        this.obstacles.increaseDifficulty(this.frames);
        this.background.increaseVelocity(this.frames);
    };


    // Draw everything
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
    };


    // Updating score every 20 frames
    scoreUpdate(){
        if(this.frames !== 0 && this.frames% 20 === 0)this.score ++
    };


    // Draw score
    drawScore(){
        this.ctx.save();
        this.ctx.fillStyle = "#450099";
        this.ctx.font = "bold 24px 'Press Start 2P'";
        this.ctx.fillText(`SCORE: ${this.score}`, 30, 50);
        this.ctx.restore();
    };
    

    // Game Over
    gameOver(){
        over.play();
        this.stop();
        this.ctx.save();
        this.ctx.fillStyle = "rgba(69,0,154,0.7)";
        this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.font = "bold 32px 'Press Start 2P'";
        this.ctx.fillText(
            `Oops! Back to the asylum!`,
            this.ctx.canvas.width/2,
            this.ctx.canvas.height/2
        );
        this.ctx.restore();
    };



    // ------ GAME COLLISIONS METHODS ------

    // Returning true when the player collides with an obstacle
    checkCollisions(){
        let collisions = false;

        if(this.obstacles.chairs.some((chair) =>
            this.player.collidesWith(chair)) ||

            this.enemies.nurses.some((nurse) =>
            this.player.collidesWith(nurse)) ||

            this.helicopters.helicopters.some((helicopter) =>
            this.player.collidesWith(helicopter)) ||

            this.helibullets.bullets.some((bullet) =>
            this.player.collidesWith(bullet))
        ) {
            collisions = true;
        }

        return collisions;
    };


    // Checking for collisions between enemies and projectiles
    destroyEnemies(){
        // Splicing nurses and dentures when they collide or leave the canvas
        this.enemies.nurses.forEach((nurse, indexNurse)=>{
            this.projectiles.dentures.forEach((dentures, indexDenture)=>{

               if(dentures.x > this.ctx.canvas.width) this.projectiles.dentures.splice(indexDenture, 1);
               if(nurse.x < -500) this.enemies.nurses.splice(indexNurse, 1);
               
               if(this.contactCheck(nurse, dentures)) {
                this.enemies.nurses.splice(indexNurse,1);
                this.projectiles.dentures.splice(indexDenture,1);
                enemyKill.play();
               }
            })
        })

        // Splicing helicopters and dentures when they collide or leave the canvas
        this.helicopters.helicopters.forEach((helicopter, indexHelicopter)=>{
            this.projectiles.dentures.forEach((dentures, indexDenture)=>{

               if(dentures.x > this.ctx.canvas.width) this.projectiles.dentures.splice(indexDenture, 1);
               if(helicopter.x < -500) this.helicopters.helicopters.splice(indexHelicopter, 1);
                
               if(this.contactCheck(helicopter, dentures)) {
                this.helicopters.helicopters.splice(indexHelicopter,1)
                this.projectiles.dentures.splice(indexDenture,1)
                enemyKill.play();
               }
            })
        })

        // Splicing wheelchairs that have left the canvas
        this.obstacles.chairs.forEach((chair, indexChair)=>{
            if(chair.x < -500) this.obstacles.chairs.splice(indexChair, 1)
        })
    };


    // Checking for collisions between dentures and enemies
    contactCheck(element1,element2){
        return (element1.x <= element2.x + element2.width &&
            element1.x + element1.width >= element2.x &&  
    
            element1.y <= element2.y + element2.height &&
            element1.y + element1.height >= element2.y
        );
    };

}