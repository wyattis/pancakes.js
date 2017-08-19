import QuadTree from './QuadTree';
import Geometry from './Geometry';
import Collision from './Collision';

/**
 * Handles all physics for a world.
 * @constructor
 * @param {World} world reference to the parent world
 * @param {object} opts any specific physics options
 * @returns {Physics} instance
 */
class Physics{

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

        this.tree = new QuadTree();

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
     */
    add(bodies){

        if (bodies.pos && bodies.vel){

            this.bodies.push(bodies);

        }
        else{

            for(let body of this.bodies)
                this.bodies.push(body);

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
                if(this.bodies[i].pos.x + this.bodies[i].shape.width > this.world.width || this.bodies[i].pos.x < 0){

                    if(this.bodies[i].bouncy)
                        this.bodies[i].vel.x = -this.bodies[i].vel.x;
                    else
                        this.bodies[i].vel.x = 0;

                    this.bodies[i].acc.x = 0;

                }
                if(this.bodies[i].pos.y + this.bodies[i].shape.height > this.world.height || this.bodies[i].pos.y < 0){

                    if(this.bodies[i].bouncy)
                        this.bodies[i].vel.y = -this.bodies[i].vel.y;
                    else
                        this.bodies[i].vel.y = 0;

                    this.bodies[i].acc.y = 0;

                }

                this.bodies[i].pos.clamp(0, this.world.width - this.bodies[i].shape.width, 0, this.world.height - this.bodies[i].shape.height);

             }
        }


        // Check each body for collision
        // TODO: use a quadtree for this update

        // for(let leftIndex=0; leftIndex<this.bodies.length - 1; leftIndex++){

        //     for(let rightIndex=leftIndex+1; rightIndex<this.bodies.length; rightIndex++){

        //         if(this.bodies[leftIndex] === this.bodies[rightIndex] ||
        //             this._collisionMemo.get(this.bodies[leftIndex]) === this.bodies[rightIndex] ||
        //             !this.bodies[leftIndex].enabled || !this.bodies[rightIndex].enabled){

        //             // These bodies have already collided
        //             continue;

        //         }
        //         else if(Engine.Geometry.intersects(this.bodies[leftIndex], this.bodies[rightIndex])){

        //             // Check for intersect of these two bodies
        //             this._collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);    // Record this collision so we don't repeat calculations
        //             Engine.Collision.collision(this.bodies[leftIndex], this.bodies[rightIndex]);       // Calculate the collision of these bodies

        //         }

        //     }

        // }


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
                            if(Geometry.intersects(this.bodies[leftIndex], this.bodies[rightIndex])){
                                // TODO: doesn't this form of memoization limit me to one collision per body per update???
                                this._collisionMemo.set(this.bodies[leftIndex], this.bodies[rightIndex]);
                                this._collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);
                                // console.log(leftIndex, rightIndex)

                                Collision.collision(this.bodies[leftIndex], this.bodies[rightIndex]);
                            }

                        }

                    }

                }

                leftIndex ++;

            }

        }
        // console.timeEnd('collisionCheck');

    }

}

export default Physics;