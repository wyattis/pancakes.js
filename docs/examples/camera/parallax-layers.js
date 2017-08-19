/*global pancakes*/
const game = pancakes.Engine.game();
const scene = game.add.scene('parallax-layers', {load: load, update: update, init: init, size: {width: game.width * 3, height: game.height}});
// scene.layers.get('default').setPreRender(preRender);
scene.layers.get('default').opts.depth = 1;
const cloudLayerFront = scene.new.layer('cloudsFront', {zIndex: 3, animated: false});
const pillarLayer = scene.new.layer('pillars', {zIndex: 2, animated: false});
const cloudLayerBack = scene.new.layer('cloudsBack', {zIndex: 1, animated: false});
const SPEED = 200;
let char;
let clouds = [];
let pillars = [];

function load(){

    scene.load('cloud', '../img/cloud.png');
    scene.load('cloud-back', '../img/cloud-back.png');
    scene.load('pillar', '../img/pillar.png');
    scene.load('platform', '../img/platform.png');
    scene.load('characterImage', '../img/characters.png');

}

function init(){

    scene.world.enablePhysics();

    scene.add.spritesheet('characters', 'characterImage', 32, 32);
    let platforms = scene.add.group();

    char = scene.add.sprite(0, 0);
    char.add.animation('walking', 'characters', pancakes.C.range(27, 31), 800);
    char.enablePhysics({clamped: true, maxSpeed: 500});


    // Create the platforms
    for(let i=0; i<80; i++){

        platforms.add.sprite(i*64, scene.world.height - 32);

    }

    platforms.add.image('platform');


    // Create clouds in the cloud layer
    cloudLayerBack.setDepth(3);
    cloudLayerFront.setDepth(1.6);
    for(let i=0; i<80; i++){
        let cloud = cloudLayerBack.add.sprite(pancakes.C.randomInt(0, scene.world.width), pancakes.C.randomInt(0, scene.world.height - 100));
        let cloud2 = cloudLayerFront.add.sprite(pancakes.C.randomInt(0, scene.world.width), pancakes.C.randomInt(0, scene.world.height - 100));

        cloud.add.image('cloud-back');
        cloud2.add.image('cloud');
    }


    // Create pillars in the pillar layer
    pillarLayer.setDepth(2);
    for(let i=0; i<40; i++){
        let pillar = pillarLayer.add.sprite(pancakes.C.randomInt(0, scene.world.width), pancakes.C.randomInt(scene.world.height - 200, scene.world.height - 100));
        pillar.add.image('pillar');
    }

    scene.camera.follow(char);
}

function update(delta){

    // char.body.vel.x = 0;
    // char.body.vel.y = 0;

    if(game.input.keyboard.keys.UP.isDown){
        char.body.vel.y = -SPEED;
    }
    else if(game.input.keyboard.keys.DOWN.isDown){
        char.body.vel.y = SPEED;
    }
    else{
        char.body.vel.y = 0;
    }
    if(game.input.keyboard.keys.LEFT.isDown){
        char.body.vel.x = -SPEED;
    }
    else if(game.input.keyboard.keys.RIGHT.isDown){
        char.body.vel.x = SPEED;
    }
    else{
        char.body.vel.x = 0;
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

game.play.scene('parallax-layers');