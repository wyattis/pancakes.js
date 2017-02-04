/*global Engine*/
const game = Engine.game();
const physics = new Physics();
let bodies = [];
let screen = game.add.screen('keyboard-friction', {init: init, update: update});
let layer = screen.layers.get('default');
layer.setRender(render);
game.play.screen('keyboard-friction');
const w = 25;
const h = 25;

let drawVelocityVectors = true;
let playbackSpeedRatio = .5;

// Interaction helpers with DOM
function setVal(id, val){
    document.getElementById(id).value = val;
}
function getVal(id){
    return parseFloat(document.getElementById(id).value, 10);
}

setVal('ax', game.width/2 - w/2);
setVal('ay', game.height/2 - h/2);
setVal('bx', game.width/2 - w/2 + 55);
setVal('by', game.height/2 - h/2 - 20);

setVal('avx', -30);
setVal('avy', 0);
setVal('bvx', -100);
setVal('bvy', 00);

setVal('speed', playbackSpeedRatio * 100);

function set(){

    bodies[0].setPos(getVal('ax'), getVal('ay'));
    bodies[1].setPos(getVal('bx'), getVal('by'));
    bodies[0].setVel(getVal('avx'), getVal('avy'));
    bodies[1].setVel(getVal('bvx'), getVal('bvy'));

    playbackSpeedRatio = getVal('speed') / 100;

}


function init(){

    for(let i=0; i<2; i++){
        const body = new Body(0, 0, 0, 0);
        // body.friction = 30;
        body.maxSpeed = 100;
        body.addGeometry(new Engine.Rectangle(0, 0, w, h));
        physics.add(body);
        bodies.push(body);
    }
    set();

}

function update(delta){

    physics.tick(delta * playbackSpeedRatio);

}

function render(ctx){

    ctx.fillStyle = "brown";
    ctx.fillRect(bodies[0].geometry.x, bodies[0].geometry.y, bodies[0].geometry.width, bodies[0].geometry.height);

    ctx.fillStyle = "lightblue";
    ctx.fillRect(bodies[1].geometry.x, bodies[1].geometry.y, bodies[1].geometry.width, bodies[1].geometry.height);

    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#ff0000";
    if(drawVelocityVectors){
        for(let body of bodies){
            body.vel.draw({x: body.geometry.centerX, y: body.geometry.centerY}, ctx);
        }
    }
}