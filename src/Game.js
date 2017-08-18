import SceneManager from './SceneObjects/SceneManager';
import Input from './Input/Input';
import Engine from './Engine';

/**
 * Creates a Game object.
 * @constructor
 * @param {Engine} engine a reference to the Engine
 * @param {Object} [opts] any engine specific options
 * @returns {Game} returns a Game object with a reference to the Engine
 */
class Game{

    constructor(engine, opts){

        this.engine = engine;
		this.play = new SceneManager(this);
		this.add = this.play.add;


        // Create or find the container element
        this.container = undefined;
        this._createContainer(opts && opts.container);


        // Create the input object for this game
        this.input = new Input(this.container);


        // Container setup
        this.width = (opts && opts.width) || this.container.clientWidth;
        this.height = (opts && opts.height) || this.container.clientHeight;


        // Keep track of the state of the engine
        this.state = Game.STOPPED;
        this._animationRequest;
    }


    /**
     * Handles the finding or creation of the container DOM element. Essential
     * for handling input and supporting multiple layers.
     * @param {DOMelement|id} [container] Allows a user to specify where in the DOM they want the container.
     * @protected
     */
    _createContainer(container){

        // If the container is a DOM element already we should use it. Otherwise search for given
        // id. Otherwise create the container element and append it to the document body.
        // Clear the container's innerHTML either way.
        if(container){

            this.container = typeof container === 'object' ? container : document.getElementById(container);
            this.container.innerHTML = "";

        }
        else{

            this.container = document.createElement('div');
            this.container.id = 'pancakes';
            document.body.appendChild(this.container);

        }

        this.container.style.position = 'relative';
        this.container.tabIndex = 0;

    }


    /**
     * The main game loop. Has the logic for looping. TODO: improve this.
     * @param {function} update Function containing the update logic
     * @param {function} render Function containing the render logic
     */
    loop(update, render){

        const tick = (timestamp) => {

            Engine.measure.end('tick');

            if(this.state === Game.STOPPED)
                return;

            this._animationRequest = window.requestAnimationFrame(tick);

            const delta = timestamp - this.lastTimestamp;

            // console.log(delta);

            Engine.measure.begin('update');
                update(delta);
            Engine.measure.end('update');

            Engine.measure.begin('render');
                render(delta);
            Engine.measure.end('render');


            Engine.measure.log('update', 240);
            Engine.measure.log('render', 240);
            Engine.measure.log('tick', 240);

            this.lastTimestamp = timestamp;
            Engine.measure.begin('tick');
        };

        // let timestamp = performance.now();
        // const tick = () => {

        //     loops = 0;

        //     while ((new Date).getTime() > nextGameTick) {
        //         update();
        //         nextGameTick += skipTicks;
        //         loops++;
        //     }

        //     if (!loops) {
        //         render((nextGameTick - (new Date).getTime()) / skipTicks);
        //     }
        //     else {
        //         render(0);
        //     }

        //     tick();
        // };

        this.lastTimestamp = performance.now();
        Engine.measure.begin('tick');
        this._animationRequest = window.requestAnimationFrame(tick);
        this.state = Game.PLAYING;

    }



    /**
     * Stop the current game loop completely.
     */
    stop(){

        if(this._animationRequest !== undefined)
            window.cancelAnimationFrame(this._animationRequest);

        this.state = Game.STOPPED;

    }


}


Game.STOPPED = 0;
Game.PLAYING = 1;
Game.PAUSED = 2;

export default Game;