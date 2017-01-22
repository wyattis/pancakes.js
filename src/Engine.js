// class Engine{

// 	constructor(opts){

// 		this.renderCB = opts.render;

// 		this.cache = new Cache();
// 		this.assetManager = new AssetManager(this.cache);


// 		this.load = (cacheKey, url) => {

// 			this.assetManager.addToQue(cacheKey, url);

// 		};

// 		this.ticker = new Ticker();
		
// 	}


// 	performLoad(){

// 		// Queue all of the items to load
// 		this.loadCB();

// 		// Actually load the items. Run init when they are all
// 		// loaded.
// 		this.assetManager.go(() => {

// 			if(this.loadProgressCB) this.loadProgressCB();

// 		}, () => {

// 			console.log('Finished loading');
// 			this.init();

// 		});

// 	}

// 	init(){

// 		if(this.initCB) this.initCB();

// 		this.ticker.add(this, this.update, 1000 / 61);
// 		this.ticker.add(this, this.render, 1000/30);

// 		this.ticker.start();
// 	}

// 	static game(){
		
// 		return new Game();
		
// 	}
// }

let Engine = {
	
	load: (cacheKey, url) => {

		Engine.assetManager.addToQue(cacheKey, url);

	},
	
	game: () => {
		
		// debugger;
		Engine.cache = Engine.cache || new StockPile();
		Engine.assetManager = Engine.assetManager || new AssetManager(Engine.cache);
		return new Game(Engine);
		
	},
	
	RECTANGLE: 0,
	CIRCLE: 1
	
};

Engine.FPS = 0;