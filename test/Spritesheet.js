/*global Engine*/
Engine.Spritesheet = class Spritesheet{
    
    constructor(engine, texture, tileWidth, tileHeight, tilePadding){
        
        this.engine = engine;
        this.texture = texture;
        this.spritePositions = [];
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tilePadding = tilePadding;
        
        this.calculatePositions();
        
    }
    
    
    /**
     * Create the indexes.
     */
    calculatePositions(){
        
        let numX = Math.floor(this.texture.width / this.tileWidth);
        let numY = Math.floor(this.texture.height / this.tileHeight);

        for(let y=0; y<numY; y++){
            for(let x=0; x<numX; x++){
                
                this.spritePositions.push([x * this.tileWidth, y * this.tileHeight]);
                
            }
        }

    }
    
    
    /**
     * Create an animation from the supplied spritesheet texture
     */
    makeAnimation(min, max, animationTime, backAndForth){
        
        let indexes = Engine.C.range(min, max);
        if(backAndForth) indexes = indexes.concat(Engine.C.range(min + 1, max - 1).reverse());
        return new Engine.Animation(this.engine, this, indexes, animationTime);
        
    }
    
    
    /**
     * Render frame
     */
    render(ctx, x, y, index){
        
        ctx.fillStyle = "black";
        ctx.fillText(index.toString(), x + this.tileWidth/2, y + this.tileHeight + 10);
        let clippedPos = this.spritePositions[index];
        
        ctx.drawImage(this.texture, clippedPos[0], clippedPos[1], this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
        
    }
    
};