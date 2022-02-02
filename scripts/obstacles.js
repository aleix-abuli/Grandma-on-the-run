class Obstacles{
    constructor(ctx){
        this.ctx = ctx;
        this.chairWidth = 53;
        this.chairHeight = 55;
        this.chairImg = new Image();
        this.chairImg.src = "/images/wheelchair.png"
        this.chairs = [];
    }

    init(){
        this.chairs = [];
    }

    move(frameNumber){
        if(frameNumber < 20) return;
        if(frameNumber % 220 === 0){
            const chairPosition = Math.floor((Math.random() * (this.ctx.canvas.width)))
            this.chairs.push(this.getChair(chairPosition));
        }

        this.chairs.forEach(chair => chair.x += chair.vx);
    }

    getChair(position){
        const newChair = {
            width: this.chairWidth,
            height: this.chairHeight,
            x: position + 1000,
            y: 340,
            vx: -8,
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