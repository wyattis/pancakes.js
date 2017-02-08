/*global Engine*/
Engine.Tween = class Tween{

    constructor(ref, desired, type){

        this.ref = ref;               // Array of references to the values we want to change
        this.desired = desired; // Array of their desired values
        this.type = type || Engine.Tween.EASE_OUT;
        this.finished = false;
        this.speed = 1/10;
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
        if(this.type === Engine.Tween.EASE_OUT){

            this.ref.x = Engine.Tween.easeOut(this.ref.x, this.desired.x, diffX, this.speed);
            this.ref.y = Engine.Tween.easeOut(this.ref.y, this.desired.y, diffY, this.speed);

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

    }


    /**
     * Static ease out method
     */
    static easeOut(from, to, diff, speed){

        return from + diff * speed;

    }

};


Engine.Tween.EASE_OUT = 0;