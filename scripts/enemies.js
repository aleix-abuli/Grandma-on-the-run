class Enemies{
    constructor(ctx){
        this.ctx = ctx;
        this.nurseWidth =  68,
        this.nurseHeight = 108,
        this.nurseImg =  new Image(),
        this.nurseImg.src = "images/nurse.png"
        this.enemyRate = 150;
        this.enemyV = -8;
        this.nurses = [];
    }

    init(){
        this.nurses = [];
        this.enemyRate = 150;
        this.enemyV = -8;
        this.nurses.forEach(nurse => nurse.x = 2000)
    }

    move(frameNumber){ // PENSAR DIFICULTAT!!!
        if(frameNumber < 100) return;

        if(frameNumber % this.enemyRate === 0){
            const nursePosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.nurses.push(this.getNurse(nursePosition));
        }
    
        this.nurses.forEach(nurse => nurse.x += nurse.vx);
    }

    increaseDifficulty(frameNumber){
        if(frameNumber % 500 === 0 && frameNumber !== 0){
            this.enemyRate -= 6;
            this.enemyV -= 0.5;
        }
    }

    setSpriteFrame(nurse, frameNumber) {
        if(frameNumber % 10 === 0) {
            nurse.spriteCol += 1;
    
            if(nurse.spriteCol >= nurse.spriteColumns) {
                nurse.spriteCol = 0;
            }
    
            nurse.spriteX = (nurse.width * nurse.spriteCol)
            nurse.spriteY = (nurse.height * nurse.spriteRow)
        }
    }

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
    }

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
        
    }
}