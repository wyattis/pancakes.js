/*global Engine*/
/**
 * Essentially mirror the API of the Engine.Sprite object to provide a simple way
 * to make changes to the entire group.
 * @constructor
 * @param {Scene} scene - The parent scene
 * @param {World} world - The parent world
 * @param {Layer} layer - The parent layer
 * @param {Group} group - The parent group
 */
Engine.GroupFactory = class GroupFactory{


    constructor(scene, world, layer, group){

        this.scene = scene;
        this.world = world;
        this.layer = layer;
        this.group = group;

    }


    /**
     * Add a Sprite to the parent group
     * @param {Integer} x - the x position of the sprite
     * @param {Integer} y - the y position of the sprite
     */
    sprite(x, y){

        let sprite = new Engine.Sprite(this.scene, this.world, x, y);
		this.world.sprites.push(sprite);
		this.layer.sprites.push(sprite);
        this.group.members.push(sprite);
        return sprite;

    }


    /**
     * Add an animation to all of the sprites in this group
     * @link {Sprite.add.animation}
     */
    animation(){

        let i=this.group.members.length;
        while(i--){

            this.group.members[i].add.animation.apply(this.group.members[i].add, arguments);

        }

    }


    /**
     * Add an image to all of the sprites in this group.
     * @link {Sprite.add.image}
     */
    image(){

        let i=this.group.members.length;
        while(i--){

            this.group.members[i].add.image.apply(this.group.members[i].add, arguments);

        }

    }

};