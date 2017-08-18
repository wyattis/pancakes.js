import Body from '../Physics/Body';
import SpriteFactory from './SpriteFactory';
import SpriteController from './SpriteController';
import Rectangle from '../Physics/Rectangle';

/**
 * Describes a Sprite. Sprites can have animations, physics bodies, etc. TODO
 * @constructor
 * @param {Scene} scene reference to the parent scene
 * @param {World} world reference to the parent world
 * @param {float} x the initial x position of the body in pixels
 * @param {float} y the initial y position of the body in pixels
 * @returns {Sprite} instance
 */
class Sprite{

	constructor(scene, world, x, y){

		// TODO: how to handle rendering shapes, images, tiles, or animations?
		// TODO: how should we add audio effects to a sprite?

		this.scene = scene;
		this.world = world;
		this.currentAnimation = null;
		this.animations = {};
		this.needsRendered = true;
		this.body = new Body(x, y);

		// Add SpriteFactory for handy API
		this.add = new SpriteFactory(this);

		// Play handler
		this.play = new SpriteController(this);

	}


	/**
	 * Enable physics for this Sprite. Takes care of adding the body to the sprite.
	 * @param {object} opts
	 * @param {float} [opts.mass=100] - The mass to use when bodies collide.
	 *		Not sure how this number equates to real world mass.
	 * @param {float} [opts.normalizedMaxSpeed=0] - The maximum, normalized
	 *		speed of this body. If this value is 0 then the speed unlimited.
	 * @param {Vector} [opts.maxSpeed={}] - Direction based max speed
	 *		for the body.
	 * @param {Vector} [opts.friction={}] - Friction to apply to
	 *		the body.
	 * @param {Vector} [opts.gravity={}] - Supplying a Vector will
	 *		make gravity be applied for the given body.
	 * @param {boolean} [opts.clamped=false] - If true the Body will be clamped
	 *		within the bounds of the world.
	 * @param {boolean} [opts.fixed=false] - If true the Body will not be
	 *		affected by collisions it is a part of.
	 * @param {boolean} [opts.enabled=true] - If false then collisions won't
	 *		happen with this body. This can be changed while the game is running
	 *		by changing the sprite.body.enabled property.
	 *
	 * @param {undefined|string|Rectangle} [shape] This allows you to set
	 *		your own geometry for this sprite. If left empty it will assume the
	 *		shape is a rectangle the size of the image, tile or animation
	 *		assigned to it.
	 */
	enablePhysics(opts, shape){

		// TODO: add shape based on image, tile or animation if shape is not
		//		 supplied.

		if(shape){
			// Do nothing
		}
		else if(this.currentAnimation){

			shape =	new Rectangle(this.body.pos.x, this.body.pos.y, this.currentAnimation.width, this.currentAnimation.height);

		}
		else if(this.image){

			debugger;
			// shape = new Rectangle(this.body.pos.x, this.body.pos.y, this.image.width, this.image.height);
			shape = new Rectangle(this.body.pos.x, this.body.pos.y, 100, 100);

		}
		else if(this.tile){

			console.error('Tiles not supported on Sprites yet');
			debugger;

		}


		// Add whatever shape we decided on
		this.body.addShape(shape);

		// Add the supplied options to the physics body
		if(opts)
			Object.assign(this.body, opts);

		this.world.physics.add(this.body);

	}


	/**
	 * Specify the group, array, sprite or body that this sprite body should collide with. Essentially an alias for Body.collidesWith.
	 * @param {Array|Group|Body|Sprite} what - The game object(s) this sprite should collide with.
	 */
	collidesWith(what){

		this.body.collidesWith(what);

	}


	/**
	 * Sprite update method for updating relevant
	 * animations
	 * @private
	 */
	update(delta){

		if(this.currentAnimation){
			this.currentAnimation.update(delta);
		}

	}


	/**
	 * Render the given sprite
	 * @private
	 */
	render(ctx, delta){


		if(this.currentAnimation){
			// (0.5 + num) << 0 is a bitwise shift to perform rounding

			let rInfo = this.currentAnimation.getRenderInfo();
			// this.currentAnimation.render(ctx, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0);

			// _width and _height include any scaling associated with the body
			ctx.drawImage(rInfo.texture, rInfo.sx, rInfo.sy, rInfo.tileWidth, rInfo.tileHeight, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0, this.body.shape._width, this.body.shape._height);

		}
		else if(this.image){

			ctx.drawImage(this.image, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0, this.body.shape._width, this.body.shape._height);

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
	 * @private
	 */
	queForRender(){

		this.needsRendered = true;

	}

}

export default Sprite;