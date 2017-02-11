/*global Engine*/
/**
 * Allow Sprites to use the `play` keyword to control audio and animations
 * @param {Engine.Sprite} sprite - The sprite instance associated with this controller.
 */
Engine.SpriteController = class SpriteController{

    constructor(sprite){

        this.sprite = sprite;

    }


    /**
     * Play the animation specified.
     * @param {string} name - The name of the animation that was previously created.
     */
    animation(name){

        if(this.sprite.currentAnimation === this.sprite.animations[name]){

            this.sprite.currentAnimation.reset();

        }
		else{

			this.sprite.currentAnimation = this.sprite.animations[name];
			this.sprite.currentAnimation.reset();

		}

    }

};