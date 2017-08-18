
/**
 * Allow Sprites to use the `play` keyword to control audio and animations
 * @param {Engine.Sprite} sprite - The sprite instance associated with this controller.
 */
class SpriteController{

    constructor(sprite){

        this.sprite = sprite;

    }


    /**
     * Play the animation specified.
     * @param {string} name - The name of the animation that was previously created.
     * @param {boolean} shouldResetCurrent - If this is true then it will restart the current animation if it's the same animation you're trying to play.
     */
    animation(name, shouldResetCurrent){

        if(shouldResetCurrent && this.sprite.currentAnimation === this.sprite.animations[name]){

            this.sprite.currentAnimation.reset();

        }
		else{

			this.sprite.currentAnimation = this.sprite.animations[name];
			this.sprite.currentAnimation.reset();

		}

    }

}

export default SpriteController;