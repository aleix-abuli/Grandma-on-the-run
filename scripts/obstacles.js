class Obstacles{
    constructor(ctx){
        this.ctx = ctx;
        this.chairs = [];
    }

    init(){
        this.chairs = [];
    }

    move(frameNumber){
        if(frameNumber < 20) return;
        const randomGenerator = Math.floor(Math.random() * 100);
        if(frameNumber % 220 === 0){
            const chairPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 550)
            this.chairs.push(this.getChair(chairPosition));
        }

        this.chairs.forEach(chair => chair.x += chair.vx);
    }

    getChair(position){
        const newChair = {
            // img: new Image(),
            width: 80,
            height: 80,
            x: position + 550,
            y: 368,
            vx: -8,
            vy: 0
        }

        // newChair.img.src = 

        return newChair;
    }

    draw(frameNumber){
        this.chairs.forEach((chair) => {
            this.ctx.fillRect(chair.x,chair.y,chair.width,chair.height);
            }
        )
    }
}