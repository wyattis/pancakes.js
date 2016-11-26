class Sprite{

	constructor(x, y){

		this.animations = {};
		this.pos = {
			x: x, 
			y: y
		};


		this.add = {

			animation: (name, spritesheetKey, frames, totalTime, infinite) => {

				let animation = new Animation(spritesheetKey, frames, totalTime, infinite);

				this.animations[name] = animation;

				return animation;

			}

		}

	}



}