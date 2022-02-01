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

    shootDentures(player) {
        const newDentures = {
            //img: new Image(),
            width: 50,
            height: 50,
            y: player.y,
            x: 100,
            vx : 8,
            vy: 0
        }

        return this.dentures.push(newDentures);
    }

    collidesWith(nurse){ // returns true or false
        return this.dentures.some((dentures) => 
        dentures.x <= nurse.x + nurse.width &&
        dentures.x + dentures.width >= nurse.x &&
        dentures.y <= nurse.y + nurse.height &&
        dentures.y + dentures.height >= nurse.y
        )
    }

    draw(frameNumber) {
        this.dentures.forEach((dentures) => {
            this.ctx.fillRect(dentures.x,dentures.y,dentures.width,dentures.height);
            }
        )
    }
}