/*global Engine*/


/**
 * This is a mathematics helper class
 */
Engine.C = class Calculate{
    
    static range(min, max){
        
        let l = [];
        for(let i=min; i < max; i++) l.push(i);
        return l;
        
    }
    
};