class SceneManager{

    constructor(game){

        this.game = game;
        this.currentScene = null;
        this.scenes = new Map();

        this.add = {};
        this.add.screen = (function(name, opts){

            let scene = new Scene(this.game, opts);
            this.scenes.set(name, scene);
            return scene;

        }).bind(this);

    }


    /**
     * Used to create a canvas within the game container and return the context
     * for it.
     */
    _createNewCanvas(){

        let canvas = document.createElement('canvas');
        this.game.container.appendChild(canvas);
        canvas.width = this.game.width;
        canvas.height = this.game.height;

        console.log('Width, height', this.width, this.height);

        return canvas.getContext('2d');

    }


    /**
     * Unload the current screen from memory and remove all layers(canvases) from
     * the game container.
     */
    _stop(){

        // TODO: Remove any references used in the current screen.
        // TODO: Stop playing any music associated with the current screen, etc.
        //       What are these things exactly?
        this.game.container.innerHTML = "";

    }


    /**
     * Create the layer canvases needed for the next screen.
     */
    _start(name){

        for(let layer of this.currentScene.layers){
            let ctx = this._createNewCanvas();
            layer[1].setCtx(ctx);
        }
        this.currentScene.start();

    }


    /**
     * Used to play the current screen.
     */
    screen(name){

        this._stop();
        this.currentScene = this.scenes.get(name);
        this._start();

    }

}