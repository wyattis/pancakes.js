/*global Engine*/
Engine.Physics = class Physics{

    constructor(options){

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
        for(let i=0; i<this.bodies.length; i++){
            this.bodies[i].update(delta);
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