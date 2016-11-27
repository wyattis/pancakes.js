class Sprite{

	constructor(engine, x, y){

		this.engine = engine;
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

		this.engine.ticker.add(this, this.render, 0)

	}



	update(delta){


	}


	render(delta){

		this.engine.ctx.fillStyle = "red";
		this.engine.ctx.fillRect(this.pos.x, this.pos.y, 30, 30);

	}

	setPos(x, y){

		this.pos.x = x;
		this.pos.y = y;

	}

}