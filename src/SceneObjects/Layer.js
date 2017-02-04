/*global Engine*/
class Layer{

    constructor(scene){

        this.scene = scene;
        this.depth = 0;
        this.ctx;
        this.sprites = [];
        this.groups = [];
        this.add = new ObjectFactory(this);
        this.renderCB;

    }



    /**
     * Set the context used to draw this layer.
     */
    setCtx(ctx){

        this.ctx = ctx;

    }



    /**
     * Set the render CB for this layer
     */
    setRender(cb){

        this.renderCB = cb;

    }


    /**
     * Render this layer.
     */
    render(delta){

        this.ctx.clearRect(0, 0, this.scene.game.width, this.scene.game.height);

        for(let i=0; i < this.sprites.length; i++){

            if(this.sprites[i].needsRendered){

                this.sprites[i].render(this.ctx, delta);

            }

        }

        if(this.renderCB) this.renderCB(this.ctx, delta);

    }

}