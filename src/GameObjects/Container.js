/*global Engine*/
/**
 * The base class for holding Sprites and other Containers.
 * @type Engine.Container
 * @param {Array} [members] - Any members that should be added to the container.
 */
Engine.Container = class Container{

	constructor(members){

		this.members = members || [];
		this.position = new Engine.Vector(0, 0);	// Relative position of the container
		this._position = new Engine.Vector(position.x, position.y); // Real position of the container
		this._needsUpdated = true

	}


	/**
	 * Setter for the position of this container. Using this method will make sure that the 
	 * children of this container are updated.
	 * @param {float} x - The x position of the container.
	 * @param {float} y - The y position of the container.
	 */
	setPos(x, y){

		this.position.x = x;
		this.position.y = y;
		this._needsUpdated = true;

	}


	/**
	 * Update the real position of this container as well as the real position of each child 
	 * member
	 * @param  {Engine.Vector} relativeTo - The position that this container should be 
	 * calculated relative to.
	 */
	updatePosition(relativeTo){

		if(this._needsUpdated){

			this._position.x = relativeTo.x + this.position.x;
			this._position.y = relativeTo.y + this.position.y;
			this._needsUpdated = false;

			let i = this.members.length;
			while(i--){
				this.members[i].updatePosition(this._position);
			}

		}

	}


	/**
	 * Add a member or members to the container
	 * @param {Engine.Container|Engine.Sprite|Array} member - The Sprite, Container, or Array 
	 * to add to this container.
	 */
	add(member){

		if(Array.isArray(member)){

			for(let m of member)
				this.add(m);

		}
		else if(member.position){
			// This is a sprite or container???
			this.add(member);

			if(member._needsUpdated !== undefined)
				member._needsUpdated = true

		}
		else{
			console.error("This doesn't appear to be a Sprite, Container or Array and can't be added to the Container");
		}

		this._needsUpdated = true;

	}

}