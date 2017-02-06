/*global Engine*/
Engine.ObjectFactory = class ObjectFactory{

	constructor(parent, cache){

		this.parent = parent;
		this.cache = cache;

	}


	sprite(x, y){

		let sprite = new Engine.Sprite(this.parent, x, y);
		this.parent.sprites.push(sprite);
		this.parent.scene.sprites.push(sprite);
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