/*global Engine*/
/**
 * Describes a simple memory cache for resources
 * @constructor
 * @returns {StockPile} instance
 */
class StockPile{

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


export default StockPile;