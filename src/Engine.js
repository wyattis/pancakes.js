let Engine = {

	load: (cacheKey, url) => {

		Engine.assetManager.addToQue(cacheKey, url);

	},

	game: (opts) => {

		Engine.cache = Engine.cache || new StockPile();
		Engine.assetManager = Engine.assetManager || new AssetManager(Engine.cache);
		return new Game(Engine, opts);

	},

	RECTANGLE: 0,
	CIRCLE: 1

};

Engine.FPS = 0;