import Event from './Event';

/**
 * Custom event registrar. Handles registering and dispatching custom events.
 * @constructor
 * @returns {Reactor} instance
 */
class Reactor{

    constructor(){

        this.events = new Map();

    }


    /**
     * Add event listener
     */
    on(eventName, cb, opts){

        this.events.get(eventName).registerCallback(cb, opts);

    }


    /**
     * Let the Reactor know that an event exists
     */
    register(eventName){

        let event = new Event(eventName);
        this.events.set(eventName, event);

    }


    /**
     * Unregister an event
     */
    unregister(eventName){

        this.events.delete(eventName);

    }


    /**
     * Dispatch an instance of the specified event
     */
    dispatch(eventName, eventArgs){

        const cbs = this.events.get(eventName).callbacks;
        let l = cbs.length;
        while(l--){
            cbs[l](eventArgs);
        }

    }

}


export default Reactor;