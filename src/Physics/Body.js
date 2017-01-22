/*global Engine*/
class Body{

    constructor(x, y, vx, vy){

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

        this.geometry = Engine.RECTANGLE;

    }

    /**
     * Setter for position
     */
    setPos(x, y){

        this.pos = [x, y];

    }

    /**
     * Setter for velocity
     */
    setVel(x, y){

        this.vel = [x, y];

    }

    /**
     * Setter for acceleration
     */
    setAcc(x, y){

        this.acc = [x, y];

    }

}