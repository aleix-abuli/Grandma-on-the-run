class Obstacles{
    constructor(ctx){
        this.ctx = ctx;
        this.chairWidth = 53;
        this.chairHeight = 55;

        this.chairImg = new Image();
        this.chairImg.src = "images/wheelchair.png"

        this.obstacleV = -5; // Velocity that increments with increaseDifficulty()
        this.obstacleRate = 220; // Rate of frames at which obstacles are created

        this.chairs = [];
    };


    // Obstacles initial settings
    init(){
        this.chairs = [];
        this.obstacleRate = 220;
        this.obstacleV = -5;
    };


    // Chairs start appearing at random spacing in a set rate
    move(frames){
        if(frames < 100) return;

        if(frames % this.obstacleRate === 0){
            const chairPosition = Math.floor((Math.random() * (this.ctx.canvas.width)) + 1000)
            this.chairs.push(this.getChair(chairPosition));
        }

        this.chairs.forEach(chair => chair.x += chair.vx);
    };


    // Method to create new objects to be pushed in move
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
    };


    // Increasing difficulty method
    increaseDifficulty(frames){
        if(frames % 500 === 0 && frames !== 0){
            this.obstacleRate -= 6;
            this.obstacleV -= 0.5;
        }
    };

    
    // Draw
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
    };
}