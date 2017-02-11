/*global Engine*/
/**
 * Abstraction of a render layer. Each layer has its own canvas that is layered on top of the other canvases.
 * @constructor
 * @param {Engine.Scene} scene - Reference to the parent Engine.Scene
 * @param {Object} opts - Options used when creating this Layer
 * @param {integer} [opts.depth=1] - Specifies how much the layer should translate with the camera. Higher depth give the effect of the layer being further away. A depth of 0 indicates the layer should not translate at all. A depth of 1 makes the layer translate an equal amount.
 * @param {boolean} [opts.dynamic=true] - Indicates if the layer should always try to render at 60fps. Setting this to false and making use of multiple layers for primarily static scenes can potentially greatly improve game performance and reduce CPU usage.
 * @param {Integer} [opts.zIndex=0] - Indicate where this layer should render in the z plane.
 */
Engine.Layer = class Layer{

    constructor(scene, opts){

        this.opts = {
            dynamic: true,
            depth: 1,
            zIndex: 0,
        };

        Object.assign(this.opts, opts);     // Override default options with user options

        this.scene = scene;
        this.ctx;
        this.sprites = [];
        this.groups = [];
        this.add = new Engine.ObjectFactory(this.scene, this.scene.world, this, Engine.cache);
        this.preRenderCB;
        this.postRenderCB;

    }


    /**
     * Initialize the layer.
     */
    init(){

        if(this.opts.zIndex)
            this.ctx.canvas.style.zIndex = this.opts.zIndex;

    }



    /**
     * Set the context used to draw this layer.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    setCtx(ctx){

        this.ctx = ctx;

    }



    /**
     * Set the post render CB for this layer
     * @param {Layer~renderCallback} callback - function to be called after the layer has rendered
     */
    setRender(callback){

        this.postRenderCB = callback;

    }


    /**
     * Set the pre render CB for this layer
     * @param {Layer~renderCallback} callback - function to be called before the layer has rendered
     */
    setPreRender(callback){

        this.preRenderCB = callback;

    }

    /**
     * Render this layer.
     * @param {integer} delta the amount of time since last update
     * @param {float} translateX - how much the camera has translated in the x direction
     * @param {float} translateY - how much the camera has translated in the y direction
     */
    render(delta, translateX, translateY){

        // TODO: dynamically handle different transforms?

        this.ctx.clearRect(0, 0, this.scene.game.width, this.scene.game.height);

        this.ctx.save();
        if(this.opts.depth)
            this.ctx.translate(translateX / this.opts.depth, translateY / this.opts.depth);

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



    /**
     * Set the apparent depth of the layer
     * @param {Integer} depth - How far back the layer should be
     */
    setDepth(depth){
        this.opts.depth = depth;
    }

};

/**
 * Function that gets called either before or after the layer has rendered
 * @callback Layer~renderCallback
 * @param {CanvasRenderingContext2D} ctx - rendering context for this layer
 * @param {integer} delta - the amount of time since the last render
 */