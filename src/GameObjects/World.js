/*global Engine*/
Engine.World = class World{

    constructor(scene, width, height){

        this.scene = scene;
        this.width = width;
        this.height = height;

        this.sprites = [];

        // Will be populated if physics are enabled
        this.physics = undefined;

        // use the ObjectFactory from the parent scene
        this.add = this.scene.add;

        // Camera object used for rendering
        this.camera = new Engine.Camera(this, 0, 0, this.scene.game.width, this.scene.game.height);

    }


    /**
     * Update all of the objects in the world :)
     */
    update(delta){

        let i = this.sprites.length;
        while(i--){

            this.sprites[i].update(delta);

        }


        // Update physics
        if(this.physics)
            this.physics.tick(delta);


        // Always update the camera last
        this.camera.update(delta);

    }



    /**
     * Enable the physics for this world
     */
    enablePhysics(){

        this.physics = new Engine.Physics();

    }
};