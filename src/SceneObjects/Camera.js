/*global Engine*/
/**
 * Describes the where/how the current world should be displayed
 * @constructor
 * @param {Engine.World} world reference to the world the camera is associated with
 * @param {float} x the initial x position of the camera
 * @param {float} y the initial y position of the camera
 * @param {float} width the initial width of the camera
 * @param {float} height the initial height of the camera
 * @returns {Engine.Camera} instance
 */
Engine.Camera = class Camera{

    constructor(world, x, y, width, height){

        this.world = world;         // Reference to the world
        this.followBodies = [];     // Array of the bodies it should follow
        this.pos = new Engine.Vector(x || 0, y || 0);
        this.size = {width: width, height: height};

        this.desiredPos = new Engine.Tween(this.pos, this.pos);
        this.desiredPos.tolerance = 2;
        this.desiredPos.roundToPixel = true;

        // TODO: How to handle when the camera size is larger than the world?
        //       Could center world in the camera or just not move the camera?

        // Set the bounds for the camera
        this.bounds = {
            x: {
                min: 0,
                max: this.world.width - this.size.width
            },
            y: {
                min: 0,
                max: this.world.height - this.size.height
            }
        };

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


        // TODO: handle apparent shakiness of followed character when tween is maxed out.
        //       Could potentially have a max rectangle that the camera keeps the
        //       character within? Or maybe match the camera velocity with the
        //       velocity of the character?

        if(this.followBodies.length){

            this.desiredPos.setTo({
                x: this.followBodies[0].pos.x + this.followBodies[0].shape.width/2 - this.size.width/2,
                y: this.followBodies[0].pos.y + this.followBodies[0].shape.height/2 - this.size.height/2,
            });

            this.desiredPos.update(delta);
            this.desiredPos.ref.clamp(this.bounds.x.min, this.bounds.x.max, this.bounds.y.min, this.bounds.y.max);

        }

    }


};