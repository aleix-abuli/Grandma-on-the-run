class Enemies{
    constructor(ctx){
        this.ctx = ctx;
        this.nurseWidth =  68,
        this.nurseHeight = 108,

        this.nurseImg =  new Image(),
        this.nurseImg.src = "images/nurse.png"

        this.enemyRate = 150; // Velocity that increments with increaseDifficulty()
        this.enemyV = -8; // Rate of frames at which enemies are created

        this.nurses = [];
    };

    // Enemies initial settings
    init(){
        this.nurses = [];
        this.enemyRate = 150;
        this.enemyV = -8;
    };


    // Enemies start appearing at random spacing in a set rate
    move(frames){
        if(frames < 100) return;

        if(frames % this.enemyRate === 0){
            const nursePosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.nurses.push(this.getNurse(nursePosition));
        }
    
        this.nurses.forEach(nurse => nurse.x += nurse.vx);
    };


    // Method to create new objects to be pushed in move
    getNurse(position){
        const newNurse = {
            x: position,
            y: 320,
            vx: this.enemyV,
            vy: 0,
            width: this.nurseWidth,
            height: this.nurseHeight,

            spriteColumns: 4,
            spriteRows: 1,

            spriteCol: 0,
            spriteRow: 0,
            spriteX: 0,
            spriteY: 0,
        }


        return newNurse;
    };


    // Increasing difficulty method
    increaseDifficulty(frames){
        if(frames === 0) {
            this.enemyRate = 150;
            this.enemyV = -8;
        } else {
            this.enemyRate -= 6;
            this.enemyV -= 0.5;
        }
    };

    
    // Sprite logic to animate every 10 frames
    setSpriteFrame(nurse, frameNumber) {
        if(frameNumber % 10 === 0) {
            nurse.spriteCol += 1;
    
            if(nurse.spriteCol >= nurse.spriteColumns) {
                nurse.spriteCol = 0;
            }
    
            nurse.spriteX = (nurse.width * nurse.spriteCol)
            nurse.spriteY = (nurse.height * nurse.spriteRow)
        }
    };


    // Draw
    draw(frameNumber){
        this.nurses.forEach((nurse) => {
            this.setSpriteFrame(nurse, frameNumber);
            this.ctx.drawImage(
                this.nurseImg,
                nurse.spriteX,
                nurse.spriteY,
                nurse.width,
                nurse.height,
                nurse.x,
                nurse.y,
                nurse.width,
                nurse.height
            )
        })    
    };
}