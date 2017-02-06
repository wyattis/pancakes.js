/*global Engine*/
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

        this.on = this.reactor.on;
    }


    /**
     * Update the animation. Switch frames if enough time has passed since the last
     * change of the frame.
     */
    update(delta) {

        // Dispatch the animation start event
        this.reactor.dispatch('start');

        this.timeSinceLastFrameChange += delta;

        // console.log(this.frameTime, this.currentIndex + '/' + this.frames.length, this.timeSinceLastFrameChange, delta);
        if (this.timeSinceLastFrameChange >= this.frameTime) {

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

    reset(index){

        this.currentIndex = 0;

    }

    render(ctx, x, y){

        this.spritesheet.render(ctx, x, y, this.frames[this.currentIndex], this.options.debug);

    }

};