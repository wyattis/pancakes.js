/*global Engine*/
Engine.Sprite = class Sprite{

	constructor(parent, x, y){

		this.parent = parent;
		this.currentAnimation = null;
		this.animations = {};
		this.needsRendered = true;
		this.body = new Engine.Body(x, y);

		// Add "factory"
		this.add = {};
		this.add.animation = (function(name, spritesheetKey, frames, totalTime, options){

			let animation = new Engine.Animation(this, Engine.cache.use(spritesheetKey), frames, totalTime, options);

			this.animations[name] = animation;

			this.currentAnimation = animation;
			return animation;

		}).bind(this);


		// Play handler
		this.play = {};

		this.play.animation = (function(name){

			// console.error('Playing animations not yet supported');
			if(this.currentAnimation !== this.animations[name]){
				this.currentAnimation = this.animations[name];
				this.currentAnimation.reset(0);
			}

		}).bind(this);

	}


	/**
	 * Enable physics for this Sprite
	 */
	enablePhysics(shape){

		this.body.addShape(shape);
		this.parent.physics.add(this.body);

	}

	/**
	 * Sprite update method for updating relevant
	 * animations
	 */
	update(delta){

		this.currentAnimation.update(delta);

	}


	/**
	 * Render the given sprite
	 */
	render(ctx, delta){

		// (0.5 + num) << 0 is a bitwise shift to perform rounding
		this.currentAnimation.render(ctx, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0);

		this.needsRendered = false;
		// Not rounding makes the images appear fuzzy
		// this.currentAnimation.render(this.parent.ctx, this.pos.x, this.pos.y);

	}


	/**
	 * Set the position of the sprite. Also lets the parent know that the sprite
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