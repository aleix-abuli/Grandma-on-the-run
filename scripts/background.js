class Background{
    constructor(ctx){
        this.ctx = ctx;

        this.backgroundFront = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            x: 0,
            y: 0,
            vx: -3,
            vy: 0
        }

        this.backgroundFront.img.src = "/images/bg-1.png";

        
        this.backgroundParallax1 = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            x: 0,
            y: 0,
            vx: -1.5,
            vy: 0
        }

        this.backgroundParallax1.img.src = "/images/bg-2.png";

        this.backgroundParallax2 = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            x: 0,
            y: 0,
            vx: -1,
            vy: 0
        }

        this.backgroundParallax2.img.src = "/images/bg-3.png";

        this.backgroundFar = {
            img: new Image(),
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
            x: 0,
            y: 0,
            vx: -0.5,
            vy: 0
        }

        this.backgroundFar.img.src = "/images/bg-4.png";
    }

    init(){
        this.backgroundFar.x = 0;
        this.backgroundFar.y = 0;
        this.backgroundParallax2.x = 0;
        this.backgroundParallax2.y = 0;
        this.backgroundParallax1.x = 0;
        this.backgroundParallax1.y = 0;
        this.backgroundFront.x = 0;
        this.backgroundFront.y = 0;
    }

    move(frameNumber){
        this.backgroundFar.x += this.backgroundFar.vx;
        this.backgroundParallax2.x += this.backgroundParallax2.vx;
        this.backgroundParallax1.x += this.backgroundParallax1.vx;
        this.backgroundFront.x += this.backgroundFront.vx;

        if(this.backgroundFar.x + this.backgroundFar.width <= 0) this.backgroundFar.x = 0;
        if(this.backgroundParallax2.x + this.backgroundParallax2.width <= 0) this.backgroundParallax2.x = 0;
        if(this.backgroundParallax1.x + this.backgroundParallax1.width <= 0) this.backgroundParallax1.x = 0;
        if(this.backgroundFront.x + this.backgroundFront.width <= 0) this.backgroundFront.x = 0;
    }

    draw(frameNumber){
        this.ctx.drawImage(
            this.backgroundFar.img,
            this.backgroundFar.x,
            this.backgroundFar.y,
            this.backgroundFar.width,
            this.backgroundFar.height
        )
    
        this.ctx.drawImage(
            this.backgroundFar.img,
            this.backgroundFar.x + this.backgroundFar.width,
            this.backgroundFar.y,
            this.backgroundFar.width,
            this.backgroundFar.height
        )

        this.ctx.drawImage(
            this.backgroundParallax2.img,
            this.backgroundParallax2.x,
            this.backgroundParallax2.y,
            this.backgroundParallax2.width,
            this.backgroundParallax2.height
        )
    
        this.ctx.drawImage(
            this.backgroundParallax2.img,
            this.backgroundParallax2.x + this.backgroundParallax2.width,
            this.backgroundParallax2.y,
            this.backgroundParallax2.width,
            this.backgroundParallax2.height
        )

        this.ctx.drawImage(
            this.backgroundParallax1.img,
            this.backgroundParallax1.x,
            this.backgroundParallax1.y,
            this.backgroundParallax1.width,
            this.backgroundParallax1.height
        )
    
        this.ctx.drawImage(
            this.backgroundParallax1.img,
            this.backgroundParallax1.x + this.backgroundParallax1.width,
            this.backgroundParallax1.y,
            this.backgroundParallax1.width,
            this.backgroundParallax1.height
        )

        this.ctx.drawImage(
            this.backgroundFront.img,
            this.backgroundFront.x,
            this.backgroundFront.y,
            this.backgroundFront.width,
            this.backgroundFront.height
        )
        
        this.ctx.drawImage(
            this.backgroundFront.img,
            this.backgroundFront.x + this.backgroundFront.width,
            this.backgroundFront.y,
            this.backgroundFront.width,
            this.backgroundFront.height
        )

    }
}