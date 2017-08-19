import Engine from '../Engine';

/**
 * Holds the static logic for checking intersections
 */
class Geometry{


    /**
     * Generic method to take two objects of any type and see if they intersect.
     */
    static intersects(a, b){

        if(a.shape.type === Engine.RECTANGLE && b.shape.type === Engine.RECTANGLE){
            return Geometry.rectsIntersect(a.shape, b.shape);
        }
        else{
            console.error('Unsupported shape type');
        }

    }



    /**
     * Check if a rectangle contains a point.
     * @param {{x,y}} point - Holds the x and y positions for the point.
     * @param {Engine.Rectangle} rect - Holds the rectangle to check.
     */
    static rectContains(point, rect){

        return  point.x > rect.left &&
                point.x < rect.right &&
                point.y > rect.top &&
                point.y < rect.bottom;

    }



    /**
     * Check if two rectangles intersect
     */
    static rectsIntersect(a, b){

        return !(a.left > b.right ||
           a.right < b.left ||
           a.top > b.bottom ||
           a.bottom < b.top);

    }

}

export default Geometry;