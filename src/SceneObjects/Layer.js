/*global Engine*/
Engine.Layer = class Layer{

    constructor(scene, opts){

        this.opts = {
            dynamic: true   // True if the layer should try rendering at 60fps all the time
        };

        Object.assign(this.opts, opts);     // Override default options with user options

        this.scene = scene;
        this.depth = 0;
        this.ctx;
        this.sprites = [];
        this.groups = [];
        this.add = new Engine.ObjectFactory(this.scene.world, Engine.cache);
        this.preRenderCB;
        this.postRenderCB;

    }



    /**
     * Set the context used to draw this layer.
     */
    setCtx(ctx){

        this.ctx = ctx;

    }



    /**
     * Set the post render CB for this layer
     */
    setRender(cb){

        this.postRenderCB = cb;

    }


    /**
     * Set the pre render CB for this layer
     */
    setPreRender(cb){

        this.preRenderCB = cb;

    }

    /**
     * Render this layer.
     */
    render(delta, translateX, translateY){

        // TODO: dynamically handle different transforms?

        this.ctx.clearRect(0, 0, this.scene.game.width, this.scene.game.height);

        this.ctx.save();
        this.ctx.translate(translateX, translateY);

        if(this.preRenderCB)
            this.preRenderCB(this.ctx, delta);

        if(this.opts.dynamic){
            // Always try to render the entire layer at 60fps

            // this.ctx.clearRect(0, 0, this.scene.game.width, this.scene.game.height);
            let i = this.sprites.length;
            while(i--){

                this.sprites[i].render(this.ctx, delta);

            }

        }
        else{

            let i = this.sprites.length;
            // TODO: clear the bounding box before rendering
            while(i--){

                if(this.sprites[i].needsRendered)
                    this.sprites[i].render(this.ctx, delta);

            }

        }


        if(this.postRenderCB)
            this.postRenderCB(this.ctx, delta);

        this.ctx.restore();
    }

};