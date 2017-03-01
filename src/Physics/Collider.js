/*global Engine*/
/**
 * Base object for classical mechanics calculations.
 * @type Engine.Collider
 * @param  {float} x - The x position of the collider
 * @param  {float} y - The y position of the collider
 * @param  {Engine.Rectangle} [shape] - The shape of the collider
 */
Engine.Collider = class Collider{

    constructor(x, y, shape){

        this.destroyed = true;
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

        this.scale = new Engine.Vector(1, 1);

        this.pos = new Engine.Vector(x, y);
        this.vel = new Engine.Vector(0, 0);
        this.acc = new Engine.Vector(0, 0);

        this.angle = 0;
        this.omega = 0;
        this.alpha = 0;

        this.shape = shape;


        // Private values
        this._collisionBodies = new Set();
        this._vel_tol = 1e-2; // The tolerance at which to call a velocity 0

    }

    /**
     * Have this collider use the sprite position and scale vectors instead of its own.
     * @param  {Engine.Sprite} sprite - The sprite that this collider should reference.
     */
    reference(sprite){

    	this.pos = sprite.pos;
    	this.scale = sprite.scale;

    }

    /**
     * Perform classical mechanics on this collider.
     * @param  {float} delta - Milliseconds since the last update
     */
    update(delta){



    }


    /**
     * Set the position of the collider.
     * @param {float} x - The x position in pixels
     * @param {float} y - The y position in pixels
     */
    setPos(x, y){

        this.pos.x = x;
        this.pos.y = y;

    }


    /**
     * Set the velocity of the collider.
     * @param {float} x - The x velocity
     * @param {float} y - The y velocity
     */
    setVel(x, y){

        this.pos.x = x;
        this.pos.y = y;

    }


    /**
     * Set the acceleration of the collider.
     * @param {float} x - The x acceleration
     * @param {float} y - The y acceleration
     */
    setAcc(x, y){

        this.acc.x = x;
        this.acc.y = y;

    }

};