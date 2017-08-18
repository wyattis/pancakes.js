/**
 * Describes a custom event
 * @constructor
 * @param {string} name what kind of event is this?
 * @returns {Event} instance
 */
class Event{

    constructor(name){
        this.name = name;
        this.callbacks = [];
    }


    /**
     * Register a callback for this event
     * @param {function} cb the function to be called when this event fires
     */
    registerCallback(cb){

        this.callbacks.push(cb);

    }

}

export default Event;