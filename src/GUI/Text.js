/*global Engine*/
/**
 * An abstract text object on the display.
 */
Engine.Text = class Text{

    constructor(x, y, content, opts){

        this.pos = new Engine.Vector(x, y);
        this.content = content;

        this.opts = {
            style: "black",         // Style of the font
            size: 48,               // Size must be in pixels
            type: "serif",          // The font type to use
        };

        Object.assign(this.opts, opts);


        this.font = this.opts.size + 'px ' + this.opts.type;
    }


    /**
     * Calculate the width of the text.
     */
    _calculateSize(ctx){

        ctx.font = this.font;
        let measurement = ctx.measureText(this.content);

        this.width = measurement.width;
        this.height = this.opts.size;

    }



    /**
     * Render the Text
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    render(ctx){

        // ctx.fillStyle = 'red';
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);

        ctx.font = this.font;
        ctx.fillStyle = this.opts.style;
        ctx.fillText(this.content, this.pos.x, this.pos.y);

    }

};