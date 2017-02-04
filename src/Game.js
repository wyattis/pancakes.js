/*global Engine*/
Engine.Game = class Game{

    constructor(engine, opts){

        this.engine = engine;
		this.play = new Engine.SceneManager(this);
		this.add = this.play.add;


        // Create or find the container element
        this.container = undefined;
        this._createContainer(opts && opts.container);


        // Create the input object for this game
        this.input = new Engine.Input(this.container);


        // Container setup
        this.width = (opts && opts.width) || this.container.clientWidth;
        this.height = (opts && opts.height) || this.container.clientHeight;
    }


    /**
     * Handles the finding or creation of the container DOM element. Essential
     * for handling input and supporting multiple layers.
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
     * The main game loop
     */
    loop(update, render){

        const tick = (timestamp) => {

            requestAnimationFrame(tick);

            const delta = timestamp - this.lastTimestamp;

            update(delta);
            render(delta);

            this.lastTimestamp = timestamp;
        };

        this.lastTimestamp = performance.now();
        requestAnimationFrame(tick);

    }

};