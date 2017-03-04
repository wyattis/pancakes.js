/*global Engine*/
/**
 * The base class for holding Sprites and other Containers.
 * @type Engine.Container
 * @param {Array} [members] - Any members that should be added to the container.
 */
Engine.Container = class Container{

	constructor(members){

		this.members = members || [];
		this.position = new Engine.Vector(0, 0); // Relative position of the container

		this._position = new Engine.Vector(this.position.x, this.position.y);	// Real position of the container
		this._needsUpdated = true;
		this._relativeTo = new Engine.Vector(0, 0); // Position to set real position relative to

	}


	/**
	 * Set the position that this Container should be relative to.
	 *
	 * @param {Engine.Vector} relativeTo=(0, 0) - The vector position that this Container should be positioned relative to.
	 */
	setRelativeTo(relativeTo){

		this._relativeTo = relativeTo;

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
	update(delta){

		if(this._needsUpdated){

			this._position.x = this._relativeTo.x + this.position.x;
			this._position.y = this._relativeTo.y + this.position.y;

		}

		// Update all children
		let i = this.members.length;
		while(i--){

			if(this._needsUpdated){
				this.members[i].setRelativeTo(this._position);
			}
			this.members[i].update(delta);

		}

		this._needsUpdated = false;
		this.position._hasChanged = false;
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

			// TODO: This is a sprite or container???
			if(member !== this)
				this.members.push(member);

			if(member._needsUpdated !== undefined)
				member._needsUpdated = true;

		}
		else{
			console.error("This doesn't appear to be a Sprite, Container or Array and can't be added to the Container");
		}

		this._needsUpdated = true;

	}

};