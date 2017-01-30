/*global Engine*/
class Body{

    constructor(x, y, vx, vy){

        this.enabled = true;
        this.mass = 100;

        this.pos = [0, 0];
        this.vel = [0, 0];
        this.acc = [0, 0];
        this.angle = 0;
        this.omega = 0;
        this.alpha = 0;

        if(vx || vy)
            this.setVel(vx, vy);

        if(x || y)
            this.setPos(x, y);

    }


    /**
     * Add a shape supported by the physics engine
     */
    addGeometry(shape){

        this.geometry = shape;

    }


    /**
     * Setter for position
     */
    setPos(x, y){

        this.pos = [x, y];
        if(this.geometry) this.geometry.setPos(x, y);

    }


    /**
     * Setter for velocity
     */
    setVel(x, y){

        if(x !== undefined)
            this.vel[0] = x;
        if(y !== undefined)
            this.vel[1] = y;

    }


    /**
     * Setter for acceleration
     */
    setAcc(x, y){

        this.acc = [x, y];

    }


    /**
     * Update the position of the body
     */
    update(delta){

        // accelerate
        if(this.acc[0] || this.acc[1]){
            this.vel[0] += (this.acc[0] * delta) / 400;
            this.vel[1] += (this.acc[1] * delta) / 400;
        }

        // move
        if(this.vel[0] || this.vel[1]){
            this.pos[0] += (this.vel[0] * delta) / 400;
            this.pos[1] += (this.vel[1] * delta) / 400;
            this.geometry.setPos(this.pos[0], this.pos[1]);
        }

        // TODO: apply rotation acceleration
        // TODO: apply rotation

        // TODO: apply friction
        // TODO: reduce small nums to zero

    }

}