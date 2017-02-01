class Scene{

    constructor(game, opts){

        this.game = game;
        this.cache = game.engine.cache;
        this.load = game.engine.load;

        this.sprites = [];  // Reference to all the sprites in the screen
        this.layers = new Map();

        this.initCB = opts.init;
        this.updateCB = opts.update;
        this.loadCB = opts.load;
        this.loadProgressCB = opts.loadProgress;

        // Create layer factory and default layer
        this.new = new LayerFactory(this);
        this.new.layer('default');

        // Create add alias for the layer
        this.add = this.layers.get('default').add;

    }


    /**
     * Actually load the assets that are queued via the .load interface.
     */
    _performLoad(){

        if(this.loadCB) this.loadCB();

        this.game.engine.assetManager.go((completed, total) => {

            this.loadProgress(completed, total);

        }, () => {

			console.log('Finished loading');
			setTimeout(this.init.bind(this), 200);

		});

    }


    /**
     * Call the load progress callback.
     */
    loadProgress(completed, total){

        if(this.loadProgressCB) this.loadProgressCB(completed, total);

    }


    /**
     * Perform any screen level initialization. Primarily used to create
     * any user supplied sprites/objs.
     */
    init(){

        // Start listening to keyboard input by default
        this.game.input.start();

        if(this.initCB) this.initCB();

        this.game.loop(this.update.bind(this), this.render.bind(this));

    }


    /**
     * Screen level update function.
     */
    update(delta){

        for(let i = 0; i < this.sprites.length; i++){

            this.sprites[i].update(delta);

        }

        if(this.updateCB) this.updateCB(delta);

    }


    /**
     * Render each layer.
     */
    render(delta){

        for(let layer of this.layers){
            layer[1].render(delta);
        }

    }


    /**
     * Start the screen by loading and then initializing the screen.
     */
    start(){

        this._performLoad();

    }

}