/*global QuadTree Engine Body Collision*/
class Physics{

    constructor(options){

        this.options = {
            rotation: false,
        };
        Object.assign(this.options, options);

        this.collisionMemo = new Map();
        this.bodies = [];
        this.tree = new QuadTree();

    }


    add(bodies){

        if (bodies instanceof Body){

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

        for(let leftIndex=0; leftIndex<this.bodies.length - 1; leftIndex++){

            for(let rightIndex=leftIndex+1; rightIndex<this.bodies.length; rightIndex++){

                if(this.bodies[leftIndex] === this.bodies[rightIndex] ||
                    this.collisionMemo.get(this.bodies[leftIndex]) === this.bodies[rightIndex] ||
                    !this.bodies[leftIndex].enabled || !this.bodies[rightIndex].enabled){
                    continue;
                }
                else if(Engine.Geometry.intersects(this.bodies[leftIndex], this.bodies[rightIndex])){
                    this.collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);
                    // console.log('Collision between', this.bodies[leftIndex].pos, this.bodies[rightIndex].pos);
                    Collision.collision(this.bodies[leftIndex], this.bodies[rightIndex]);
                }

            }

        }

    }

}