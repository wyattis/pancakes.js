/*global Engine*/
/**
 * Describes a factory for adding sprites and resources to a scene and world
 * @constructor
 * @param {Scene} scene reference to the parent scene
 * @param {Engine.World} world reference to the parent world
 * @param {Engine.Layer} layer reference to the parent layer
 * @param {Engine.StockPile} cache reference to the cache being used by this game
 */
Engine.ObjectFactory = class ObjectFactory{

	constructor(scene, world, layer, cache){

		this.scene = scene;
		this.world = world;
		this.layer = layer;
		this.cache = cache;

	}


	/**
	 * Adds a sprite to the referenced scene, world and layer.
	 * @param {float} x - The x position of the sprite.
	 * @param {float} y - The y position of the sprite.
	 * @link {Engine.Sprite}
	 * @returns {Engine.Sprite} instance
	 */
	sprite(x, y){

		let sprite = new Engine.Sprite(this.scene, this.world, x, y);
		this.world.sprites.push(sprite);
		this.layer.sprites.push(sprite);
		return sprite;

	}

	/**
	 * Adds a spritesheet to the cache.
	 * @param {string} cacheKey - The name of the spritesheet within the cache.
	 * @param {string} imageKey - The name of the image to be used with the spritesheet.
	 * @param {int} tileWidth - The width of a single tile within the spritesheet
	 * @param {int} tileHeight - The height of a single tile within the spritesheet
	 * @param {int} tilePadding - The padding between tiles in the spritesheet
	 * @link {Engine.Spritesheet}
	 * @returns {Engine.Spritesheet}
	 */
	spritesheet(cacheKey, imageKey, tileWidth, tileHeight, tilePadding){

		let spritesheet = new Engine.Spritesheet(this.cache.use(imageKey), tileWidth, tileHeight, tilePadding);
		this.cache.add(cacheKey, spritesheet);
		return spritesheet;

	}


	/**
	 * Adds a group to the scene/world
	 * @link {Engine.Group}
	 * @returns {Engine.Group}
	 */
	group(arr){

		let group = new Engine.Group(this.scene, this.world, this.layer, arr);
		return group;

	}

};