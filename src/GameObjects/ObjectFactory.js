class ObjectFactory{

	constructor(parent){

		this.parent = parent;

	}


	sprite(x, y){

		return new Sprite(this.parent, x, y);

	}


	spritesheet(cacheKey, imageKey, tileWidth, tileHeight){

		return new Spritesheet(cacheKey, imageKey, tileWidth, tileHeight);

	}


	group(){

		console.error("Groups don't exist yet");

	}

}