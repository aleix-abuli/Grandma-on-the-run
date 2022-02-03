class Projectiles {
    constructor(ctx){
        this.ctx = ctx;
        this.denturesHeight = 75;
        this.denturesWidth = 54;

        this.denturesImg = new Image(),
        this.denturesImg.src = '/images/dentures.png'

        this.dentures = [];
    };


    // Projectiles initial settings
    init(){
        this.dentures = [];
    };


    // Projectiles movement through the canvas
    move(frameNumber) {
        this.dentures.forEach(dentures => dentures.x += dentures.vx)
    };


    // Shooting projectiles method called by keybord "s". Takes player position as a reference
    shootDentures(position) {
        const newDentures = {
            width: this.denturesWidth,
            height: this.denturesHeight,
            y: position + 35,
            x: 150,
            vx : 8,
            vy: 0,

            spriteColumns: 2,
            spriteRows: 1,

            spriteCol: 0,
            spriteRow: 0,
            spriteX: 0,
            spriteY: 0
        }
        return this.dentures.push(newDentures);
    };


    // Sprite logic to animate every 10 frames
    setSpriteFrame(dentures, frameNumber){
        if(frameNumber % 10 === 0) {
            dentures.spriteCol += 1;
    
            if(dentures.spriteCol >= dentures.spriteColumns) {
                dentures.spriteCol = 0;
            }
    
            dentures.spriteX = (dentures.width * dentures.spriteCol)
            dentures.spriteY = (dentures.height * dentures.spriteRow)
        }
    }


    // Draw
    draw(frameNumber) {
        this.dentures.forEach((dentures) => {
            this.setSpriteFrame(dentures, frameNumber)
            this.ctx.drawImage(
                this.denturesImg,
                dentures.spriteX,
                dentures.spriteY,
                dentures.width,
                dentures.height,
                dentures.x,
                dentures.y,
                dentures.width,
                dentures.height
            )
        })
    }
}