class Player{
    constructor(ctx){
        this.ctx = ctx;
        this.width = 128;
        this.height = 128;
        this.x = 100;
        this.y = 320;
        this.vy = 0; // velocity
        this.ay = 1; // gravity

    }

    init(){
    }

    move(frameNumber){
        this.vy += this.ay;
        this.y += this.vy;
        if(this.y > 320) this.y = 320;
        if(this.y < 40) this.y = 40;
        
    }

    jump(frameNumber){
        this.vy = -23;
    }

    draw(frameNumber){
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    
    collidesWith(object){
        return (
            this.x <= object.x + object.width &&
            this.x + this.width >= object.x &&  

            this.y <= object.y + object.height &&
            this.y + this.height >= object.y

        );
    }
}