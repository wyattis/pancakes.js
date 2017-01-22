/*global Engine*/
class Collision{

    static collides(a, b){

        if(a.geometry === Engine.RECTANGLE && b.geometry === Engine.RECTANGLE)
            return Collision.rectCollides(a, b);

    }

    static rectCollides(a, b){

        return  a.left <= b.right &&
                b.left <= a.right &&
                b.top <= a.bottom &&
                a.top <= b.bottom;

    }

}