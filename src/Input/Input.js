/*global Engine*/
/**
 * Describes a object that handles keyboard, mouse and touch input for each scene.
 * @constructor
 * @param {DOMElement} element the DOM node to attach input events to
 * @returns {Engine.Input} instance
 */
Engine.Input = class Input{

    constructor(element){

        // TODO: handle event callbacks for individual keycodes

        this.element = element;     // The element to attach events to
        this.keyboard = undefined;  // Holds keyboard specific logic
        this.reactor = new Engine.Reactor(); // Used to dispatch custom events

        this.isListening = {
            keyboard: {
                down: false,
                up: false
            }
        };

    }


    /**
     * "on()" method to handle callbacks for the different types of events
     */
    on(eventName, cb, opts){

        this.reactor.addEventListener(eventName, cb, opts);

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
    startKeyboard(){

        this.keyboard = new Engine.Keyboard();
        console.log('keyboard defined', this.keyboard);
        this.element.addEventListener('keydown', this._handleKeyDown.bind(this));
        this.element.addEventListener('keyup', this._handleKeyUp.bind(this));

        this.isListening.keyboard.down = true;
        this.isListening.keyboard.up = true;

    }



    /**
     * Stop listening to keydown and keyup events.
     */
    stopKeyboard(){

        this.element.removeEventListener('keydown', this._handleKeyDown);
        this.element.removeEventListener('keyup', this._handleKeyUp);

        this.isListening.keyboard.down = false;
        this.isListening.keyboard.up = false;

    }



    /**
     * Handle mouse down
     */
    _handleMouseDown(event){

        const pos = this.getMousePosition(event);
        this.reactor.dispatch('mousedown', pos);

    }


    /**
     *
     * Handle mouse down
     */
    _handleMouseUp(event){

        const pos = this.getMousePosition(event);
        this.reactor.dispatch('mouseup', pos);

    }



    /**
     * Handle mouse down
     */
    _handleMouseMove(event){

        const pos = this.getMousePosition(event);
        this.reactor.dispatch('mousemove', pos);

    }


    /**
     * Start listening to mouse events
     */
    startMouse(){

        this.reactor.register('mousemove');
        this.reactor.register('mousedown');
        this.reactor.register('mouseup');

        this.element.addEventListener('mousemove', this._handleMouseMove.bind(this));
        this.element.addEventListener('mousedown', this._handleMouseDown.bind(this));
        this.element.addEventListener('mouseup', this._handleMouseUp.bind(this));

    }


    /**
     * Stop listening to mouse events
     */
    stopMouse(){

        this.reactor.unregister('mousemove');
        this.reactor.unregister('mousedown');
        this.reactor.unregister('mouseup');

        this.element.removeEventListener('mousemove', this._handleMouseMove.bing(this));
        this.element.removeEventListener('mousedown', this._handleMouseDown.bind(this));
        this.element.removeEventListener('mouseup', this._handleMouseUp.bind(this));

    }


    /**
     * Convert the mouse event coordinates into a valid mouse position
     */
    getMousePosition(event){

        // TODO



    }

};