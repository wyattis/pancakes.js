/*global Engine*/
/**
 * Will someday help simplify collision checking by minimizing the number of checks we are making
 * @constructor
 */
Engine.QuadTree = class QuadTree{

    constructor(x, y, w, h, maxDepth, maxChildren, depth){

        this.bounds = {
            x: x,
            y: y,
            w: w,
            h: h
        };
        this.maxDepth = maxDepth | 5;
        this.maxChildren = maxChildren | 4;
        this.depth = 0;
        this.children = [];
        this.nodes;     // Holds an array of sub quadrants in the order III, II, IV, I

    }

    /**
     * Insert one or many items at once. This will add an object to the quadtree and create any additional nodes.
     * @param {Object|Array} o - The object(s) to insert into the QuadTree
     */
    insert(o){

        if(Array.isArray(o)){
            let i=o.length;
            while(i--)
                this.insert(o[i]);
        }
        else{

            if(Engine.Geometry.intersects(this.bounds, o)){
                this.children.push(o);
            }

            // We have too many children in this node.
            if(this.children.length > this.maxChildren && this.depth < this.maxDepth){

                // console.log(this.depth, this.maxDepth);

                // Let's create more subnodes since we haven't already done that
                if(!this.nodes)
                    this._split();

                // Insert into child nodes
				let n = this.nodes.length;
                while(n--){
                    if(Engine.Geometry.intersects(this.nodes[n].bounds, o))
                        this.nodes[n].insert(o);
                }


            }

        }

    }


    /**
     * Get nearby objects in the quadtree.
     * @param {Object} obj - The object to find nearby objects for.
     */
    nearby(obj){

        if(this.nodes){

            // TODO:
            if(obj.x < this.nodes[0].x + this.nodes[0].w){

            }

        }
        else{
            return this.children;
        }

    }


    /**
     * Splits the QuadTree into 4 quadrants and redistributes the children throughout those nodes.
     * @private
     */
    _split(){

        let newWidth = this.bounds.w / 2;
        let newHeight = this.bounds.h / 2;
        let x=2;
        let y;


        // Divide this tree into 4 even nodes
        this.nodes = [];
        while(x--){
            y=2;
            while(y--){
                this.nodes.push(new QuadTree(this.bounds.x + x * newWidth, this.bounds.y + y * newHeight, newWidth, newHeight, this.maxDepth, this.maxChildren, this.depth + 1));
            }
        }


        // TODO: Distribute children to the subnodes as well


    }

};