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
		this.add.animation = (function(name, spritesheetKey, frames, totalTime, infinite){

			let animation = new Animation(spritesheetKey, frames, totalTime, infinite);

			this.animations[name] = animation;

			this.currentAnimation = animation;
			return animation;

		}).bind(this);


		// Play handler
		this.play = {};

		this.play.animation = (function(name){

			console.error('Playing animations not yet supported');

		}).bind(this);

		this.parent.ticker.add(this, this.render, Engine.FPS);

	}


	render(delta){
	
		this.parent.ctx.fillStyle = "red";
		this.parent.ctx.fillRect(this.pos.x, this.pos.y, 30, 30);

	}


	setPos(x, y){

		// debugger;
		this.pos.x = x;
		this.pos.y = y;

	}

}