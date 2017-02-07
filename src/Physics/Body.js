/*global Engine*/
Engine.Body = class Body{

    constructor(x, y, vx, vy){

        this.enabled = true;
        this.fixed = false;
        this.mass = 100;
        this.friction = 0;
        this.maxSpeed = 0;

        this.pos = new Engine.Vector(0, 0);
        this.lastPos = new Engine.Vector(0, 0);
        this.vel = new Engine.Vector(0, 0);
        this.acc = new Engine.Vector(0, 0);
        this.angle = 0;
        this.omega = 0;
        this.alpha = 0;


        if(vx || vy)
            this.setVel(vx, vy);

        if(x || y)
            this.setPos(x, y);

        // Private values
        this._vel_tol = 1e-2; // The tolerance at which to call a velocity 0

    }


    /**
     * Add a shape supported by the physics engine
     */
    addShape(shape){

        this.shape = shape;

    }


    /**
     * Setter for position
     */
    setPos(x, y){

        this.pos.x = x;
        this.pos.y = y;
        if(this.shape) this.shape.setPos(x, y);

    }


    /**
     * Setter for velocity
     */
    setVel(x, y){

        if(x !== undefined)
            this.vel.x = x;
        if(y !== undefined)
            this.vel.y = y;

    }


    /**
     * Setter for acceleration
     */
    setAcc(x, y){

        this.acc.x = x;
        this.acc.y = y;

    }


    /**
     * Update the position of the body
     */
    update(delta){

        // accelerate or apply friction
        if(this.acc.x || this.acc.y){
            this.vel.x += (this.acc.x * delta) / 400;
            this.vel.y += (this.acc.y * delta) / 400;
        }
        else{

            const FC = (this.friction * delta);
            if(this.vel.x > 0){
                this.vel.x -= FC / 400;

                if(this.vel.x < this._vel_tol)
                    this.vel.x = 0;
            }
            else{
                this.vel.x += FC / 400;

                if(this.vel.x > -this._vel_tol)
                    this.vel.x = 0;
            }

            if(this.vel.y > 0){
                this.vel.y -= FC / 400;

                if(this.vel.y < this._vel_tol)
                    this.vel.y = 0;
            }
            else{
                this.vel.y += FC / 400;

                if(this.vel.y > -this._vel_tol)
                    this.vel.y = 0;
            }

        }

        // Normalize velocity and apply maximum speed
        if(this.maxSpeed){

            const mag = this.vel.mag();
            if(mag > this.maxSpeed){

                this.vel.x *= this.maxSpeed / mag;
                this.vel.y *= this.maxSpeed / mag;

            }

        }

        // move
        if(this.vel.x || this.vel.y){
            this.pos.x += (this.vel.x * delta) / 400;
            this.pos.y += (this.vel.y * delta) / 400;
            this.shape.setPos(this.pos.x, this.pos.y);
        }

        // TODO: apply rotation acceleration
        // TODO: apply rotation

    }

};