class Screen{

    constructor(game, opts){

        this.game = game;
        this.cache = game.engine.cache;
        this.load = game.engine.load;
        this.ticker = game.ticker;

        this.sprites = [];      // Store local copies of all sprites in the screen

        this.initCB = opts.init;
        this.updateCB = opts.update;
        this.renderCB = opts.render;
        this.loadCB = opts.load;
        this.loadProgressCB = opts.loadProgress;

        // this.add = new LayerFactory(this);
        this.add = new ObjectFactory(this);


        this._createContainer(opts.container);
        this._createCanvas();
        this.width = opts.width || this.container.clientWidth;
        this.height = opts.height || this.container.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        console.log('Width, height', this.width, this.height);
    }


    _createContainer(container){

        if(container){

            this.container = typeof container === 'object' ? container : document.getElementById(container);
            this.container.innerHTML = "";

        }
        else{

            this.container = document.createElement('div');
            this.container.id = 'pancakes';
            document.body.appendChild(this.container);

        }

    }

    _createCanvas(container){

        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

    }

    _performLoad(){

        if(this.loadCB) this.loadCB();


        this.game.engine.assetManager.go(() => {

            this.loadProgress();

        }, () => {

			console.log('Finished loading');
			setTimeout(this.init.bind(this), 200);

		});

    }

    loadProgress(){

        if(this.loadProgressCB) this.loadProgressCB();

    }

    init(){

        if(this.initCB) this.initCB();

        this.game.loop(this.update.bind(this), this.render.bind(this));

    }

    update(delta){

        // console.log('Screen update', delta);
        for(let i = 0; i < this.sprites.length; i++){

            this.sprites[i].update(delta);

        }

        if(this.updateCB) this.updateCB(delta);

    }

    render(delta){

        // this.ctx.clearRect(0, 0, this.width, this.height);

        for(let i=0; i < this.sprites.length; i++){

            if(this.sprites[i].needsRendered){

                // console.log(s.last.pos.x, s.last.pos.y, s.currentAnimation.width, s.currentAnimation.height);
                this.ctx.clearRect(this.sprites[i].last.pos.x, this.sprites[i].last.pos.y, this.sprites[i].currentAnimation.width, this.sprites[i].currentAnimation.height);
                this.sprites[i].render(this.ctx, delta);

            }

        }
        // console.log('Screen render', delta);
        if(this.renderCB) this.renderCB(this.ctx, delta);

    }

    start(){

        this._performLoad();

    }

}