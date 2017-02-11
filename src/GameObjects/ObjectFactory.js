/*global Engine*/
/**
 * Describes a factory for adding sprites and resources to a scene and world
 * @constructor
 * @param {Engine.Scene} scene reference to the parent scene
 * @param {Engine.World} world reference to the parent world
 * @param {Engine.Layer} layer reference to the parent layer
 * @param {Engine.StockPile} cache reference to the cache being used by this game
 * @returns Engine.ObjectFactory
 */
Engine.ObjectFactory = class ObjectFactory{

	constructor(scene, world, layer, cache){

		this.scene = scene;
		this.world = world;
		this.layer = layer;
		this.cache = cache;

	}


	sprite(x, y){

		let sprite = new Engine.Sprite(this.scene, this.world, x, y);
		this.world.sprites.push(sprite);
		this.layer.sprites.push(sprite);
		return sprite;

	}


	spritesheet(cacheKey, imageKey, tileWidth, tileHeight, tilePadding){

		let spritesheet = new Engine.Spritesheet(this.cache.use(imageKey), tileWidth, tileHeight, tilePadding);
		this.cache.add(cacheKey, spritesheet);
		return spritesheet;

	}


	group(){

		console.error("Groups don't exist yet");

	}

};