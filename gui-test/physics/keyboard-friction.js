/*global Engine*/
const game = Engine.game();
const physics = new Physics();
const ACC = 150;
let player;
let bodies = [];
let screen = game.add.screen('keyboard-friction', {init: init, update: update});
screen.layers.get('default').setRender(render);
game.play.screen('keyboard-friction');


function init(){

    player = new Body(200, 200);
    player.friction = 40;
    player.maxSpeed = 200;
    player.addGeometry(new Engine.Rectangle(200, 200, 10, 10));
    physics.add(player);


    const w = 25;
    const h = 25;
    const dx = 2*w;
    const dy = 2*h;
    const count = 4;

    for(let x=0; x<count; x++){
        for(let y=0; y<count; y++){
                const body = new Body(x*dx, y*dy, 0, 0);
                body.friction = 30;
                body.maxSpeed = 100;
                body.addGeometry(new Engine.Rectangle(x*dx, y*dy, w, h));
                physics.add(body);
                bodies.push(body);
        }
    }


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
    ctx.fillRect(player.geometry.x, player.geometry.y, player.geometry.width, player.geometry.height);

    ctx.fillStyle = "lightblue";
    for(let body of bodies){
        ctx.fillRect(body.geometry.x, body.geometry.y, body.geometry.width, body.geometry.height);
    }
}