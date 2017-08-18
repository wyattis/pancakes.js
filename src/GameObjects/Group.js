import GroupFactory from './GroupFactory';

/**
 * Describes a collection of sprites to perform bulk operations on
 * @constructor
 * @param {Engine.Scene} scene Reference to the parent scene
 * @param {Engine.World} world Reference to the parent world
 * @param {array} arr any sprites to add to the Group initially
 * @returns {Engine.Group} instance
 */
class Group{

    // TODO: Allow for sprites to be grouped together for rendering, updating, physics, etc.
    constructor(scene, world, layer, arr){

        this.members = arr || [];
        this.add = new GroupFactory(scene, world, layer, this);

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


}

export default Group;