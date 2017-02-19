/*global Engine*/
/**
 * Describes a Spritesheet
 * @constructor
 * @param {Image} texture the texture to use when rendering this sheet
 * @param {integer} tileWidth the width of each tile in pixels
 * @param {integer} tileHeight the height of each tile in pixels
 * @param {integer} padding the padding between each tile in pixels
 * @param {integer} margin - the space around the outside of the sheet in pixels
 * @returns {Engine.Body} instance
 */
Engine.Spritesheet = class Spritesheet {

	constructor(texture, tileWidth, tileHeight, padding, margin) {

		this.texture = texture;
		this.spritePositions = [];
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.padding = padding || 0;
		this.margin = margin || 0;

		this.calculatePositions();

	}


	/**
	 * Create the indexes.
	 */
	calculatePositions() {

		let y = 0;
		while(y * (this.padding + this.tileHeight) < this.texture.height - this.margin * 2){

			let x = 0;
			while(x * (this.padding + this.tileWidth) < this.texture.width - this.margin * 2){

				this.spritePositions.push([this.margin +  x * (this.tileWidth + this.padding), this.margin + y * (this.tileHeight + this.padding)]);
				x++;

			}

			y++;

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


	/**
	 * Get the properties for the current frame
	 */
	getRenderInfo(index){

		return {texture: this.texture, sx: this.spritePositions[index][0], sy: this.spritePositions[index][1], tileWidth: this.tileWidth, tileHeight: this.tileHeight};

	}

};