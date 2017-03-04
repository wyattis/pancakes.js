/*global Engine*/
/**
 * Handles all physics for a world.
 * @constructor
 * @param {Engine.World} world reference to the parent world
 * @param {object} opts any specific physics options
 * @returns {Engine.Physics} instance
 */
Engine.Physics = class Physics{

    constructor(world, options){

        this.world = world;
        this.options = {
            rotation: false,
        };
        Object.assign(this.options, options);


        // Private Map for memoization when checking collisions. Just used to avoid
        // instantiating a new Map for each tick.
        this._collisionMemo = new Map();
        this.bodies = [];

        this.tree = new Engine.QuadTree();

    }


    /**
     * Clear all bodies from physics
     * @private
     */
    clear(){

        this._collisionMemo.clear();
        this.bodies = [];
        this.tree.clear();

    }


    /**
     * Add a single body to the physics
     *
     * @param {Engine.Sprite|Engine.Body|Engine.Collider} obj - The sprite, body or collider to add.
     * @param {object} opts - The options to include when adding the sprite.
     */
    add(obj, opts){

        // Slow check to see if Sprite, Body or Collider
        if(obj instanceof Engine.Sprite){
            // TODO: Create a body and link it to this sprite
            let body = new Engine.Body(obj.position.x, obj.position.y);
            obj.addBody(body);
            // body.reference(obj);
            this.bodies.push(body);
        }
        else if(obj instanceof Engine.Body){
            // TODO: Add this body
            this.bodies.push(obj);
        }
        else if(obj instanceof Engine.Collider){
            // TODO: Add this collider
        }
        else{
            console.error("can't add this type to the physics engine");
        }

    }


    /**
     * The physics logic
     * @private
     */
    tick(delta){

        // Clear the memo at the beginning of each tick
        this._collisionMemo.clear();

        // First update the physics bodies
        let i = this.bodies.length;
        while(i--){
             this.bodies[i].update(delta);

             // Fix bounds
             if(this.bodies[i].clamped){

                // Reverse velocities if we've hit the sides
                if(this.bodies[i].position.x + this.bodies[i].shape.width > this.world.width || this.bodies[i].position.x < 0){

                    if(this.bodies[i].bouncy)
                        this.bodies[i].vel.x = -this.bodies[i].vel.x;
                    else
                        this.bodies[i].vel.x = 0;

                    this.bodies[i].acc.x = 0;

                }
                if(this.bodies[i].position.y + this.bodies[i].shape.height > this.world.height || this.bodies[i].position.y < 0){

                    if(this.bodies[i].bouncy)
                        this.bodies[i].vel.y = -this.bodies[i].vel.y;
                    else
                        this.bodies[i].vel.y = 0;

                    this.bodies[i].acc.y = 0;

                }

                this.bodies[i].position.clamp(0, this.world.width - this.bodies[i].shape.width, 0, this.world.height - this.bodies[i].shape.height);

             }
        }


        // Check each body for collision
        // TODO: use a quadtree for this update



        let rightIndex = this.bodies.length;
        let leftIndex = 0;
        // console.time('collisionCheck');
        while(rightIndex--){

            leftIndex = 0;
            while(leftIndex < rightIndex){

                // console.log(leftIndex, rightIndex);
                if(this.bodies[leftIndex] !== this.bodies[rightIndex] &&
                    (this.bodies[leftIndex].enabled && this.bodies[rightIndex].enabled)){
                    // Don't collide with yourself and make sure they are enabled

                    // console.log('body is not itself and both bodies are enabled');

                    if(this.bodies[leftIndex]._collisionBodies.has(this.bodies[rightIndex]) ||
                        this.bodies[rightIndex]._collisionBodies.has(this.bodies[leftIndex])){


                        if(this._collisionMemo.get(this.bodies[leftIndex]) !== this.bodies[rightIndex] ||
                            this._collisionMemo.get(this.bodies[rightIndex]) !== this.bodies[leftIndex]){

                            // console.log('Can collide');
                            if(Engine.Geometry.intersects(this.bodies[leftIndex], this.bodies[rightIndex])){

                                // TODO: doesn't this form of memoization limit me to one collision per body per update???
                                this._collisionMemo.set(this.bodies[leftIndex], this.bodies[rightIndex]);
                                this._collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);
                                // console.log(leftIndex, rightIndex)

                                Engine.Collision.collision(this.bodies[leftIndex], this.bodies[rightIndex]);
                            }

                        }

                    }

                }

                leftIndex ++;

            }

        }
        // console.timeEnd('collisionCheck');

    }

};