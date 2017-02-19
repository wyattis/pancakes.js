/*global Engine*/
Engine.TilesheetLoader = class TilesheetLoader{

    constructor(add, cache){

        this.add = add;
        this.cache = cache;

    }


    /**
     * Turn a Tiled JSON export into groups for each layer.
     * @param {string} cacheKey - The JSON key in the cache.
     * @param {Engine.Spritesheet} spritesheet - The spritesheet to use when converting into Groups.
     * @param {boolean} [useProperties=true] - Use properties supplied for each layer to create spritesheet.
     */
    fromTiled(cacheKey, spritesheetKey, useProperties){

        let map = this.cache.use(cacheKey);
        let spritesheet = this.cache.use(spritesheetKey);
        let groups = [];

        for(let layer of map.layers){

            let group = this.add.group();
            for(let index in layer.data){

                let tileIndex = layer.data[index];
                if(tileIndex > 0){
                    let pos = this._getTilePosition(index, layer.width, layer.height, map.tilewidth, map.tileheight);
                    // console.log('tile:', tileIndex, pos.x/map.tilewidth, pos.y/map.tileheight);
                    let sprite = group.add.sprite(pos.x, pos.y);
                    sprite.add.animation('sitting', spritesheetKey, [tileIndex - 1], 0);
                }
            }

            group.enablePhysics();
            groups.push(group);

        }

        return groups;

    }



    /**
     * Get the position vector from array of tiles.
     * @private
     */
    _getTilePosition(index, numCols, numRows, tileWidth, tileHeight){

        let indexRow = Math.floor(index / numCols);
        let indexCol = index % numCols;

        return new Engine.Vector(indexCol * tileWidth, indexRow * tileHeight);

    }

};