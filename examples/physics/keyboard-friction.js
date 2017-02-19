/*global Engine*/
const game = Engine.game({container: 'pncks'});
const physics = new Engine.Physics();
const ACC = 150;
let player;
let bodies = [];
let scene = game.add.scene('keyboard-friction', {init: init, update: update});
scene.layers.get('default').setRender(render);
game.play.scene('keyboard-friction');


function init(){

    player = new Engine.Body(200, 200);
    player.enabled = true;
    player.friction = new Engine.Vector(40, 40);
    player.maxSpeed = 200;
    player.addShape(new Engine.Rectangle(200, 200, 10, 10));
    physics.add(player);


    const w = 25;
    const h = 25;
    const dx = 2*w;
    const dy = 2*h;
    const count = 4;

    for(let x=0; x<count; x++){
        for(let y=0; y<count; y++){
                const body = new Engine.Body(x*dx, y*dy, 0, 0);
                body.enabled = true;
                body.friction = 30;
                body.maxSpeed = 100;
                body.addShape(new Engine.Rectangle(x*dx, y*dy, w, h));
                physics.add(body);
                bodies.push(body);
        }
    }

    for(let body of bodies){
        body.collidesWith(bodies);
    }

    player.collidesWith(bodies);
}

function update(delta){

    // Up and down input
    if(game.input.keyboard.keys.UP.isDown){
        player.acc.y = -ACC;
    }
    if(game.input.keyboard.keys.DOWN.isDown){
        player.acc.y = ACC;
    }
    if(game.input.keyboard.keys.UP.isUp && game.input.keyboard.keys.DOWN.isUp){
        player.acc.y = 0;
    }


    // Left and right input
    if(game.input.keyboard.keys.LEFT.isDown){
        player.acc.x = -ACC;
    }
    if(game.input.keyboard.keys.RIGHT.isDown){
        player.acc.x = ACC;
    }
    if(game.input.keyboard.keys.LEFT.isUp && game.input.keyboard.keys.RIGHT.isUp){
        player.acc.x = 0;
    }

    physics.tick(delta);

}

function render(ctx){

    ctx.fillStyle = "brown";
    ctx.fillRect(player.shape.x, player.shape.y, player.shape.width, player.shape.height);

    ctx.fillStyle = "lightblue";
    for(let body of bodies){
        ctx.fillRect(body.shape.x, body.shape.y, body.shape.width, body.shape.height);
    }
}