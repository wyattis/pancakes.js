/*global Engine*/
(function() {

    let updateCount = 0;
    let characters = [];
    let platforms;
    let Game = Engine.game({container: 'pancakes'});
    let firstScene;

    function load() {

        firstScene.load('bipedImage', '../img/biped.png');
        firstScene.load('charactersImage', '../img/characters.png');
        firstScene.load('blockImage', '../img/block.png');

    }

    function init() {

        firstScene.add.spritesheet('characters', 'charactersImage', 32, 32);
        firstScene.add.spritesheet('biped', 'bipedImage', 32, 32);

        let dx = 32;
        let dy = 32;

        let num = 20;
        for (let x = 0; x < num; x++) {
            for (let y = 0; y < num; y++) {

                let character = firstScene.add.sprite((x * dx) % 800, (y * dy) % 800);

                character.add.animation('knightJumping', 'characters', Engine.C.range(27, 31), 800);
                character.add.animation('knightWalking', 'characters', Engine.C.range(23, 27), 800);

                // Texture swapping
                switch (Engine.C.randomInt(0, 3)) {

                    case 0:
                        character.add.animation('running', 'biped', Engine.C.range(0, 36), 1200);
                        break;
                    case 1:
                        character.add.animation('climbing', 'biped', Engine.C.range(37, 48), 1200, {
                            backAndForth: true
                        });
                        break;
                    case 2:
                        character.add.animation('knightWalking', 'characters', Engine.C.range(23, 27), 800);
                        break;
                    case 3:
                        character.add.animation('knightJumping', 'characters', Engine.C.range(27, 31), 800);
                        break;

                }

                // Single texture
                // switch(C.randomInt(0, 1)){

                // 	case 0:
                // 		character.add.animation('knightWalking', 'characters', Engine.C.range(23, 27), 800);
                // 		break;
                // 	case 1:
                // 		character.add.animation('knightJumping', 'characters', Engine.C.range(27, 31), 800);
                // 		break;
                // }
                // character.play.animation('running');

                // All same animation
                // console.log('Is just a reference?', character.animations['knightWalking'].spritesheet.texture === Engine.cache.items['charactersImage']);
                characters.push(character);
            }
        }


        // character.play.animation('climbing');

    }

    function update(delta) {

        updateCount++;

        for (let i = 0; i < characters.length; i++) {

            let character = characters[i];
            character.addPos((1 / delta), (1 / delta));

            if(updateCount === 300){
            	character.play.animation('knightJumping');
            }

        }

    }


    firstScene = Game.add.scene('first', {
        load: load,
        init: init,
        update: update
    });

    // firstScene.layers.get('default').opts.dynamic = false;

    Game.play.scene('first');

})();