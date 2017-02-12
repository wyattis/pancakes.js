/*global Engine*/
/**
 * Describes a single sprite based animation
 * @constructor
 * @param {Engine.Sprite|Object} parent the parent object that the animation has been assigned to. Usually an instance of Engine.Sprite.
 * @param {Engine.Spritesheet} spritesheet reference to the spritesheet used by this animation
 * @returns {Engine.Animation} instance
 */
Engine.Animation = class Animation {

    constructor(parent, spritesheet, frames, animationTime, options) {

        this.reactor = new Engine.Reactor();
        this.parent = parent;
        this.currentIndex = 0;
        this.frames = frames;
        this.spritesheet = spritesheet;
        this.timeSinceLastFrameChange = 0;
        this.width = spritesheet.tileWidth;
        this.height = spritesheet.tileHeight;

        this.options = {
            debug: false,
            infinite: true,
        };

        Object.assign(this.options, options);



        if(options){
            if(options.backAndForth){
                this.frames = frames.concat(frames.slice(1, frames.length - 1).reverse());
            }
        }

        this.frameTime = animationTime / this.frames.length;


        // Register the events that can be emitted by an Animation
        this.reactor.register('complete');
        this.reactor.register('start');
        this.reactor.register('repeat');

        this.on = this.reactor.on.bind(this.reactor);
    }


    /**
     * Update the animation. Switch frames if enough time has passed since the last
     * change of the frame.
     * @param {integer} delta - milliseconds since the last update
     */
    update(delta) {

        this.timeSinceLastFrameChange += delta;

        // console.log(this.frameTime, this.currentIndex + '/' + this.frames.length, this.timeSinceLastFrameChange, delta);
        if (this.timeSinceLastFrameChange >= this.frameTime) {

            // Dispatch the animation start event
            if(this.currentIndex === 0)
                this.reactor.dispatch('start');

            // if we are on the last frame then set it to the first frame
            if (this.currentIndex === this.frames.length - 1) {

                if(this.options.infinite){

                    // Dispathc the animation repeat event
                    this.reactor.dispatch('repeat');

                    this.currentIndex = 0;

                }
                else{

                    this.reactor.dispatch('complete');

                }

            }
            else{

                this.currentIndex ++;

            }

            // The frame has changed so we need to que this for another render
            // debugger;
            this.parent.queForRender();

            this.timeSinceLastFrameChange = this.timeSinceLastFrameChange % this.frameTime;

        }

    }


    /**
     * Resets the animation to the specified index. Resets to the beginning if no index is supplied.
     * @param {Integer} [index=0] - The frame index to return the animation to. Will return to the beginning if index isn't included.
     */
    reset(index){

        this.currentIndex = index || 0;

    }


    /**
     * Called to render the animation
     * @param {CanvasRenderingContext2D} ctx - the canvas rendering context
     * @param {float} x - the x position to render the animation
     * @param {float} y - the y position to render the animation
     */
    render(ctx, x, y){

        this.spritesheet.render(ctx, x, y, this.frames[this.currentIndex], this.options.debug);

    }

};