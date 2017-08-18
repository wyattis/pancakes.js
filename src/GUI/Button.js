import Vector from '../Core/Vector';
import Rectangle from '../Physics/Rectangle';
import Reactor from '../Core/Reactor';

/**
 * Create a Button on the current layer.
 */
class Button{

    constructor(x, y, content, opts){

        this.pos = new Vector(x, y);
        this.content = content;
        this.state = Button.DEFAULT;
        this.shape = new Rectangle(x, y, 100, 50);

        this.opts = {
            textStyle: "black",
            font: '48px serif',
            padding: {
                left: 10, right: 10, top: 10, bottom: 10
            },
        };

        Object.assign(this.opts, opts);

        this.reactor = new Reactor();

        this.reactor.register('hover');
        this.reactor.register('out');
        this.reactor.register('click');
        this.reactor.register('release');

        // Change the state of the button depending on the events fired
        this.reactor.on('hover', () => {
            this.state = Button.HOVER;
            this._hasChanged = true;
        });
        this.reactor.on('out', () => {
            this.state = Button.DEFAULT;
            this._hasChanged = true;
        });
        this.reactor.on('click', () => {
            this.state = Button.ACTIVE;
            this._hasChanged = true;
        });
        this.reactor.on('release', () => {
            this.state = Button.HOVER;
            this._hasChanged = true;
        });

        // Create alias for the event handler
        this.on = this.reactor.on.bind(this.reactor);

        this._hasChanged = true;        // Make sure we render right away

    }


    /**
     * Calculate the width of the given text.
     * @private
     */
    _calculateSize(ctx){

        ctx.font = this.opts.font;
        let measurement = ctx.measureText(this.content);
        let height = 48;
        this.setPos(this.pos.x - this.opts.padding.left, this.pos.y - this.opts.padding.top);
        this.shape.setSize(measurement.width + this.opts.padding.left + this.opts.padding.right, height + this.opts.padding.top + this.opts.padding.bottom);

    }


    /**
     * Render the current state of the button
     * @param {CanvasRenderingContext2D} ctx - Reference to the layer rendering context.
     * @private
     */
    render(ctx){

        ctx.font = this.opts.font;
        ctx.textBaseline = "hanging";

        if(this.state === Button.DEFAULT){
            ctx.fillStyle = 'green';
            ctx.fillRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);

            ctx.fillStyle = this.opts.textStyle;
            ctx.fillText(this.content, this.shape.x + this.opts.padding.left, this.shape.y + this.opts.padding.top);
            this._hasChanged = false;
        }
        else{

            ctx.fillStyle = 'lightblue';
            ctx.fillRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);

            ctx.fillStyle = this.opts.textStyle;
            ctx.fillText(this.content, this.shape.x + this.opts.padding.left, this.shape.y + this.opts.padding.top);
            this._hasChanged = false;

        }

    }


    /**
     * Clear the button on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Reference to the layer rendering context.
     * @private
     */
    clear(ctx){

        // TODO: Handle circles as well
        ctx.clearRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);

    }



    /**
     * Set the position of the button.
     * @param {float} x - X position of the button
     * @param {float} y - Y position of the button
     */
    setPos(x, y){

        this.pos.x = x;
        this.pos.y = y;
        this.shape.setPos(x, y);

    }

}


Button.DEFAULT = 0;
Button.HOVER = 1;
Button.ACTIVE = 2;

export default Button;