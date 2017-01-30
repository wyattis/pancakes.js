/*global Engine Physics Body C*/
"use strict";
let game = Engine.game();
let bodies = [];
let physics = new Physics();

function init(){

    const dx = 40;
    const dy = 40;
    const h = 25;
    const w = 25;
    const numSide = 8;

    for(let x=0; x<numSide; x++){

        for(let y=0; y<numSide; y++){

            const rectangle = new Engine.Rectangle(x*dx, y*dy, w, h);
            const body = new Body(x*dx, y*dy, C.randomInt(0, 10), C.randomInt(0, 10));
            body.addGeometry(rectangle);
            physics.add(body);
            bodies.push(body);

        }

    }

}

function update(delta){

    physics.tick(delta);

    for(let body of bodies){

        body.update(delta);

    }

}


function render(ctx, delta){

    ctx.fillStyle = 'lightblue';
    for(let body of bodies){

        ctx.fillRect(body.geometry.x, body.geometry.y, body.geometry.width, body.geometry.height);

    }

}

game.add.screen('rect-test', {container: 'pancakes', load: ()=>{}, init: init, render: render, update: update});
game.play.screen('rect-test');