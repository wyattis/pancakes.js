/*global Engine*/
const game = Engine.game();
const physics = new Physics();
const ACC = 5;
let player;
let bodies = [];
let screen = game.add.screen('keyboard-friction', {init: init, update: update});
screen.layers.get('default').setRender(render);
game.play.screen('keyboard-friction');


function init(){

    player = new Body(200, 200);
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
                body.addGeometry(new Engine.Rectangle(x*dx, y*dy, w, h));
                physics.add(body);
                bodies.push(body);
        }
    }


}

function update(delta){

    if(game.input.keyboard.keys.UP.isDown){
        player.setAcc(player.acc[0], -ACC);
    }
    if(game.input.keyboard.keys.DOWN.isDown){
        player.setAcc(player.acc[0],  ACC);
    }
    if(game.input.keyboard.keys.LEFT.isDown){
        player.setAcc(-ACC, player.acc[1]);
    }
    if(game.input.keyboard.keys.RIGHT.isDown){
        player.setAcc(ACC, player.acc[1]);
    }
    if(game.input.keyboard.keys.UP.isUP){
        player.setAcc(player.acc[0], 0);
    }
    if(game.input.keyboard.keys.DOWN.isUP){
        player.setAcc(player.acc[0],  0);
    }
    if(game.input.keyboard.keys.LEFT.isUP){
        player.setAcc(0, player.acc[1]);
    }
    if(game.input.keyboard.keys.RIGHT.isUP){
        player.setAcc(0, player.acc[1]);
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