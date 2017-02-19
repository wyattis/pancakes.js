/*global Engine*/
/**
 * Holds the static logic for newtonian collision calculations
 */
Engine.Collision = class Collision{


    /**
     * Collision handler
     */
    static collision(a, b){

        // TODO: Handle collisions that aren't fully elastic

        if(a.shape.type === Engine.RECTANGLE && b.shape.type === Engine.RECTANGLE){

            if(a.fixed){

                return Collision._fixedRectangleCollision(b, a);

            }
            else if(b.fixed){

                return Collision._fixedRectangleCollision(a, b);

            }
            else{

                return Collision._rectangleCollision(a, b);

            }

        }

    }



    /**
     * Calculate the final velocity and position of two non-fixed rectangles colliding
     * @private
     */
    static _rectangleCollision(a, b){

        let dxPos = a.shape.centerX - b.shape.centerX;
        let dyPos = a.shape.centerY - b.shape.centerY;
        let dxVel = a.vel.x - b.vel.x;
        let dyVel = a.vel.y - b.vel.y;


        if(a.shape.left < b.shape.right && a.shape.right > b.shape.left){
            // React in X direction because that the is the direction the rectangles
            // must be colliding in.

            // Calculate the final velocities of the rectangles
            let vels = Collision._elasticParticleCollision1D(a.vel.x, a.mass, b.vel.x, b.mass);
            a.vel.x = vels[0];
            b.vel.x = vels[1];

            // Move the rectangles so that they don't accidentally collide on the next tick
            const fullWidth = (a.shape.width + b.shape.width)/2;
            const widthDiff = ((fullWidth - Math.abs(dxPos))/2) + .01;
            // console.log('X collision:', fullWidth, dxPos, widthDiff);
            if(widthDiff > 1){
                // console.log('X error');
                // console.dir(a);
                // console.dir(b);
            }
            // if(a.vel.x > 0){
            a.pos.x -= widthDiff;
            b.pos.x += widthDiff;
            // }
            // else if(a.vel.x < 0){
            //     a.pos.x += widthDiff;
            //     b.pos.x -= widthDiff;
            // }
        }
        else{
            // React in Y direction because the rectangles must be hitting in the
            // y direction or on a corner. Either way we just assume the y direction
            // is colliding.

            // Calculate the final velocities of the rectangles
            let vels = Collision._elasticParticleCollision1D(a.vel.y, a.mass, b.vel.y, b.mass);
            a.vel.y = vels[0];
            b.vel.y = vels[1];

            // Move the rectangles so that they don't accidentally collide on the next tick
            const fullHeight = (a.shape.height + b.shape.height)/2;
            const heightDiff = (((fullHeight - Math.abs(dyPos))/2) >> 0);
            // console.log('Y collision:', fullHeight, dyPos, heightDiff);
            if(heightDiff > 1){
                // console.log('Y error');
                // console.dir(a);
                // console.dir(b);
            }
            // if(a.vel.y > 0){
            a.pos.y -= heightDiff;
            b.pos.y += heightDiff;
            // }
            // else if(a.vel.y < 0){
            //     a.pos.y += heightDiff;
            //     b.pos.y -= heightDiff;
            // }

        }

    }



    /**
     * Calculate rectangle collision where one body is fixed.
     * @param {Engine.Rectangle} dRect - Dynamic rectangle in collision
     * @param {Engine.Rectangle} fRect - Fixed rectangle in collision
     * @private
     */
    static _fixedRectangleCollision(dRect, fRect){

        let dxPos = dRect.shape.centerX - fRect.shape.centerX;
        let dyPos = dRect.shape.centerY - fRect.shape.centerY;

        // TODO: how do they collide?
        console.log('fixedRectangleCollision not supported yet');

    }



    /**
     * Calculates final velocities for 1D elastic particle collision
     * @private
     */
    static _elasticParticleCollision1D(v_1, m_1, v_2, m_2){


        let v_1_f = v_1 * ((m_1 - m_2) / (m_1 + m_2)) +
                    v_2 * ((2 * m_2 ) / (m_1 + m_2));


        let v_2_f = v_1 * ((2 * m_1) / (m_1 + m_2)) +
                    v_2 * ((m_2 - m_1) / (m_1 + m_2));

        return [v_1_f, v_2_f];

    }


    /**
     * Returns the final velocities for two particles SLAMMING
     * @private
     */
    static _elasticParticleCollision2D(v_1, m_1, v_2, m_2){

        let v_f_x = Collision._elasticParticleCollision1D(v_1.x, m_1, v_2.x, m_2);

        let v_f_y = Collision._elasticParticleCollision1D(v_1.y, m_1, v_2.y, m_2);

        return [v_f_x, v_f_y];

    }

};