class Helicopters{
    constructor(ctx){
        this.ctx = ctx;
        this.helicopterWidth =  150,
        this.helicopterHeight = 90,

        this.helicopterImg =  new Image(),
        this.helicopterImg.src = "images/helicopter.png"

        this.helicopters = [];
    };


    // Helicopters initial settings
    init(){
        this.helicopters = [];
    };


    // Once the game has run for more than 1500 frames, helicopters appear at random spacing
    move(frameNumber){
        if(frameNumber < 100) return;

        if(frameNumber > 1500 && frameNumber % 500 === 0){
            const helicopterPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.helicopters.push(this.getHelicopter(helicopterPosition));
        }
    
        this.helicopters.forEach(helicopter => helicopter.x += helicopter.vx);
    };


    // Sprite logic to animate every 10 frames
    setSpriteFrame(helicopter, frameNumber) {
        if(frameNumber % 10 === 0) {
            helicopter.spriteCol += 1;
    
            if(helicopter.spriteCol >= helicopter.spriteColumns) {
                helicopter.spriteCol = 0;
            }
    
            helicopter.spriteX = (helicopter.width * helicopter.spriteCol)
            helicopter.spriteY = (helicopter.height * helicopter.spriteRow)
        }
    };

    // Method to create new helicopters to be pushed in move
    getHelicopter(position){
        const newHelicopter = {
            x: position,
            y: 80,
            vx: -6,
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
    };


    // Draw
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
        
    };
}