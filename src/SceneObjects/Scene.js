/*global Engine*/
Engine.Scene = class Scene{

    constructor(game, opts){

        this.game = game;
        this.cache = game.engine.cache;
        this.load = game.engine.load;


        this.opts = {
            useKeyboard: true,
            useMouse: true,
        };
        Object.apply(this.opts, opts);


        this.sprites = [];  // Reference to all the sprites in the screen
        this.layers = new Map();

        this.initCB = opts.init;
        this.updateCB = opts.update;
        this.loadCB = opts.load;
        this.loadProgressCB = opts.loadProgress;

        // Create layer factory and default layer
        this.new = new Engine.LayerFactory(this, this.opts);
        this.new.layer('default');


        this.world = new Engine.World(this, game.width, game.height);

        this.add = new Engine.ObjectFactory(this.world, this.layers.get('default'), Engine.cache);

        // Create the camera for the scene
        this.camera = new Engine.Camera(this);

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
        if(this.opts.useKeyboard)
            this.game.input.startKeyboard();

        if(this.opts.useMouse)
            this.game.input.startMouse();

        if(this.initCB) this.initCB();

        this.game.loop(this.update.bind(this), this.render.bind(this));

    }


    /**
     * Screen level update function.
     */
    update(delta){

        // Perform user supplied updates first
        if(this.updateCB) this.updateCB(delta);

        this.world.update(delta);

    }


    /**
     * Render each layer.
     */
    render(delta){

        for(let layer of this.layers){

            console.log(this.world.camera.pos);
            layer[1].ctx.save();
            layer[1].ctx.translate(-this.world.camera.pos.x,-this.world.camera.pos.y);
            layer[1].render(delta);

            layer[1].ctx.restore();
        }

    }


    /**
     * Start the screen by loading and then initializing the screen.
     */
    start(){

        this._performLoad();

    }

};