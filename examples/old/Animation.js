/*global Engine*/
"use strict";
Engine.Animation = class Animation{
    
    constructor(engine, spritesheet, frames, animationTime){
        
        this.engine = engine;
        this.currentIndex = 0;
        this.frameTime = animationTime / frames.length;
        this.frames = frames;
        this.spritesheet = spritesheet;
        this.width = spritesheet.tileWidth;
        this.height = spritesheet.tileHeight;
        this.debug = false;
        
        console.log('Animation frame time', this.frameTime);
        
        this.engine.ticker.add(this, this.update, this.frameTime);
        this.engine.ticker.add(this, this.render, Engine.FPS)
    }
    
    update(delta){
                 
        if(this.currentIndex === this.frames.length - 1){
            // We are on the last frame so go to 0 index
            
            this.currentIndex = 0;
            
        }
        else{
            
            this.currentIndex ++;
            
        }
                    
    }
    
    render(ctx, x, y){
        
        if(this.debug){
            // ctx.fillStyle = "lightblue";
            // ctx.fillRect(0, 0, 100, 100);
        }        
        this.spritesheet.render(ctx, x, y, this.frames[this.currentIndex]);
        
    }
    
};