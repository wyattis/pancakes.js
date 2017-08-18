/**
 * Describes a Tween object that can be used to change properties of an object using different easing functions
 * @constructor
 * @param {Object} ref a reference to the object whose properties should change
 * @param {Object} desired a reference to the desired properties of the object
 * @param {Engine.Tween.EASE_OUT} type the type of easing function to use with this tween
 * @returns {Engine.Tween} instance
 */
class Tween{

    constructor(ref, desired, type){

        this.ref = ref;               // Array of references to the values we want to change
        this.desired = desired; // Array of their desired values
        this.type = type || Tween.EASE_OUT;
        this.roundToPixel = false;
        this.finished = false;
        this.speed = 1/15;
        this.tolerance = 1e-3;

    }


    /**
     * Update the position based on the specified tweening function
     */
    update(delta){

        const diffX = this.desired.x - this.ref.x;
        const diffY = this.desired.y - this.ref.y;

        // If we are there already it should just return
        if(this.diffX === 0) return;


        // Perform the different tweens
        if(this.type === Tween.EASE_OUT){

            if(this.roundToPixel){
                this.ref.x = Math.round(Tween.easeOut(this.ref.x, this.desired.x, diffX, this.speed));
                this.ref.y = Math.round(Tween.easeOut(this.ref.y, this.desired.y, diffY, this.speed));
            }
            else{
                this.ref.x = Tween.easeOut(this.ref.x, this.desired.x, diffX, this.speed);
                this.ref.y = Tween.easeOut(this.ref.y, this.desired.y, diffY, this.speed);
            }

        }
        else {

            // TODO: additional tweening methods

        }


        // Check if we're within the position tolerance for the x direction
        if(diffX < this.tolerance && diffX > -this.tolerance)
            this.ref.x = this.desired.x;

        // Check if we're within the position tolerance for the y direction
        if(diffY < this.tolerance && diffY > -this.tolerance)
            this.ref.y = this.desired.y;

    }



    /**
     * Set the desired value for this tween
     */
    setTo(desired){

        this.desired = desired;

        if(this.roundToPixel){
            this.desired.x = Math.round(this.desired.x);
            this.desired.y = Math.round(this.desired.y);
        }

    }


    /**
     * Static ease out method
     */
    static easeOut(from, to, diff, speed){

        return from + diff * speed;

    }

}


Tween.EASE_OUT = 0;


export default Tween;