/*global pancakes*/
const game = pancakes.Engine.game();
const scene = game.add.scene('camera-follow', {load: load, update: update, init: init, size: {width: 1800, height: 1800}});
scene.layers.get('default').setPreRender(preRender);
const SPEED = 200;
let char;

function load(){

    scene.load('characterImage', '../img/characters.png');

}

function init(){

    scene.world.enablePhysics();

    scene.add.spritesheet('characters', 'characterImage', 32, 32);

    char = scene.add.sprite(0, 0);
    char.add.animation('walking', 'characters', pancakes.C.range(27, 31), 800);

    char.enablePhysics({clamped: true, maxSpeed: 500});
    scene.camera.follow(char);
}

function update(delta){

    // char.body.vel.x = 0;
    // char.body.vel.y = 0;

    if(game.input.keyboard.keys.UP.isDown){
        char.body.acc.y = -SPEED;
    }
    else if(game.input.keyboard.keys.DOWN.isDown){
        char.body.acc.y = SPEED;
    }
    else{
        char.body.acc.y = 0;
    }
    if(game.input.keyboard.keys.LEFT.isDown){
        char.body.acc.x = -SPEED;
    }
    else if(game.input.keyboard.keys.RIGHT.isDown){
        char.body.acc.x = SPEED;
    }
    else{
        char.body.acc.x = 0;
    }

}


const size = 300;
const colors = ['lightblue', 'red', 'green', 'yellow', 'maroon', 'blue'];
function preRender(ctx){

    let i = colors.length;
    while(i--){
        ctx.fillStyle = colors[i];
        ctx.fillRect(i*size, i*size, size, size);
    }

}

game.play.scene('camera-follow');