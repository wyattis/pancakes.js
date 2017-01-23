/*global Engine*/
Engine.Geometry = class{

    static intersects(a, b){

        if(a.geometry.type === Engine.RECTANGLE && b.geometry.type === Engine.RECTANGLE)
            return Engine.Geometry.rectsIntersect(a.geometry, b.geometry);
        else
            console.log('Unsupported geometry type');


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