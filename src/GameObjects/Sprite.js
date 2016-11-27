class Sprite{

	constructor(parent, x, y){

		this.parent = parent;
		this.currentAnimation = null;
		this.animations = {};
		this.pos = {
			x: x, 
			y: y
		};


		// Add "factory"
		this.add = {};
		this.add.animation = (function(name, spritesheetKey, frames, totalTime, options){
			
			let animation = new Animation(this.parent.cache.use(spritesheetKey), frames, totalTime, options);

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
	
		// this.parent.ctx.fillStyle = "red";
		// this.parent.ctx.fillRect(this.pos.x, this.pos.y, 30, 30);
		this.currentAnimation.render(this.parent.ctx, this.pos.x, this.pos.y);

	}


	setPos(x, y){

		// debugger;
		this.pos.x = x;
		this.pos.y = y;

	}

}