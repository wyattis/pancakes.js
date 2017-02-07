/*global Engine*/
"use strict";
let game = Engine.game({container: 'pancakes'});
let bodies = [];
let physics = new Engine.Physics();

function init(){

    const dx = 40;
    const dy = 40;
    const h = 25;
    const w = 25;
    const numSide = 20;

    for(let x=0; x<numSide; x++){

        for(let y=0; y<numSide; y++){

            const rectangle = new Engine.Rectangle(x*dx, y*dy, w, h);
            const body = new Engine.Body(x*dx, y*dy, Engine.C.randomInt(0, 50), Engine.C.randomInt(0, 50));
            body.addShape(rectangle);
            physics.add(body);
            bodies.push(body);

        }

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