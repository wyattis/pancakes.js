/*global Engine*/
const game = Engine.game();
const scene = game.add.scene('camera-follow', {load: load, update: update, init: init});
scene.layers.get('default').setPreRender(preRender)
const SPEED = 200;
let char;

function load(){

    scene.load('characterImage', '../img/characters.png');

}

function init(){

    scene.world.enablePhysics();

    scene.add.spritesheet('characters', 'characterImage', 32, 32);

    char = scene.add.sprite(0, 0);
    char.enablePhysics(new Engine.Rectangle(0, 0, 32, 32));
    char.add.animation('walking', 'characters', Engine.C.range(27, 31), 800);

    scene.world.camera.follow(char);
}

function update(delta){

    char.body.vel.x = 0;
    char.body.vel.y = 0;

    if(game.input.keyboard.keys.UP.isDown){
        char.body.vel.y = -SPEED;
    }
    if(game.input.keyboard.keys.DOWN.isDown){
        char.body.vel.y = SPEED;
    }
    if(game.input.keyboard.keys.LEFT.isDown){
        char.body.vel.x = -SPEED;
    }
    if(game.input.keyboard.keys.RIGHT.isDown){
        char.body.vel.x = SPEED;
    }

    char.body.pos.clamp(0, scene.world.width, 0, scene.world.height);

}

function preRender(ctx){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, 300, 300);
}

game.play.scene('camera-follow');