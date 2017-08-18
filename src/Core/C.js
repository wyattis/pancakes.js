/*global Engine*/
/**
 * This is a mathematics helper class
 */
Engine.C = class C{

    /**
     * Returns a random value between min (inclusive) and max (inclusive)
     */
    static random(min, max){

        return Math.random() * (max - min + 1) + min;

    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     */
    static randomInt(min, max){

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }


    /**
     * Returns an array of integers from min (inclusive) to max (exclusive)
     */
    static range(min, max){

        let l = [];
        for(let i=min; i < max; i++) l.push(i);
        return l;

    }


};