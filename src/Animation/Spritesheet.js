/*global Engine*/
Engine.Spritesheet = class Spritesheet {

	constructor(texture, tileWidth, tileHeight, tilePadding) {

		this.texture = texture;
		this.spritePositions = [];
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tilePadding = tilePadding;

		this.calculatePositions();

	}


	/**
	 * Create the indexes.
	 */
	calculatePositions() {

		let numX = Math.floor(this.texture.width / this.tileWidth);
		let numY = Math.floor(this.texture.height / this.tileHeight);

		for (let y = 0; y < numY; y++) {
			for (let x = 0; x < numX; x++) {

				this.spritePositions.push([x * this.tileWidth, y * this.tileHeight]);

			}
		}

	}


	/**
	 * Render frame
	 */
	render(ctx, x, y, index, debug) {

		if(debug){
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
			ctx.fillStyle = "black";
			ctx.fillText(index.toString(), x + this.tileWidth / 2, y + this.tileHeight + 10);
		}
		let clippedPos = this.spritePositions[index];

		ctx.drawImage(this.texture, clippedPos[0], clippedPos[1], this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);

	}

};