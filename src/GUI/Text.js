/*global Engine*/
/**
 * An abstract text object on the display.
 */
Engine.Text = class Text{

    constructor(x, y, contents, opts){

        this.pos = new Engine.Vector(x, y);
        this.contents = contents;
        this.color = "black";

        Object.assign(this, opts);

    }



    /**
     * Render the Text
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    render(ctx){

        ctx.fillStyle = this.color;
        ctx.fillText(this.contents, this.pos.x, this.pos.y);

    }

};