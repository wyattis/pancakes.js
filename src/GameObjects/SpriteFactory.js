/*global Engine*/
/**
 * Factory for adding animations, images and audio to a Sprite.
 */
Engine.SpriteFactory = class SpriteFactory{

    constructor(sprite){

        this.sprite = sprite;

    }


    /**
     * Add an animation to the parent Engine.Sprite.
     * @param {string} name - The name of the animation. Used to play the animation later.
     * @param {string} spritesheetKey - The name of the spritesheet associated with this. animation
     * @param {Array} frames - An array of frames in the animation.
     * @param {Integer} totalTime - How many milliseconds long is this animation.
     * @param {Object} options - Any options for this animation.
     */
    animation(name, spritesheetKey, frames, totalTime, options){

		let animation = new Engine.Animation(this.sprite, Engine.cache.use(spritesheetKey), frames, totalTime, options);
		this.sprite.animations[name] = animation;
		this.sprite.currentAnimation = animation;
		return animation;

    }



    /**
     * Add a single image to the Sprite.
     * @param {string} cacheKey - The name of the image in the game cache.
     */
    image(cacheKey){

    	this.sprite.image = Engine.cache.use(cacheKey);

    }

};