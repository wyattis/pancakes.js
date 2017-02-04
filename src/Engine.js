let Engine = {

	load: (cacheKey, url) => {

		Engine.assetManager.addToQue(cacheKey, url);

	},

	game: (opts) => {

		Engine.cache = Engine.cache || new Engine.StockPile();
		Engine.assetManager = Engine.assetManager || new Engine.AssetManager(Engine.cache);
		return new Engine.Game(Engine, opts);

	},

	RECTANGLE: 0,
	CIRCLE: 1

};

Engine.FPS = 0;