/*global Engine Physics Body C*/
"use strict";
let game = Engine.game({container: 'pancakes'});
let bodies = [];
let physics = new Physics();

function init(){

    const dx = 40;
    const dy = 40;
    const h = 25;
    const w = 25;
    const numSide = 20;

    for(let x=0; x<numSide; x++){

        for(let y=0; y<numSide; y++){

            const rectangle = new Engine.Rectangle(x*dx, y*dy, w, h);
            const body = new Body(x*dx, y*dy, C.randomInt(0, 50), C.randomInt(0, 50));
            body.addGeometry(rectangle);
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

        ctx.fillRect(body.geometry.x, body.geometry.y, body.geometry.width, body.geometry.height);

    }

}

const screen = game.add.screen('rect-test', {load: ()=>{}, init: init, update: update});
screen.layers.get('default').setRender(render);
game.play.screen('rect-test');