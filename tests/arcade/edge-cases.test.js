"use strict";
let expect = require('chai').expect;
let Pancakes = require('../../build/pancakes.test.js');
let physics;
let bodies;
let delta = (1/60);
let frames = 200;

const log = function(){};

describe('Rectangle single axis tests', function(){

    beforeEach(function(){

        physics = new Pancakes.Physics();
        bodies = [];

    });


    for(let playBackSpeed=.05; playBackSpeed < 2; playBackSpeed= Math.round((playBackSpeed + .05) * 100)/100){
        it('Should collide when barely touching at playBackSpeed of ' + playBackSpeed, function(){

            const a = new Pancakes.Body(150, 0, -30, 0);
            a.addGeometry(new Pancakes.Rectangle(0, 0, 100, 100));
            physics.add(a);

            const b = new Pancakes.Body(250, 0, -100, 0);
            b.addGeometry(new Pancakes.Rectangle(100, 0, 100, 100));
            physics.add(b);

            log('Initial:', a.vel, b.vel, a.pos, b.pos);

            for(let tick=0; tick<frames; tick++){
                physics.tick(delta * playBackSpeed);
                log('Tick:', tick, a.vel, b.vel, a.pos, b.pos);
                expect(a.vel.x).to.eql(-100, "X velocity wrong for body A after tick " + tick);
                expect(a.vel.y).to.eql(0, "Y velocity should not have changed after tick " + tick);
                expect(b.vel.x).to.eql(-30, "X velocity wrong for body B after tick " + tick);
            }

        });
    }

});