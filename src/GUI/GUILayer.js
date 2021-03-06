import GUIFactory from './GUIFactory';
import Geometry from '../Physics/Geometry';
import Button from './Button';
import Engine from '../Engine';

/**
 * A layer used for handling
 */
class GUILayer{

    constructor(scene, opts){

        this.opts = {
            zIndex: 0
        };

        Object.assign(this.opts, opts);     // Override default options with user options

        this._mayHaveChanged = true;        // Let's the layer know it needs to check if it needs to redraw

        this.scene = scene;                 // Reference to the parent scene
        this.ctx;
        this.buttons = [];
        this.bars = [];
        this.texts = [];
        this.add = new GUIFactory(this.scene, this, Engine.cache);
        this.preRenderCB;
        this.postRenderCB;

    }


    /**
     * Handle mousedown events on this layer
     * @param {object} pos - The position of the cursor.
     * @private
     */
    _handleMouseDown(pos){

        let i = this.buttons.length;
        while(i--){

            if(Geometry.rectContains(pos, this.buttons[i].shape)){

                this.buttons[i].reactor.dispatch('click');
                this._mayHaveChanged = true;

            }

        }

    }


    /**
     * Handle mouseup events on this layer
     * @param {object} pos - The position of the cursor.
     * @private
     */
    _handleMouseUp(pos){

        let i = this.buttons.length;
        while(i--){

            if(Geometry.rectContains(pos, this.buttons[i].shape)){

                this.buttons[i].reactor.dispatch('release');
                this._mayHaveChanged = true;

            }

        }

    }


    /**
     * Handle mousemove events on this layer
     * @param {object} pos - The position of the cursor.
     * @private
     */
    _handleMouseMove(pos){

        let i = this.buttons.length;
        while(i--){

            if(Geometry.rectContains(pos, this.buttons[i].shape)){

                this.buttons[i].reactor.dispatch('hover');
                this._mayHaveChanged = true;

            }
            else if(this.buttons[i].state === Button.HOVER || this.buttons[i].state === Button.ACTIVE){

                this.buttons[i].reactor.dispatch('out');
                this._mayHaveChanged = true;

            }

        }

    }




    /**
     * Boot the layer.
     */
    boot(){

        if(this.opts.zIndex)
            this.ctx.canvas.style.zIndex = this.opts.zIndex;


        // Initialize mouse input handlers
        this.scene.game.input.on('mousemove', this._handleMouseMove.bind(this));
        this.scene.game.input.on('mousedown', this._handleMouseDown.bind(this));
        this.scene.game.input.on('mouseup', this._handleMouseUp.bind(this));

    }



    /**
     * Intialize the layer.
     */
    init(){


        for(let button of this.buttons){

            button._calculateSize(this.ctx);

        }


        for(let t of this.texts){

            t._calculateSize(this.ctx);

        }

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
     * Render this layer. GUILayers are very exact about the areas they render.
     * Only changes are cleared and rendered again.
     * @param {integer} delta the amount of time since last update
     */
    render(delta){

        if(this._mayHaveChanged){

            // Render buttons
            let i = this.buttons.length;
            while(i--){

                if(this.buttons[i]._hasChanged){
                    this.buttons[i].clear(this.ctx);
                    this.buttons[i].render(this.ctx);
                }

            }


            // Render progress bars
            i = this.bars.length;
            while(i--){

                this.bars[i].render(this.ctx);

            }


            // Render text updates
            i = this.texts.length;
            while(i--){

                this.texts[i].render(this.ctx);

            }

            this._mayHaveChanged = false;
        }

    }



    /**
     * Destroy the current layer.
     */
    destroy(){

        this.buttons = [];
        this.bars = [];
        this.texts = [];
        this._mayHaveChanged = true;

    }

}

/**
 * Function that gets called either before or after the layer has rendered
 * @callback Layer~renderCallback
 * @param {CanvasRenderingContext2D} ctx - rendering context for this layer
 * @param {integer} delta - the amount of time since the last render
 */


export default GUILayer;