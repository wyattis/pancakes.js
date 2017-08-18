/*global Engine*/
const game = Engine.game();
const scene = game.add.scene('keyboard-input-test', {update: update});
const SPEED = 5;
let char = new Engine.Rectangle(0, 0, 100, 100);
scene.layers.get('default').setRender(render);
game.play.scene('keyboard-input-test');


function update(delta){

    // for(let key in ['UP', 'DOWN', 'LEFT', 'RIGHT']){

        // Console log the state of each of these keys during each update
        // if(game.input.keyboard.keys[key].isDown){
        //     console.log(`${key} is down`);
        // }
        // if(game.input.keyboard.keys[key].isUp){
        //     console.log(`${key} is up`);
        // }
        // if(game.input.keyboard.keys[key].isHeld){
        //     console.log(`${key} is held`);
        // }

    // }

    if(game.input.keyboard.keys.UP.isDown){
        char.setPos(char.x, char.y - SPEED);
    }
    if(game.input.keyboard.keys.DOWN.isDown){
        char.setPos(char.x, char.y + SPEED);
    }
    if(game.input.keyboard.keys.LEFT.isDown){
        char.setPos(char.x - SPEED, char.y);
    }
    if(game.input.keyboard.keys.RIGHT.isDown){
        char.setPos(char.x + SPEED, char.y);
    }

}


function render(ctx){

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(char.x, char.y, char.width, char.height);

}