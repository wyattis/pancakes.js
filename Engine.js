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

		if(this.updateCB) this.initCB();

	}

	update(){

		if(this.updateCB) this.updateCB();

	}

	render(){

		if(this.renderCB) this.renderCB();

	}

	start(){

		this.performLoad();

	}

}