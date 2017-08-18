import Physics from '../Physics/Physics';

/**
 * Describes a container for all of the game objects in a Scene.
 * @constructor
 * @param {object} scene reference to the parent scene
 * @param {integer} width The width of the world in number of pixels
 * @param {integer} height The height of the world in number of pixels
 * @returns {Engine.World} instance
 */
class World{

    constructor(scene, width, height){

        this.scene = scene;
        this.width = width;
        this.height = height;

        this.sprites = [];

        // Will be populated if physics are enabled
        this.physics = undefined;

        // use the ObjectFactory from the parent scene
        this.add = this.scene.add;

    }


    /**
     * Update all of the objects in this world comtainer :)
     * @param {integer} delta The number of milliseconds that have passed since the last update
     */
    update(delta){

        let i = this.sprites.length;
        while(i--){

            this.sprites[i].update(delta);

        }


        // Update physics
        if(this.physics)
            this.physics.tick(delta);


    }



    /**
     * Enable the physics for this world
     * @param {object} opts Any options for the physics engine
     */
    enablePhysics(opts){

        this.physics = new Physics(this, opts);

    }


    /**
     * Destroy the world.
     */
    destroy(){

        this.sprites = [];
        this.physics = undefined;

    }
}


export default World;