class Sprite{

	constructor(parent, x, y){

		this.parent = parent;
		this.currentAnimation = null;
		this.animations = {};
		this.needsRendered = true;
		this.pos = {
			x: x, 
			y: y
		};
		this.vel = {
			x: 0,
			y: 0
		};
		this.last = {
			pos: {x: x, y: y},
			vel: {x: 0, y: 0}
		};


		// Add "factory"
		this.add = {};
		this.add.animation = (function(name, spritesheetKey, frames, totalTime, options){
			
			let animation = new Animation(this, this.parent.cache.use(spritesheetKey), frames, totalTime, options);
			
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
	
	update(delta){
		
		this.currentAnimation.update(delta);
		
	}

	render(delta){
	
		// (0.5 + num) << 0 is a bitwise shift to perform rounding
		this.currentAnimation.render(this.parent.ctx, (0.5 + this.pos.x) << 0, (0.5 + this.pos.y) << 0);
		
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
	 * Let the screen/layer know that this sprite has changed and needs to be 
	 * rendered again.
	 */
	queForRender(){
		
		this.needsRendered = true;
		
	}

}