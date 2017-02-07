/*global Engine*/
Engine.Event = class Event{

    constructor(name){
        this.name = name;
        this.callbacks = [];
    }


    /**
     * Register a callback for this event
     */
    registerCallback(cb, opts){

        this.callbacks.push(cb);

    }

};