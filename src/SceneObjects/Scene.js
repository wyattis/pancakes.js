/*global Engine*/
/**
 * Describes a Scene. Currently only supports programmed games but will support videos and scripted scenes as well.
 * @constructor
 * @param {Engine.Game} game reference to the parent game
 * @param {object} opts any scene specific options
 * @returns {Engine.Scene} instance
 */
Engine.Scene = class Scene{

    constructor(game, opts){

        this.game = game;
        this.cache = game.engine.cache;
        this.load = game.engine.load;


        this.opts = {
            useKeyboard: true,
            useMouse: true,
            size: {
                width: 600,
                height: 400,
            }
        };
        Object.assign(this.opts, opts);

        this.animations = [];       // Reference to all of the animations that live within this scene
        this.layers = new Map();    // Reference to all of the layers within this scene

        this.initCB = opts.init;
        this.updateCB = opts.update;
        this.loadCB = opts.load;
        this.loadProgressCB = opts.loadProgress;

        // Create layer factory and default layer
        this.new = new Engine.LayerFactory(this);
        this.new.layer('default', {zIndex: 1000});

        // Create the world for this scene
        this.world = new Engine.World(this, this.opts.size.width, this.opts.size.height);

        // Create object factor instance for API convenience
        this.add = new Engine.ObjectFactory(this.scene, this.world, this.layers.get('default'), Engine.cache);

        // Camera for the scene
        this.camera = new Engine.Camera(this.world, 0, 0, this.game.width, this.game.height);

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

        // Do any layer specific setup
        for(let layer of this.layers){
            layer[1].init();
        }

        if(this.initCB) this.initCB();

        this.game.loop(this.update.bind(this), this.render.bind(this));

    }


    /**
     * Screen level update function.
     */
    update(delta){

        // Perform user supplied updates first
        if(this.updateCB) this.updateCB(delta);


        // This call updates each sprite in the world and performs any physics
        // that are necessary.
        this.world.update(delta);

        // Always update the camera last
        this.camera.update(delta);
    }


    /**
     * Render each layer.
     */
    render(delta){

        for(let layer of this.layers){

            layer[1].render(delta, -this.camera.pos.x, -this.camera.pos.y);

        }

    }


    /**
     * Start the screen by loading and then initializing the screen.
     */
    start(){

        this._performLoad();

    }

};