/*global Engine*/
Engine.Physics = class Physics{

    constructor(world, options){

        this.world = world;
        this.options = {
            rotation: false,
        };
        Object.assign(this.options, options);

        this.collisionMemo = new Map();
        this.bodies = [];
        this.tree = new Engine.QuadTree();

    }

    /**
     * Clear all bodies from physics
     */
    clear(){

        this.collisionMemo.clear();
        this.bodies = [];
        this.tree.clear();

    }


    /**
     * Add a single body to the physics
     */
    add(bodies){

        if (bodies instanceof Engine.Body){

            this.bodies.push(bodies);

        }
        else{

            for(let body of this.bodies)
                this.bodies.push(body);

        }

    }


    tick(delta){

        // Clear the memo at the beginning of each tick
        this.collisionMemo.clear();

        // First update the physics bodies
        let i = this.bodies.length;
        while(i--){
             this.bodies[i].update(delta);

             // Fix bounds
             if(this.bodies[i].clamped){

                // Reverse velocities if we've hit the sides
                if(this.bodies[i].pos.x + this.bodies[i].shape.width > this.world.width || this.bodies[i].pos.x < 0){

                    this.bodies[i].vel.x = -this.bodies[i].vel.x;

                }
                if(this.bodies[i].pos.y + this.bodies[i].shape.height > this.world.height || this.bodies[i].pos.y < 0){

                    this.bodies[i].vel.y = -this.bodies[i].vel.y;

                }

                this.bodies[i].pos.clamp(0, this.world.width - this.bodies[i].shape.width, 0, this.world.height - this.bodies[i].shape.height);

             }
        }


        // Check each body for collision
        // TODO: use a quadtree for this update
        for(let leftIndex=0; leftIndex<this.bodies.length - 1; leftIndex++){

            for(let rightIndex=leftIndex+1; rightIndex<this.bodies.length; rightIndex++){

                if(this.bodies[leftIndex] === this.bodies[rightIndex] ||
                    this.collisionMemo.get(this.bodies[leftIndex]) === this.bodies[rightIndex] ||
                    !this.bodies[leftIndex].enabled || !this.bodies[rightIndex].enabled){

                    // These bodies have already collided
                    continue;

                }
                else if(Engine.Geometry.intersects(this.bodies[leftIndex], this.bodies[rightIndex])){

                    // Check for intersect of these two bodies
                    this.collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);    // Record this collision so we don't repeat calculations
                    Engine.Collision.collision(this.bodies[leftIndex], this.bodies[rightIndex]);       // Calculate the collision of these bodies

                }



            }

        }

    }

};