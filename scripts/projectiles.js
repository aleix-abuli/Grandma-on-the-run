class Projectiles {
    constructor(ctx){
        this.ctx = ctx;
        this.dentures = [];
    }

    init(){

    }

    move(frameNumber) {
        this.dentures.forEach(dentures => dentures.x += dentures.vx)
    }

    getDentures() {
        const newDentures = {
            //img: new Image(),
            width: 50,
            height: 50,
            y: 320,
            x: 100,
            vx : 8,
            vy: 0
        }

        return this.dentures.push(newDentures);
    }

    draw(frameNumber) {
        this.dentures.forEach((dentures) => {
            this.ctx.fillRect(dentures.x,dentures.y,dentures.width,dentures.height);
            }
        )
    }
}