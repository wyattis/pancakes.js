/*global Engine*/
// TODO: change states
const game = Engine.game();
const scenes = ['main-menu', 'second', 'third'];
let currentScene = 0;

// Scenes
game.add.scene('main-menu', {init: initGUI, size: {width: game.width, height: game.height}, type: 'gui'});
game.add.scene('second', {init: initGUI, size: {width: game.width, height: game.height}, type: 'gui'});
game.add.scene('third', {init: initGUI, size: {width: game.width, height: game.height}, type: 'gui'});



function initGUI(scene){

    let sceneName = scene.add.text(0, 0, scenes[currentScene]);
    let nextButton = scene.add.button(0 , 0, "Next");
    let prevButton = scene.add.button(0 , 0, "Previous");

    nextButton.setPos(game.width - nextButton.shape.width, game.height/2 - nextButton.shape.height/2);
    prevButton.setPos(0, game.height/2 - prevButton.shape.height/2);

    nextButton.on('click', function(){

        currentScene ++;

        if(currentScene === scenes.length)
            currentScene = 0;

        game.play.scene(scenes[currentScene]);

    });

    prevButton.on('click', function(){

        currentScene --;

        if(currentScene < 0)
            currentScene = scenes.length - 1;

        game.play.scene(scenes[currentScene]);

    });

}

game.play.scene(scenes[currentScene]);