/*
 * Base object for pancakes.js
 */
let Engine = {


	/**
	 * @name load
	 * @param {string} cacheKey The string key that will be used to store the asset in the cache.
	 * @param {string} url The url that hosts the asset
	 * @returns undefined
	 */
	load: (cacheKey, url) => {

		Engine.assetManager.addToQue(cacheKey, url);

	},


	/**
	 * @name game Factory function to return a new instance of a Game
	 * @param {{}} opts Any options that should be passed to the
	 * @returns Engine.Game
	 */
	game: (opts) => {

		Engine.cache = Engine.cache || new Engine.StockPile();
		Engine.assetManager = Engine.assetManager || new Engine.AssetManager(Engine.cache);
		return new Engine.Game(Engine, opts);

	},

	RECTANGLE: 0,
	CIRCLE: 1

};

Engine.FPS = 0;