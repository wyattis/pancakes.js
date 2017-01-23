/*global QuadTree Collision Body*/
class Physics{

    constructor(){

        this.collisionMemo = new Map();
        this.bodies = new Set();
        this.tree = new QuadTree();

    }


    add(bodies){

        if (bodies instanceof Body){

            this.bodies.add(bodies);

        }
        else{

            for(let body of this.bodies)
                this.bodies.add(body);

        }

    }


    tick(delta){

        // Clear the memo at the beginning of each tick
        this.collisionMemo.clear();

        for(let bodyA of this.bodies){

            for(let bodyB of this.bodies){

                if(bodyA === bodyB){
                    console.log("Can't collide with ones self");
                    continue;
                }
                else if(this.collisionMemo.get(bodyA) === bodyB){

                    console.log('Collisin already calculated');
                    continue;

                }

                if(Collision.collides(bodyA, bodyB)){
                    this.collisionMemo.set(bodyB, bodyA);
                    console.log('Collision between', bodyA, bodyB);
                    // this.calculate()
                }

            }

        }

    }


    collision(bodyA, bodyB){

    }

}