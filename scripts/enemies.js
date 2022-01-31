class Enemies{
    constructor(ctx){
        this.ctx = ctx;
        this.nurses = [];
    }

    init(){
        this.nurses = [];
    }

    move(frameNumber){
        if(frameNumber < 20) return;
        if(frameNumber % 150 === 0){
            const nursePosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.nurses.push(this.getNurse(nursePosition));
        }

        this.nurses.forEach(nurse => nurse.x += nurse.vx);
    }

    getNurse(position){
        const newNurse = {
            // img: new Image(),
            width: 128,
            height: 128,
            x: position,
            y: 320,
            vx: -8,
            vy: 0
        }

        // newChair.img.src = 

        return newNurse;
    }
    draw(frameNumber){
        this.nurses.forEach((nurse) => {
            this.ctx.fillRect(nurse.x,nurse.y,nurse.width,nurse.height);
            }
        )
        
    }
}