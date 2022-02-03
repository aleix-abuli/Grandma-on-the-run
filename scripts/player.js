class Player{
    constructor(ctx){
        this.ctx = ctx;
        this.width = 80;
        this.height = 112;
        this.x = 100;
        this.y = 320;
        this.vy = 0; // velocity
        this.ay = 1; // gravity
        this.speed = 5;

        this.img = new Image();
        this.img.src = './images/grandma.png';

        this.spriteColumns = 4;
        this.spriteRows = 1;

        this.spriteCol = 0;
        this.spriteRow = 0;
        this.spriteX = 0;
        this.spriteY = 0;
    };


    // Player initial settings
    init(){
        this.x = -500;
        this.spriteCol = 0;
        this.spriteRow = 0;
        this.spriteX = 0;
        this.spriteY = 0;
    };


    // Move at every frame
    move(frames){
        if(this.x < 100){
            this.x += this.speed;
        }

        // Jumping "physics"
        this.vy += this.ay;
        this.y += this.vy;
    
        if(this.y > 320) this.y = 320;
        if(this.y < 40) this.y = 40;
    };


    // Jumping mechanics
    jump(){
        if(this.y === 320) this.vy = -23;
    };


    // Sprite logic to animate every 10 frames
    setSpriteFrame(frames){
        if(frames % 10 === 0){
            this.spriteCol += 1;

            if(this.spriteCol >= this.spriteColumns) {
                this.spriteCol = 0;
            }

            this.spriteX = (this.width * this.spriteCol);
            this.spriteY = (this.height * this.spriteRow);
        }
    };


    // Draw
    draw(frames){
        this.setSpriteFrame(frames);
        this.ctx.drawImage(
            this.img,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    };
    

    // Checking for collisions between the player and the obstacles/enemies
    collidesWith(object){
        return (
            this.x <= object.x + object.width &&
            this.x + this.width >= object.x &&  

            this.y <= object.y + object.height &&
            this.y + this.height >= object.y
        )
    };
}