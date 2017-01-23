/*global QuadTree Engine Body*/
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
                    console.log('Collision between', this.bodies[leftIndex].pos, this.bodies[rightIndex].pos);
                    this.collision(this.bodies[leftIndex], this.bodies[rightIndex]);
                }

            }

        }

    }


    collision(bodyA, bodyB){

        if(bodyA.geometry.type === Engine.RECTANGLE && bodyB.geometry.type === Engine.RECTANGLE){
        }

    }


    /*
     *  Calculates final velocities for 1D elastic particle collision
     */
    static elasticParticleCollision1D(v_1, m_1, v_2, m_2){


        const v_1_f = v_1 * ((m_1 - m_2) / (m_1 + m_2)) +
                    v_2 * ((2 * m_2 ) / (m_1 + m_2));


        const v_2_f = v_1 * ((2 * m_1) / (m_1 + m_2)) +
                    v_2 * ((m_2 - m_1) / (m_1 + m_2));

        return [v_1_f, v_2_f];

    }


    /*
     *  Returns the final velocities for two particles SLAMMING
     */
    static elasticParticleCollision2D(v_1, m_1, v_2, m_2){

        const v_f_x = Physics.elasticParticleCollision1D(v_1.x, m_1, v_2.x, m_2);

        const v_f_y = Physics.elasticParticleCollision1D(v_1.y, m_1, v_2.y, m_2);

        return [v_f_x, v_f_y];

    }

}