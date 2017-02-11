/*global Engine*/
/**
 * Describes a simple memory cache for resources
 * @constructor
 * @returns Engine.StockPile
 */
Engine.StockPile = class StockPile{

	constructor(){

		this.items = {};

	}

	add(key, obj){

		this.items[key] = obj;

	}

	use(key){

		return this.items[key];

	}

};