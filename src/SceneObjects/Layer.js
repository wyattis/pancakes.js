/*global Engine*/
/**
 * Abstraction of a render layer. Each layer has its own canvas that is layered on top of the other canvases.
 * @constructor
 * @param {Engine.Scene} scene - Reference to the parent Engine.Scene
 * @param {Object} opts - Options used when creating this Layer
 * @param {integer} [opts.depth=1] - Specifies how much the layer should translate with the camera. Higher depth give the effect of the layer being further away. A depth of 0 indicates the layer should not translate at all. A depth of 1 makes the layer translate an equal amount.
 * @param {boolean} [opts.animated=true] - Indicates if there are any animated or moving sprites in the layer. If this is set to false then the layer will only rerender when changes are made.
 * @param {Integer} [opts.zIndex=0] - Indicate where this layer should render in the z plane.
 */
Engine.Layer = class Layer{

    constructor(scene, opts){

        this.opts = {
            animated: true,
            depth: 1,
            zIndex: 0
        };

        Object.assign(this.opts, opts);     // Override default options with user options

        this.scene = scene;                 // Reference to the parent scene
        this.ctx;
        this.sprites = [];
        this.groups = [];
        this.add = new Engine.ObjectFactory(this.scene, this.scene.world, this, Engine.cache);
        this.tilesheet = new Engine.TilesheetLoader(this.add, this.scene.cache);
        this.preRenderCB;
        this.postRenderCB;

        this._translate = {x: -10000, y: -10000};       // Holds the current translate
        this._previousTranslate = {x: -1000, y: -1000}; // Holds the previous translate

    }


    /**
     * Boot the layer.
     */
    boot(){

        if(this.opts.zIndex)
            this.ctx.canvas.style.zIndex = this.opts.zIndex;

    }



    /**
     * Initialize the layer
     */
    init(){

        // Does anything need to happen here?

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

        this._translate.x = Math.round(translateX / this.opts.depth);
        this._translate.y = Math.round(translateY / this.opts.depth);

        if(this.opts.animated){

            // Render all the time
            this._redraw(delta);

        }
        else if(this._translate.x !== this._previousTranslate.x || this._translate.y !== this._previousTranslate.y){

            // We need to only render changes when they happen
            this._redraw(delta);
            this._previousTranslate.x = this._translate.x;
            this._previousTranslate.y = this._translate.y;

        }

    }



    /**
     * Actually redraw the canvas. Including the preRender and postRender callbacks
     */
    _redraw(delta){

        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.scene.game.width, this.scene.game.height);
        this.ctx.save();

        // Translate the context if depth is greater than 0
        if(this.opts.depth)
            this.ctx.translate(this._translate.x, this._translate.y);


        // Call the preRender callback if we have one
        if(this.preRenderCB)
            this.preRenderCB(this.ctx, delta);


        // Render all of the sprites in this layer
        let i = this.sprites.length;
        while(i--){

            // TODO: check if the sprite is within the bounds of the camera
            this.sprites[i].render(this.ctx, delta);

        }


        // Call the postRender callback if we have one
        if(this.postRenderCB)
            this.postRenderCB(this.ctx, delta);


        // Restore the canvas context
        this.ctx.restore();

    }


    /**
     * Set the apparent depth of the layer
     * @param {Integer} depth - How far back the layer should be
     */
    setDepth(depth){
        this.opts.depth = depth;
    }



    /**
     * Destroy the layer.
     * @private
     */
    destroy(){

        this.sprites = [];
        this.groups = [];
        this.ctx = null;
        this._translate = {x: -10000, y: -10000};
        this._previousTranslate = {x: -1000, y: -1000};

    }

};

/**
 * Function that gets called either before or after the layer has rendered
 * @callback Layer~renderCallback
 * @param {CanvasRenderingContext2D} ctx - rendering context for this layer
 * @param {integer} delta - the amount of time since the last render
 */