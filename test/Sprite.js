class Sprite{

	constructor(engine, ctx, x, y, texture){

		this.engine = engine;
		this.ctx = ctx;
		this.animations = {};
		this.currentAnimation = null;
		this.texture = texture;
		this.x = x;
		this.y = y;

		this.updateId = this.engine.ticker.add(this, this.update, 1000 / 30);

	}

	animation(name, spritesheet, frames, animationTime){

		this.animations[name] = new Engine.Animation(this.engine, spritesheet, frames, animationTime);

		this.setAnimation(name);
	}

	setAnimation(name){

		this.currentAnimation = this.animations[name];

	}

	render(delta){

		this.currentAnimation.render(this.ctx, this.x, this.y);

	}
}