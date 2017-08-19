import Animation from '../Animation/Animation';
import Engine from '../Engine';
import Rectangle from '../Physics/Rectangle';

/**
 * Factory for adding animations, images and audio to a Sprite.
 */
class SpriteFactory{

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

		let animation = new Animation(this.sprite, Engine.cache.use(spritesheetKey), frames, totalTime, options);
		this.sprite.animations[name] = animation;
		this.sprite.currentAnimation = animation;
		this.sprite.shape = new Rectangle(0, 0, animation.width, animation.height);
		return animation;

    }



    /**
     * Add a single image to the Sprite. This also defines the sprite shape.
     * @param {string} cacheKey - The name of the image in the game cache.
     */
    image(cacheKey){

    	this.sprite.image = Engine.cache.use(cacheKey);
    	this.sprite.shape = new Rectangle(0, 0, this.sprite.image.width, this.sprite.image.height);

    }



    /**
     * Add a single tile from a spritesheet to the Sprite
     * @param {string} spritesheetName The key for the spritesheet
     * @param {int} tileIndex The index of the tile in the spritesheet
     */
    tile(spritesheetName, tileIndex){

        //TODO: How should we handle single tiles?


    }

}

export default SpriteFactory;