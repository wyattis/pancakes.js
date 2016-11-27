class ObjectFactory{

	constructor(parent){

		this.parent = parent;

	}


	sprite(x, y){
		
		let sprite = new Sprite(this.parent, x, y);
		this.parent.sprites.push(sprite);
		return sprite;

	}


	spritesheet(cacheKey, imageKey, tileWidth, tileHeight, tilePadding){
		
		let spritesheet = new Spritesheet(this.parent.cache.use(imageKey), tileWidth, tileHeight, tilePadding)
		this.parent.cache.add(cacheKey, spritesheet);
		return spritesheet;

	}


	group(){

		console.error("Groups don't exist yet");

	}

}