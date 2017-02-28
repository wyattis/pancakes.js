/*global Engine*/
/**
 * Sprite class after Container refractor.
 * @type Engine.Sprite
 * @param {float} x - The x position of the sprite relative to its parent
 * @param {float} y - The y position of the sprite relative to its parent
 */
Engine.nSprite = class nSprite{

	constructor(x, y){

		this.position = new Engine.Vector(x, y);	// Relative position
		this._position = this.position.clone();		// Real position
		this._relativeTo = new Vector(0, 0);		// The position this is relative to

	}


	/**
	 * Set the vector that the real position is relative to.
	 * @param {Engine.Vector} relativeTo - Where should the position be calculated relative to?
	 */
	setRelativeTo(relativeTo){

		this._relativeTo = relativeTo;

	}


	/**
	 * Update the real position of the sprite.
	 * @param  {Engine.Vector} relativeTo - The position to calculate the position 
	 * relative to.
	 * @private
	 */
	updatePosition(){

		this._position.x = this._relativeTo.x + this.position.x;
		this._position.y = this._relativeTo.y + this.position.y;

	}


	/**
	 * Render the sprite
	 * @param {CanvasRenderingContext2D} ctx Sprite rendering context.
	 */
	render(ctx){

		ctx.fillStyle = 'blue';
		ctx.fillRect(this._position.x, this._position.y, 100, 100);

	}

}