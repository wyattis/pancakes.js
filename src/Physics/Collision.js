/*global Engine*/
"use strict";
class Collision{


    /**
     * Collision handler
     */
    static collision(bodyA, bodyB){

        if(bodyA.geometry.type === Engine.RECTANGLE && bodyB.geometry.type === Engine.RECTANGLE){

            return Collision.rectangleCollision(bodyA, bodyB);

        }

    }



    /**
     * Calculate the final velocity and position of two rectangles colliding
     */
    static rectangleCollision(bodyA, bodyB){

        let dxPos = bodyA.pos[0] - bodyB.pos[0];
        let dyPos = bodyA.pos[1] - bodyB.pos[1];

        if(Math.abs(dxPos) > Math.abs(dyPos)){
            // React in X direction because that the is the direction the rectangles
            // must be colliding in.

            // Calculate the final velocities of the rectangles
            let vels = Collision.elasticParticleCollision1D(bodyA.vel[0], bodyA.mass, bodyB.vel[0], bodyB.mass);
            bodyA.vel[0] = vels[0];
            bodyB.vel[0] = vels[1];

            // Move the rectangles so that they don't accidentally collide on the next tick
            const fullWidth = (bodyA.geometry.width + bodyB.geometry.width)/2;
            const widthDiff = ((fullWidth - Math.abs(dxPos))/2) + .01;
            // console.log('X collision:', fullWidth, dxPos, widthDiff);
            if(widthDiff > 1){
                console.log('X error');
                console.dir(bodyA);
                console.dir(bodyB);
            }
            if(bodyA.vel[0] > 0){
                bodyA.pos[0] -= widthDiff;
                bodyB.pos[0] += widthDiff;
            }
            else if(bodyA.vel[0] < 0){
                bodyA.pos[0] += widthDiff;
                bodyB.pos[0] -= widthDiff;
            }
        }
        else{
            // React in Y direction because the rectangles must be hitting in the
            // y direction or on a corner. Either way we just assume the y direction
            // is colliding.

            // Calculate the final velocities of the rectangles
            let vels = Collision.elasticParticleCollision1D(bodyA.vel[1], bodyA.mass, bodyB.vel[1], bodyB.mass);
            bodyA.vel[1] = vels[0];
            bodyB.vel[1] = vels[1];

            // Move the rectangles so that they don't accidentally collide on the next tick
            const fullHeight = (bodyA.geometry.height + bodyB.geometry.height)/2;
            const heightDiff = (((fullHeight - Math.abs(dyPos))/2) >> 0);
            // console.log('Y collision:', fullHeight, dyPos, heightDiff);
            if(heightDiff > 1){
                console.log('Y error');
                console.dir(bodyA);
                console.dir(bodyB);
            }
            if(bodyA.vel[1] > 0){
                bodyA.pos[1] -= heightDiff;
                bodyB.pos[1] += heightDiff;
            }
            else if(bodyA.vel[1] < 0){
                bodyA.pos[1] += heightDiff;
                bodyB.pos[1] -= heightDiff;
            }

        }

    }


    /*
     *  Calculates final velocities for 1D elastic particle collision
     */
    static elasticParticleCollision1D(v_1, m_1, v_2, m_2){


        let v_1_f = v_1 * ((m_1 - m_2) / (m_1 + m_2)) +
                    v_2 * ((2 * m_2 ) / (m_1 + m_2));


        let v_2_f = v_1 * ((2 * m_1) / (m_1 + m_2)) +
                    v_2 * ((m_2 - m_1) / (m_1 + m_2));

        return [v_1_f, v_2_f];

    }


    /*
     *  Returns the final velocities for two particles SLAMMING
     */
    static elasticParticleCollision2D(v_1, m_1, v_2, m_2){

        let v_f_x = Collision.elasticParticleCollision1D(v_1[0], m_1, v_2[0], m_2);

        let v_f_y = Collision.elasticParticleCollision1D(v_1[1], m_1, v_2[1], m_2);

        return [v_f_x, v_f_y];

    }

}