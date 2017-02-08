/*global Engine*/
Engine.Body = class Body{

    constructor(x, y, vx, vy){

        this.enabled = false;   // physics are enabled
        this.fixed = false;     // static body not affected by physics
        this.clamped = false;   // there is a clamp on the bounds of pos?
        this.mass = 100;        // mass of the body
        this.friction = 0;      // friction of the body
        this.maxSpeed = 0;      // maximum speed of the body after normalization

        this.pos = new Engine.Vector(0, 0);     // position of the body
        this.lastPos = new Engine.Vector(0, 0); // last position of the body
        this.vel = new Engine.Vector(0, 0);     // velocity of the body
        this.acc = new Engine.Vector(0, 0);     // acceleration of the body
        this.angle = 0;                         // angle of the body
        this.omega = 0;                         // angular rotation of the body
        this.alpha = 0;                         // angular acceleration of the body


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