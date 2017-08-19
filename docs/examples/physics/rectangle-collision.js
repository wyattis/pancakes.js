/*global pancakes*/
"use strict";
let game = pancakes.Engine.game({container: 'pancakes'});
let bodies = [];
let physics = new pancakes.Physics();

function init(){

    const dx = 40;
    const dy = 40;
    const h = 25;
    const w = 25;
    const numSide = 20;

    for(let x=0; x<numSide; x++){

        for(let y=0; y<numSide; y++){

            const rectangle = new pancakes.Rectangle(x*dx, y*dy, w, h);
            const body = new pancakes.Body(x*dx, y*dy, pancakes.C.randomInt(0, 50), pancakes.C.randomInt(0, 50));
            body.enabled = true;
            body.addShape(rectangle);
            physics.add(body);
            bodies.push(body);
        }

    }

    for(let body of physics.bodies){

        body.collidesWith(physics.bodies);
        // body.enabled = true;

    }

}

function update(delta){

    physics.tick(delta);

}


function render(ctx, delta){

    ctx.fillStyle = 'lightblue';
    for(let body of bodies){

        ctx.fillRect(body.shape.x, body.shape.y, body.shape.width, body.shape.height);

    }

}

const scene = game.add.scene('rect-test', {load: ()=>{}, init: init, update: update});
scene.layers.get('default').setRender(render);
game.play.scene('rect-test');