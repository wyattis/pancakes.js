/*global Engine*/
Engine.ProgressBar = class ProgressBar{

    constructor(x, y, opts){

        this.pos = new Engine.Vector(x, y);

        this.max = 1;               // The max value of the progress bar
        this.width = 100;           // The width of the progress bar
        this.height = 30;           // The height of the progress bar
        this.value = undefined;     // The current value of the progress bar
        this.ref = undefined;       // Reference to the object holding the progress value. Allows you to attach the progress bar directly to the character.
        this.refKey = undefined;    // Which property on the referenced object should we watch?
        this.color = "red";         // Color of the progress bar
        this.borderColor = "black"; // Color of the border on the progress bar
        this.borderWidth = 4;       // Size of the border on the progress bar
        this.spectrum = undefined;  // TODO: Are we going to use a color spectrum to define this progress bar?

        // Apply options
        Object.assign(this, opts);

    }


    /**
     * Render the progress bar on the given context.
     * @param {CanvasRenderContext2D} ctx
     * @private
     */
    render(ctx){

        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);

    }

};