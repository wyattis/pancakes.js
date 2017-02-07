/*global Engine*/
Engine.ObjectFactory = class ObjectFactory{

	constructor(world, layer, cache){

		this.world = world;
		this.layer = layer;
		this.cache = cache;

	}


	sprite(x, y){

		let sprite = new Engine.Sprite(this.world, x, y);
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