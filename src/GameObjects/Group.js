/*global Engine*/
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