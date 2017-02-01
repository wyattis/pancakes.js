/*global Engine*/
class Input{

    constructor(element){

        // TODO: handle event callbacks for individual keycodes

        this.element = element;
        this.keyboard = undefined;
        this.isListening = {down: false, up: false};

    }



    /**
     * Private handler of keydown events.
     */
    _handleKeyDown(event){

        if(this.keyboard.keys[event.keyCode].isDown)
            this.keyboard.keys[event.keyCode].isHeld = true;

        this.keyboard.keys[event.keyCode].isDown = true;
        this.keyboard.keys[event.keyCode].isUp = false;

    }



    /**
     * Private handler of keyup events.
     */
    _handleKeyUp(event){

        this.keyboard.keys[event.keyCode].isHeld = false;
        this.keyboard.keys[event.keyCode].isDown = false;
        this.keyboard.keys[event.keyCode].isUp = true;

    }



    /**
     * Start listening to keydown and keyup events.
     */
    start(){

        this.element.addEventListener('keydown', this._handleKeyDown);
        this.element.addEventListener('keyup', this._handleKeyUp);

        this.isListening.down = true;
        this.isListening.up = true;

    }


    /**
     * Stop listening to keydown and keyup events.
     */
    stop(){

        this.element.removeEventListener('keydown', this._handleKeyDown);
        this.element.removeEventListener('keyup', this._handleKeyUp);

        this.isListening.down = false;
        this.isListening.up = false;

    }


    /**
     * Convert the mouse event coordinates into a valid mouse position
     */
    static getMousePosition(event, element){

        // TODO

    }
}