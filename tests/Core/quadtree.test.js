"use strict";
let expect = require('chai').expect;
let Pancakes = require('../../public/build/pancakes.test.js');


// Create wrapper functions to keep track of internal calls
let splitCount = 0;
Pancakes.QuadTree.prototype.split = Pancakes.QuadTree.prototype._split;
Pancakes.QuadTree.prototype._split = function(){splitCount++; this.split()};



// Array of objects
const objs = [{x: 0, y: 0, w: 100, h:100}, {x:190, y: 20, w: 100, h: 100}, {x:190, y: 190, w: 100, h: 100}, {x:20, y: 190, w: 100, h: 100}];



describe('Insert', function(){

    let tree;

    // Create an empty tree before each test
    beforeEach(function(){

        splitCount = 0;
        tree = new Pancakes.QuadTree(0, 0, 360, 360);

    });


    it('uses prototype wrappers correctly', function(){

        tree._split();
        expect(splitCount).to.equal(1, "The split wrapper isn't working");

    });


    it('inserts from an array correctly', function(){

        tree.insert(objs);
        expect(splitCount).to.equal(0, "The tree should not have split");
        expect(tree.nodes).to.be.undefined;
        expect(tree.children.length).to.equal(objs.length, "The array was not added correctly");

    });


    it('inserts single objects correctly', function(){

        tree.insert({x:1, y:2, w:3, h:4});

        expect(splitCount).to.equal(0, "The tree should not have split");
        expect(tree.nodes).to.be.undefined;
        expect(tree.children.length).to.equal(1, "The object was not added as a child correctly");

    });


    it('inserts 4 without subdivision', function(){

        tree.insert({x:10, y: 20, w: 100, h: 100});
        tree.insert({x:190, y: 20, w: 100, h: 100});
        tree.insert({x:190, y: 190, w: 100, h: 100});
        tree.insert({x:20, y: 190, w: 100, h: 100});

        expect(splitCount).to.equal(0, "The tree split when it shouldn't have");
        expect(tree.nodes).to.be.undefined;
        expect(tree.children.length).to.equal(4);

    });


    it('subdivides when 5 objects are inserted', function(){

        tree.insert({x:10, y: 20, w: 100, h: 100});
        tree.insert({x:190, y: 20, w: 100, h: 100});
        tree.insert({x:190, y: 190, w: 100, h: 100});
        tree.insert({x:20, y: 190, w: 100, h: 100});
        tree.insert({x:20, y: 190, w: 100, h: 100});

        expect(splitCount).to.equal(1, "The tree did not call split");
        expect(tree.nodes).to.not.eql(undefined, "The QuadTree did not subdivide when it exceeded maxChildren");
        expect(tree.nodes.length).to.equal(4, "The QuadTree should subdivide into 3 nodes");
        // expect(tree.children.length).to.equal(4);

    });


    it('subdivides twice when 9 objects are inserted into quadrant III', function(){

        for(let i=0; i<9; i++)
            tree.insert({x:0, y:0, w:100, h:100});

        // expect(splitCount).to.equal(2, "The tree did not split twice");
        expect(tree.nodes.length).to.equal(4, "The tree did not split into 4 nodes");
        expect(tree.nodes[0].nodes).to.not.equal(undefined, "The second layer did not subdivide correctly");
        expect(tree.nodes[0].nodes[0].children.length).to.equal(1, "The tree did not split correctly");

    });

});



describe("Retrieve", function(){

    let tree;

    // Create an empty tree before each test
    beforeEach(function(){

        splitCount = 0;
        tree = new Pancakes.QuadTree(0, 0, 360, 360);

    });


    it('gets 4 objects when 4 are inserted', function(){

        tree.insert({x:10, y: 20, w: 100, h: 100});
        tree.insert({x:190, y: 20, w: 100, h: 100});
        tree.insert({x:190, y: 190, w: 100, h: 100});
        tree.insert({x:20, y: 190, w: 100, h: 100});

        let nearby = tree.nearby({x:5, y:5, w:30, h: 30});
        expect(nearby.length).to.equal(4, "All 4 nearby objects were not returned");
        expect(nearby.sort((a, b) => a.x + a.y > b.x + b.y));

    });


    it("gets 1 object when 5 are inserted and 2 are inserted into the same place", function(){

        tree.insert(objs);
        tree.insert(Object.assign({}, objs[0]));

        let nearby = tree.nearby(objs[2]);
        expect(nearby).to.not.be.undefined;
        expect(nearby.length).to.equal(1, "Too many objects were returned");

    });

});