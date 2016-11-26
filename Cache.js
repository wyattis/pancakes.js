class Cache{

	constructor(){

		this.items = {};

	}

	add(key, obj){

		this.items[key] = obj;

	}

	use(key){

		return this.items[key];

	}

}