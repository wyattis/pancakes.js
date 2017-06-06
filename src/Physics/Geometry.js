/*global Engine*/
/**
 * Holds the static logic for checking intersections
 */
Engine.Geometry = class{


    /**
     * Generic method to take two objects of any type and see if they intersect.
     * @param {Engine.Rectangle} a
     * @param {Engine.Rectangle} b
     * @returns boolean
     */
    static intersects(a, b){

        if(a.x !== undefined && a.y !== undefined && a.w !== undefined && a.h !== undefined){
            return Engine.Geometry.rectsIntersect(a, b);
        }
        else{
            console.error('Unsupported shape type');
        }

    }


    /**
     * Generic method to take a point and an object of any type and see if the object contains the point.
     * @param {Vector} point - The point to test. Must only have x and y properties to be considered a point.
     * @param {Engine.Rectangle} obj - The object that defines the container boundaries.
     * @returns boolean
     */
    static contains(point, obj){

        if(obj.x && obj.y && obj.w && obj.h)
            return Engine.Geometry.rectContains(point, obj);
        else{
            console.error("Unsupported container type");
        }

    }



    /**
     * Check if a rectangle contains a point.
     * @param {{x,y}} point - Holds the x and y positions for the point.
     * @param {Engine.Rectangle} rect - Holds the rectangle to check.
     */
    static rectContains(point, rect){

        return  point.x > rect.x &&
                point.x < rect.x + rect.w &&
                point.y > rect.y &&
                point.y < rect.y + rect.h;

    }



    /**
     * Check if two rectangles intersect
     */
    static rectsIntersect(a, b){

        return !(a.left >= b.right ||
           a.right <= b.left ||
           a.top >= b.bottom ||
           a.bottom <= b.top);

    }

};