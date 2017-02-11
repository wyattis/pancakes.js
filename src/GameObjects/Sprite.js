/*global Engine*/
/**
 * Describes a Sprite. Sprites can have animations, physics bodies, etc. TODO
 * @constructor
 * @param {Engine.Scene} scene reference to the parent scene
 * @param {Engine.World} world reference to the parent world
 * @param {float} x the initial x position of the body in pixels
 * @param {float} y the initial y position of the body in pixels
 * @returns {Engine.Sprite} instance
 */
Engine.Sprite = class Sprite{

	constructor(scene, world, x, y){

		// TODO: how to handle rendering shapes, images, or animations?
		// TODO: how should we add audio effects to a sprite?

		this.scene = scene;
		this.world = world;
		this.currentAnimation = null;
		this.animations = {};
		this.needsRendered = true;
		this.body = new Engine.Body(x, y);

		// Add SpriteFactory for handy API
		this.add = new Engine.SpriteFactory(this);

		// Play handler
		this.play = new Engine.SpriteController(this);

	}


	/**
	 * Enable physics for this Sprite
	 */
	enablePhysics(shape){

		this.body.addShape(shape);
		this.world.physics.add(this.body);

	}


	/**
	 * Specify the group or member that this sprite collides with.
	 */
	collidesWith(who){

		// TODO:

	}


	/**
	 * Sprite update method for updating relevant
	 * animations
	 */
	update(delta){

		if(this.currentAnimation){
			this.currentAnimation.update(delta);
		}

	}


	/**
	 * Render the given sprite
	 */
	render(ctx, delta){


		if(this.currentAnimation){
			// (0.5 + num) << 0 is a bitwise shift to perform rounding
			this.currentAnimation.render(ctx, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0);
		}
		else if(this.image){

			ctx.drawImage(this.image, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0);

		}
		this.needsRendered = false;
		// Not rounding makes the images appear fuzzy
		// this.currentAnimation.render(this.world.ctx, this.pos.x, this.pos.y);

	}


	/**
	 * Set the position of the sprite. Also lets the world know that the sprite
	 * needs to be rendered again.
	 */
	setPos(x, y){

		// If the position is different than the previous position we will render
		// the sprite again
		if(this.pos.x !== x || this.pos.y !== y) this.queForRender();
		this.last.pos.x = this.pos.x;
		this.last.pos.y = this.pos.y;
		this.pos.x = x;
		this.pos.y = y;

	}


	/**
	 * Add a position value to the current position of the Sprite
	 */
	addPos(x, y){

		this.body.setPos(this.body.pos.x + x, this.body.pos.y + y);

	}


	/**
	 * Let the screen/layer know that this sprite has changed and needs to be
	 * rendered again.
	 */
	queForRender(){

		this.needsRendered = true;

	}

};