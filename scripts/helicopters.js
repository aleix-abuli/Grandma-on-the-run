class Helicopters{
    constructor(ctx){
        this.ctx = ctx;
        this.helicopterWidth =  150,
        this.helicopterHeight = 90,
        this.helicopterImg =  new Image(),
        this.helicopterImg.src = "images/helicopter.png"
        this.helicopters = [];
    }

    init(){
        this.helicopters = [];
        this.helicopters.forEach(helicopter => helicopter.x = 2000)
    }

    move(frameNumber){
        if(frameNumber < 100) return;

        if(frameNumber > 1500 && frameNumber % 500 === 0){
            const helicopterPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.helicopters.push(this.getHelicopter(helicopterPosition));
        }
    
        this.helicopters.forEach(helicopter => helicopter.x += helicopter.vx);
    }

    setSpriteFrame(helicopter, frameNumber) {
        if(frameNumber % 10 === 0) {
            helicopter.spriteCol += 1;
    
            if(helicopter.spriteCol >= helicopter.spriteColumns) {
                helicopter.spriteCol = 0;
            }
    
            helicopter.spriteX = (helicopter.width * helicopter.spriteCol)
            helicopter.spriteY = (helicopter.height * helicopter.spriteRow)
        }
    }

    getHelicopter(position){
        const newHelicopter = {
            x: position,
            y: 80,
            vx: -7,
            vy: 0,
            width: this.helicopterWidth,
            height: this.helicopterHeight,

            spriteColumns: 2,
            spriteRows: 1,

            spriteCol: 0,
            spriteRow: 0,
            spriteX: 0,
            spriteY: 0,
        }


        return newHelicopter;
    }

    draw(frameNumber){
        this.helicopters.forEach((helicopter) => {
            this.setSpriteFrame(helicopter, frameNumber);
            this.ctx.drawImage(
                this.helicopterImg,
                helicopter.spriteX,
                helicopter.spriteY,
                helicopter.width,
                helicopter.height,
                helicopter.x,
                helicopter.y,
                helicopter.width,
                helicopter.height
            )
        })
        
    }
}