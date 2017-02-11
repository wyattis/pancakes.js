/*global Engine*/
/**
 * Describes a collection of sprites to perform bulk operations on
 * @constructor
 * @param {array} arr any sprites to add to the Group initially
 * @returns Engine.Group
 */
Engine.Group = class Group{

    // TODO: Allow for sprites to be grouped together for rendering, updating, physics, etc.
    constructor(arr){

        this.members = arr || [];

    }


    /**
     * Enable physics on all members
     */
    enablePhysics(){

        let i = this.members.length;
        while(i--){
            this.members[i].enablePhysics();
        }

    }


    /**
     * Call collidesWith on each member of this group
     */
    collidesWith(what){

        let i = this.members.length;
        while(i--){
            this.members[i].collidesWith(what);
        }

    }


};