/*global Engine*/
/**
 * Sprite class after Container refractor.
 * @type Engine.Sprite
 * @param {float} x - The x position of the sprite relative to its parent
 * @param {float} y - The y position of the sprite relative to its parent
 */
Engine.Sprite = class Sprite{

	constructor(x, y){

		this.position = new Engine.Vector(x, y);	// Relative position
		this._position = this.position.clone();		// Real position
		this._relativeTo = new Engine.Vector(0, 0);	// The position this is relative to

		// Placeholder for the physics body that might be associated with this sprite
		this.body = null;

		// The box around this sprite
		this.box = new Engine.Rectangle(1, 1);

		this.animations = {};
		this.currentAnimation = null;

		// Add SpriteFactory for handy API
		this.add = new Engine.SpriteFactory(this);

		// Play handler
		this.play = new Engine.SpriteController(this);

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
	 * @param  {integer} delta - The time since the last update.
	 * @private
	 */
	update(delta){

		// this._position.x = this._relativeTo.x + this.position.x;
		// this._position.y = this._relativeTo.y + this.position.y;

	}


	/**
	 * Render the sprite
	 * @param {CanvasRenderingContext2D} ctx Sprite rendering context.
	 */
	render(ctx){

		// console.log('rendering', this._position);
		ctx.fillStyle = 'rgba(0, 255, 0, .3)';
		ctx.fillRect(this._position.x, this._position.y, 100, 100);

		if(this.currentAnimation){
			let specs = this.currentAnimation.getRenderInfo();
			ctx.drawImage(specs.texture, specs.sx, specs.sy, specs.tileWidth, specs.tileHeight, (0.5 + this._position.x) << 0, (0.5 + this._position.y) << 0, this.box.width, this.box.height);
		}


	}


	/**
	 * Set the body
	 * @param {Engine.Body} body - The body to add a reference to.
	 */
	 addBody(body){

		if(body)
	 		this.body = body;
	 	else
	 		this.body = new Engine.Body();

	 	// make the body and the sprite share the same properties
	 	this.body.reference(this);

	 }
};