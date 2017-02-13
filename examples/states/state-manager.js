/*global Engine*/
// TODO: change states
const game = Engine.game();
const mainMenu = game.add.scene('main-menu', {size: {width: game.width, height: game.height}, type: 'gui'});
const nextButton = mainMenu.add.button(0 , 0, "Next");
const prevButton = mainMenu.add.button(0 , 0, "Previous");
nextButton.setPos(game.width - nextButton.shape.width, game.height/2 - nextButton.shape.height/2);
prevButton.setPos(0, game.height/2 - prevButton.shape.height/2);
game.play.scene('main-menu');