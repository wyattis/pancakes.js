/*global Engine*/
const game = Engine.game({container: 'pncks'});
const tiledScene = game.add.scene('tiled', {load: load, update: update, init: init, size: {width: game.width * 3, height: game.height}});
const layer = tiledScene.layers.get('default');
let player;

function load(scene){

    scene.load('mario-tiles-texture', '/img/super-mario-3-tiles.png');
    scene.load('mario-character-texture', '/img/mario-simple.png');
    scene.load('mario-tilesheet', '/tilesheets/mario-test.json');

}


function init(scene){

    scene.world.enablePhysics();
    scene.add.spritesheet('mario-tiles', 'mario-tiles-texture', 16, 16, 2, 2);
    scene.add.spritesheet('mario-character', 'mario-character-texture', 17, 27, 2, 2);
    const groups = layer.tilesheet.fromTiled('mario-tilesheet', 'mario-tiles');
    groups.forEach(group => {
        group.members.forEach(sprite => {
            sprite.body.fixed = true;
        });
    });
    player = scene.add.sprite(100, 100);
    player.add.animation('walking', 'mario-character', [0, 1], 500);
    player.add.animation('standing', 'mario-character', [0], 100000);
    player.enablePhysics({gravity: new Engine.Vector(0, 98), clamped: true, friction: new Engine.Vector(200, 0), maxSpeed: new Engine.Vector(200, 200)});
    player.collidesWith(groups);
    // player.debug = true;

    scene.camera.follow(player);
}

function update(delta){

    if(game.input.keyboard.keys.SPACE.isDown){
        player.body.vel.y = -100;
    }

    if(game.input.keyboard.keys.LEFT.isDown)
        player.body.vel.x = -100;
    else if(game.input.keyboard.keys.RIGHT.isDown)
        player.body.vel.x = 100;

}


game.play.scene('tiled');