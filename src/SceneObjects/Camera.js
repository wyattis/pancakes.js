/*global Engine*/
Engine.Camera = class Camera{

    constructor(world, x, y, width, height){

        this.world = world;
        this.pos = new Engine.Vector(x || 0, y || 0);
        this.size = {width: width, height: height};

        this.followBodies = [];

    }


    /**
     * Add a body/sprite to the camera so it can follow it.
     */
    follow(obj){

        // Allow for sprites to be passed into this method directly
        if(obj.body){
            obj = obj.body;
        }

        // Duck typing to check for necessary properties
        if(obj.pos && obj.shape){

            this.followBodies.push(obj);

        }
        else{

            console.error("Can't follow an objects without .pos.x, .pos.y and .shape");

        }

    }


    /**
     * Update the camera position. This should happen after all other game
     * objects have been updated :).
     */
    update(delta){

        // TODO: make the camera frame and follow multiple bodies. Right now it will only follow the first one added.

        if(this.followBodies.length){

            this.pos.x = this.followBodies[0].pos.x + this.followBodies[0].shape.width/2 - this.size.width/2;
            this.pos.y = this.followBodies[0].pos.y + this.followBodies[0].shape.height/2 - this.size.height/2;

            this.pos.clamp(0, this.world.width, 0, this.world.height);

        }

    }


};