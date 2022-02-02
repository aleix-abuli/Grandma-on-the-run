class Obstacles{
    constructor(ctx){
        this.ctx = ctx;
        this.chairWidth = 53;
        this.chairHeight = 55;
        this.chairImg = new Image();
        this.chairImg.src = "/images/wheelchair.png"
        this.obstacleV = -5;
        this.obstacleRate = 220;
        this.chairs = [];
    }

    init(){
        this.chairs = [];
        this.obstacleRate = 220;
        this.obstacleV = -5;
    }

    move(frameNumber){
        if(frameNumber < 100) return;

        if(frameNumber % this.obstacleRate === 0){
            const chairPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.chairs.push(this.getChair(chairPosition));
        }

        this.chairs.forEach(chair => chair.x += chair.vx);
    }

    increaseDifficulty(frameNumber){
        if(frameNumber % 500 === 0 && frameNumber !== 0){
            this.obstacleRate -= 6;
            this.obstacleV -= 0.5;
        }
    }

    getChair(position){
        const newChair = {
            width: this.chairWidth,
            height: this.chairHeight,
            x: position + 100,
            y: 340,
            vx: this.obstacleV,
            vy: 0
        }

        return newChair;
    }

    draw(frameNumber){
        this.chairs.forEach((chair) => {
            this.ctx.drawImage(
                this.chairImg,
                chair.x,
                chair.y,
                chair.width * 1.5,
                chair.height * 1.5
            )
        })
    }
}