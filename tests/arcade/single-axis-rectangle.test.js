"use strict";
let expect = require('chai').expect;
let Pancakes = require('../../build/pancakes.test.js');
let physics;
let bodies;
let delta = (1/60);
let frames = 200;

describe('Rectangle single axis tests', function(){

    beforeEach(function(){

        physics = new Pancakes.Physics();
        bodies = [];

    });


    for(let playBackSpeed=.05; playBackSpeed<2; playBackSpeed= Math.round((playBackSpeed + .05) * 100)/100){


        it('Small velocity difference for x axis at playBackSpeed of ' + playBackSpeed, function(){

            const a = new Pancakes.Body(0, 0, 10, 0);
            a.addGeometry(new Pancakes.Rectangle(0, 0, 100, 100));
            physics.add(a);

            const b = new Pancakes.Body(100, 0, 9, 0);
            b.addGeometry(new Pancakes.Rectangle(100, 0, 100, 100));
            physics.add(b);

            for(let tick=0; tick<frames; tick++){
                physics.tick(delta * playBackSpeed);
                expect(a.vel.x).to.eql(9, "X velocity wrong for body A after tick: " + tick);
                expect(a.vel.y).to.eql(0, "Y velocity should not have changed after tick: " + tick);
                expect(b.vel.x).to.eql(10, "X velocity wrong for body B after tick: " + tick);
            }

        });



        it('Small velocity difference for y axis at playBackSpeed of ' + playBackSpeed, function(){

            const a = new Pancakes.Body(0, 0, 0, 9.2);
            a.addGeometry(new Pancakes.Rectangle(0, 0, 100, 100));
            physics.add(a);

            const b = new Pancakes.Body(0, 100, 0, 9);
            b.addGeometry(new Pancakes.Rectangle(0, 100, 100, 100));
            physics.add(b);


            for(let tick=0; tick<frames; tick++){
                physics.tick(delta * playBackSpeed);
                expect(a.vel.y).to.eql(9, "Y velocity wrong for body A after tick: " + tick);
                expect(a.vel.x).to.eql(0, "X velocity should not have changed after tick: " + tick);
                expect(b.vel.y).to.eql(9.2, "Y velocity wrong for body B after tick: " + tick);
            }
        });


        // it('Large velocity difference for x axis at playBackSpeed of ' + playBackSpeed', function(){

        //     const a = new Pancakes.Body(0, 0, 3500000, 0);
        //     a.addGeometry(new Pancakes.Rectangle(0, 0, 100, 100));
        //     physics.add(a);

        //     const b = new Pancakes.Body(100, 0, 0, 0);
        //     b.addGeometry(new Pancakes.Rectangle(100, 0, 100, 100));
        //     physics.add(b);

        //     console.log(a.vel, a.pos);
        //     physics.tick(delta * playBackSpeed);
        //     console.log(a.vel, a.pos);

        //     expect(a.vel.x).to.eql(9, "X velocity wrong for body A");
        //     expect(a.vel.y).to.eql(0, "Y velocity should not have changed");
        //     expect(b.vel.x).to.eql(3500000, "X velocity wrong for body B");

        // });


        // it('Large velocity difference for y axis at playBackSpeed of ' + playBackSpeed', function(){

        //     const a = new Pancakes.Body(0, 0, 0, 3500000);
        //     a.addGeometry(new Pancakes.Rectangle(0, 0, 100, 100));
        //     physics.add(a);

        //     const b = new Pancakes.Body(100, 0, 0, 0);
        //     b.addGeometry(new Pancakes.Rectangle(100, 0, 100, 100));
        //     physics.add(b);

        //     console.log(a.vel, a.pos);
        //     physics.tick(delta * playBackSpeed);
        //     console.log(a.vel, a.pos);

        //     expect(a.vel.y).to.eql(9, "X velocity wrong for body A");
        //     expect(a.vel.x).to.eql(0, "Y velocity should not have changed");
        //     expect(b.vel.y).to.eql(3500000, "X velocity wrong for body B");

        // });
    }

});