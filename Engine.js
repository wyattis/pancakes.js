class Engine{

	constructor(opts){

		this.loadCB = opts.load;
		this.loadProgress = opts.loadProgress;
		this.initCB = opts.init;
		this.updateCB = opts.update;
		this.renderCB = opts.render;

		this.cache = new Cache();
		this.assetManager = new AssetManager(this.cache);


		this.load = (cacheKey, url) => {

			this.assetManager.addToQue(cacheKey, url);

		};

		this.add = new ObjectFactory(this);

		this.ticker = new Ticker();
	}


	performLoad(){

		// Queue all of the items to load
		this.loadCB();

		// Actually load the items. Run init when they are all
		// loaded.
		this.assetManager.go(() => {

			if(this.loadProgressCB) this.loadProgressCB();

		}, () => {

			console.log('Finished loading');
			this.init();

		});

	}

	init(){

		if(this.initCB) this.initCB();

		this.ticker.add(this, this.update, 1000 / 61);
		this.ticker.add(this, this.render, 1000/30);

		this.ticker.start();
	}

	update(delta){

		if(this.updateCB) this.updateCB(delta);

	}

	render(delta){

		if(this.renderCB) this.renderCB(delta);

	}

	start(){

		this.performLoad();

	}

}