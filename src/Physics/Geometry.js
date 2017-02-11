/*global Engine*/
/**
 * Holds the static logic for checking intersections
 */
Engine.Geometry = class{

    static intersects(a, b){

        if(a.shape.type === Engine.RECTANGLE && b.shape.type === Engine.RECTANGLE){
            return Engine.Geometry.rectsIntersect(a.shape, b.shape);
        }
        else{
            console.error('Unsupported shape type');
        }


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

};