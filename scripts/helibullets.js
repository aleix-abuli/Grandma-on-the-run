class Helibullets {
    constructor(ctx){
        this.ctx = ctx;
        this.bulletsHeight = 26;
        this.bulletsWidth = 50;

        this.bulletsImg = new Image(),
        this.bulletsImg.src = '/images/bullets.png'

        this.bullets = [];
    };


    // Bullet initial settings
    init(){
        this.bullets = [];
    };


    // Every 100 frames helicopters shoot while they are inside the canvas
    move(frameNumber, helicopterArr) {
        if(frameNumber%100 === 0) helicopterArr.forEach((helicopter)=>{
            if(helicopter.x < this.ctx.canvas.width){
                this.shoot(helicopter);
                bulletSound.play();
            }
        })
        
        this.bullets.forEach(bullet => bullet.x += bullet.vx)
    };


    // A bullet is pushed to the array of bullets
    shoot(helicopter) {
        const newBullet = {
            width: this.bulletsWidth,
            height: this.bulletsHeight,
            y: 80 + 35,
            x: helicopter.x,
            vx : -12,
            vy: 0,

            spriteColumns: 2,
            spriteRows: 1,

            spriteCol: 0,
            spriteRow: 0,
            spriteX: 0,
            spriteY: 0
        }
        return this.bullets.push(newBullet);
    };


    // Sprite logic to animate every 10 frames
    setSpriteFrame(bullet, frameNumber){
        if(frameNumber % 10 === 0) {
            bullet.spriteCol += 1;
    
            if(bullet.spriteCol >= bullet.spriteColumns) {
                bullet.spriteCol = 0;
            }
    
            bullet.spriteX = (bullet.width * bullet.spriteCol)
            bullet.spriteY = (bullet.height * bullet.spriteRow)
        }
    };


    // Draw
    draw(frameNumber) {
        this.bullets.forEach((bullet) => {
            this.setSpriteFrame(bullet, frameNumber)
            this.ctx.drawImage(
                this.bulletsImg,
                bullet.spriteX,
                bullet.spriteY,
                bullet.width,
                bullet.height,
                bullet.x,
                bullet.y,
                bullet.width,
                bullet.height
            )
        })
    };
}