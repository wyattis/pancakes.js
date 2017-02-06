/*global Engine*/
Engine.Reactor = class Reactor{

    constructor(){
        this.events = new Map();
    }


    /**
     * Let the Reactor know that an event exists
     */
    register(eventName){

        let event = new Engine.Event(eventName);
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

};