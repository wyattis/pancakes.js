/*global Engine*/
const game = Engine.game({container: 'pancakes'});
const scene = game.add.scene('animation-events', {init: init, load: load, update: update, size: {width: game.width, height: game.height}});
scene.world.enablePhysics();
const SPEED = 200;
let player;


function load(){

    scene.load('charactersImage', '../img/characters.png');

}

function init(){

    scene.add.spritesheet('characters', 'charactersImage', 32, 32);

    player = scene.add.sprite(scene.world.width / 3, scene.world.height * 2 / 3);

    let jumping = player.add.animation('jumping', 'characters', Engine.C.range(28, 32), 2000, {infinite: false});
    let walking = player.add.animation('walking', 'characters', Engine.C.range(23, 27), 800);


    // Currently need to enable physics after the animations are added.
    player.enablePhysics({bouncy: false, clamped: true, gravity: new Engine.Vector(0, 98), friction: new Engine.Vector(100, 20), maxSpeed: new Engine.Vector(110, 0), dynamicScale: true});

    walking.on('start', function(){

        console.log('Walking animation started');

    });

    walking.on('complete', function(){

        console.log('Walking animation complete');

    });

    jumping.on('complete', function(){

        player.body.scale.x = player.body.scale.x === 1 ? 2 : 1;
        player.body.scale.y = player.body.scale.y === 1 ? 2 : 1;
        player.play.animation('walking');

    });

}


function update(delta){

    if(game.input.keyboard.keys.SPACE.isDown){

        player.body.vel.y = -SPEED;
        player.play.animation('jumping');

    }

    // if(game.input.keyboard.keys.UP.isDown){
    //     player.body.vel.y = -SPEED;
    // }
    // else if(game.input.keyboard.keys.DOWN.isDown){
    //     player.body.vel.y = SPEED;
    // }

    if(game.input.keyboard.keys.LEFT.isDown){
        player.body.acc.x = -SPEED;
    }
    else if(game.input.keyboard.keys.RIGHT.isDown){
        player.body.acc.x = SPEED;
    }
    else{
        player.body.acc.x = 0;
    }

}


game.play.scene('animation-events');