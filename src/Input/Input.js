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

        let key = this.keyboard.keys[Engine.Keyboard.keyCodes[event.keyCode]];
        if(key.isDown)
            key.isHeld = true;

        key.isDown = true;
        key.isUp = false;

        event.preventDefault();

    }



    /**
     * Private handler of keyup events.
     */
    _handleKeyUp(event){

        let key = this.keyboard.keys[Engine.Keyboard.keyCodes[event.keyCode]];
        key.isHeld = false;
        key.isDown = false;
        key.isUp = true;

        event.preventDefault();

    }



    /**
     * Start listening to keydown and keyup events.
     */
    start(){

        this.keyboard = new Engine.Keyboard();
        console.log('keyboard defined', this.keyboard);
        this.element.addEventListener('keydown', this._handleKeyDown.bind(this));
        this.element.addEventListener('keyup', this._handleKeyUp.bind(this));

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