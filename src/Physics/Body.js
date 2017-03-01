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

        this.enabled = false;                       // physics are enabled
        this.fixed = false;                         // static body not affected by physics
        this.clamped = false;                       // there is a clamp on the bounds of pos?
        this.bouncy = false;                        // should the body bounce when it collides with the world bounds?
        this.dynamicScale = false;                  // indicates if the width of the shape needs recalculated with each update
        this.mass = 100;                            // mass of the body
        this.maxSpeed = 0;                          // the normalized maximum speed of the body
        this.friction = Object.create(null, {});    // friction of the body
        this.maxSpeed = Object.create(null, {});    // maximum speed of the body after normalization
        this.gravity = Object.create(null, {});     // vector representing the gravity on this body

        this.scale = new Engine.Vector(1, 1);       // the x and y scale of the body
        this.pos = new Engine.Vector(0, 0);         // position of the body
        this.lastPos = new Engine.Vector(0, 0);     // last position of the body
        this.vel = new Engine.Vector(0, 0);         // velocity of the body
        this.acc = new Engine.Vector(0, 0);         // acceleration of the body
        this.angle = 0;                             // angle of the body
        this.omega = 0;                             // angular rotation of the body
        this.alpha = 0;                             // angular acceleration of the body



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
        this._calculateSize();

    }


    /**
     * Recalculate the shape size based on the scale
     * @private
     */
    _calculateSize(){

        this.shape._width = this.shape.width * this.scale.x;
        this.shape._height = this.shape.height * this.scale.y;

        console.log('width', this.width, 'height', this.height);

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
     * @private
     */
    update(delta){

        // accelerate or apply friction
        if(this.acc.x || this.acc.y){

            this.vel.x += (this.acc.x * delta) / 400;
            this.vel.y += (this.acc.y * delta) / 400;

        }
        else{

            // Apply friction in the x and y directions
            if(this.friction.x){

                const FCX = (this.friction.x * delta);
                if(this.vel.x > 0){
                    this.vel.x -= FCX / 400;

                    if(this.vel.x < this._vel_tol)
                        this.vel.x = 0;
                }
                else{
                    this.vel.x += FCX / 400;

                    if(this.vel.x > -this._vel_tol)
                        this.vel.x = 0;
                }

            }

            if(this.friction.y){

                const FCY = (this.friction.y * delta);

                if(this.vel.y > 0){
                    this.vel.y -= FCY / 400;

                    if(this.vel.y < this._vel_tol)
                        this.vel.y = 0;
                }
                else{
                    this.vel.y += FCY / 400;

                    if(this.vel.y > -this._vel_tol)
                        this.vel.y = 0;
                }

            }

        }


        // Apply gravity
        if(this.gravity.x){

            this.vel.x += this.gravity.x * delta / 400;

        }
        if(this.gravity.y){

            this.vel.y += this.gravity.y * delta / 400;

        }


        // Normalize velocity and apply maximum speed
        if(this.normalizedMaxSpeed){

            const mag = this.vel.mag();
            if(mag > this.normalizedMaxSpeed){

                this.vel.x *= this.normalizedMaxSpeed / mag;
                this.vel.y *= this.normalizedMaxSpeed / mag;

            }

        }


        // Direction specific maxSpeeds
        if(this.maxSpeed.x){

            if(this.vel.x > this.maxSpeed.x)
                this.vel.x = this.maxSpeed.x;
            else if(this.vel.x < -this.maxSpeed.x)
                this.vel.x = -this.maxSpeed.x;

        }
        if(this.maxSpeed.y){

            if(this.vel.y > this.maxSpeed.y)
                this.vel.y = this.maxSpeed.y;
            else if(this.vel.y < -this.maxSpeed.y)
                this.vel.y = -this.maxSpeed.y;

        }


        // Add the velocity to the position
        if(this.vel.x || this.vel.y){
            this.pos.x += (this.vel.x * delta) / 400;
            this.pos.y += (this.vel.y * delta) / 400;
            this.shape.setPos(this.pos.x, this.pos.y);
        }


        if(this.dynamicScale)
            this._calculateSize();


        // TODO: apply rotation acceleration
        // TODO: apply rotation


        // Normalize the angle
        if(this.angle)
            this.angle = this.angle % Math.PI;
    }

};