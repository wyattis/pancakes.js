/*global Engine*/
/**
 * Describes a physics body
 * @constructor
 * @param {float} x the initial x position of the body in pixels
 * @param {float} y the initial y position of the body in pixels
 * @param {float} vx the initial x velocity of the body in units per second
 * @param {float} vy the initial y velocity of the body in units pixels per second
 * @returns {Engine.Body} instance
 */
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


        this._collisionBodies = new Set();      // Holds the bodies that this body collides with

        if(vx || vy)
            this.setVel(vx, vy);

        if(x || y)
            this.setPos(x, y);

        // Private values
        this._vel_tol = 1e-2; // The tolerance at which to call a velocity 0

    }


    /**
     * Specify another body that this body collides with. This uses duck typing
     * to determine if the object/array passed in is valid.
     */
    collidesWith(whatWeAreCollidingWith){

        if(!whatWeAreCollidingWith)
            throw Error('collidesWith must have an argument that is a Body, Sprite, Array or Group');


        // This if/else block is used to coerce any of the supported types into a
        // single body that can be added to the private _collisionBodies Set().
        // This results in recursive calls for Groups and Arrays that are passed
        // into this method.
        if(whatWeAreCollidingWith.pos && whatWeAreCollidingWith.vel){
            // We have a Body object

            if(whatWeAreCollidingWith !== this)
                this._collisionBodies.add(whatWeAreCollidingWith);

        }
        else if(whatWeAreCollidingWith.body && whatWeAreCollidingWith.body.pos && whatWeAreCollidingWith.body.vel){
            // We have a Sprite instance

            if(whatWeAreCollidingWith.body !== this)
                this._collisionBodies.add(whatWeAreCollidingWith.body);

        }
        else if(Array.isArray(whatWeAreCollidingWith.members)){
            // We have a Group object

            let i=whatWeAreCollidingWith.members.length;
            while(i--){
                this.collidesWith(whatWeAreCollidingWith.members[i]);
            }

        }
        else if(Array.isArray(whatWeAreCollidingWith)){
            // We have an Array

            let i=whatWeAreCollidingWith.length;
            while(i--){
                this.collidesWith(whatWeAreCollidingWith[i]);
            }

        }
        else{
            // We don't have any of the supported types

            throw Error('collidesWith must be passed a Body, Sprite, Array or Group');

        }


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