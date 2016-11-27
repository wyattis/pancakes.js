class Animation {

    constructor(spritesheet, frames, animationTime, options) {

        this.currentIndex = 0;
        this.frames = frames;
        this.spritesheet = spritesheet;
        this.timeSinceLastFrameChange = 0;
        this.width = spritesheet.tileWidth;
        this.height = spritesheet.tileHeight;
        this.debug = true;
        
        this.onFinishCB = null;
        this.onRepeatCB = null;
        
        if(options){
            if(options.backAndForth){
                this.frames = frames.concat(frames.slice(1, frames.length - 1).reverse());
            }
        }

        this.frameTime = animationTime / this.frames.length;
        
        console.log('Animation frameTime', this.frameTime);
        
    }
    
    onFinish(cb){
        this.onFinishCB = cb;   
    }
    
    onRepeat(cb){
        this.onRepeatCB = cb;
    }
    
    update(delta) {
        
        this.timeSinceLastFrameChange += delta;
        
        // console.log(this.frameTime, this.currentIndex + '/' + this.frames.length, this.timeSinceLastFrameChange, delta);
        if (this.timeSinceLastFrameChange >= this.frameTime) {

            // if we are on the last frame then set it to the first frame
            if (this.currentIndex === this.frames.length - 1) {
                
                this.currentIndex = 0;

            }
            else{
                
                this.currentIndex ++;
                
            }
            
            this.timeSinceLastFrameChange = this.timeSinceLastFrameChange % this.frameTime;

        }

    }
    
    reset(index){
        
        this.currentIndex = 0;
        
    }
    
    render(ctx, x, y){
        
        this.spritesheet.render(ctx, x, y, this.frames[this.currentIndex], this.debug);
        
    }

}