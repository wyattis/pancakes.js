/*global Engine angular*/
angular.module('playground', []).controller('ctrlCtrl', ['$scope', function($scope){

    $scope.settings = {
        state: 'paused',
        playbackSpeedRatio: .3,
        gui: {
            velocityVectors: true,
            centerConnectingLines: true,
        },
        currentCase: 'x-axis',
        configs: [],
        cases: {
            'x-axis' : [{
                x: 150,
                y: 150,
                vx: -30,
                vy: 0,
                height: 100,
                width: 100,
                maxSpeed: 0,
            }, {
                x: 350,
                y: 100,
                vx: -100,
                vy: 0,
                height: 100,
                width: 100,
                maxSpeed: 0,
                friction: 0,
            }, {
                x: 550,
                y: 120,
                vx: -100,
                vy: 0,
                height: 100,
                width: 100,
                maxSpeed: 0,
                friction: 0,
            }],
            'y-axis' : [{
                x: 200,
                y: 100,
                vx: 0,
                vy: 100,
                height: 100,
                width: 100,
                maxSpeed: 0,
                friction: 0
            }, {
                x: 200,
                y: 300,
                vx: 0,
                vy: 10,
                height: 100,
                width: 100,
                maxSpeed: 0,
                friction: 0
            }],
        }
    };


    $scope.loadConfig = function(){

        $scope.settings.configs = $scope.settings.cases[$scope.settings.currentCase];
        if($scope.run) $scope.run();

    };

    $scope.loadConfig();

    $scope.run = function(){

        physics.clear();

        for(let config of $scope.settings.configs){

            let body = new Engine.Body(config.x || 0, config.y || 0, config.vx || 0, config.vy || 0);
            body.maxSpeed = config.maxSpeed || 0;
            body.addShape(new Engine.Rectangle(config.x || 0, config.y || 0, config.width || 100, config.height || 100));
            physics.add(body);

        }

    };


    const game = Engine.game();
    const physics = new Engine.Physics();
    let bodies = [];
    let scene = game.add.scene('keyboard-friction', {init: $scope.run, update: update});
    let layer = scene.layers.get('default');
    layer.setRender(render);
    game.play.scene('keyboard-friction');
    const w = 100;
    const h = 100;




    function update(delta){

        // console.log(delta * $scope.playbackSpeedRatio)
        if($scope.settings.state === 'playing')
            physics.tick(delta * $scope.settings.playbackSpeedRatio);

    }

    function render(ctx){

        for(let body of physics.bodies){
            ctx.fillStyle = "lightblue";
            ctx.fillRect(body.shape.x, body.shape.y, body.shape.width, body.shape.height);
        }

        ctx.fillStyle = "#ff0000";
        ctx.strokeStyle = "#ff0000";
        if($scope.settings.gui.velocityVectors){
            for(let body of physics.bodies){
                body.vel.draw({x: body.shape.centerX, y: body.shape.centerY}, ctx);
            }
        }

        ctx.save();
        ctx.strokeStyle = "rgba(60, 60, 60, .5)";
        if($scope.settings.gui.centerConnectingLines){
            ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/

            for(let i=0; i<physics.bodies.length - 1; i++){
                ctx.beginPath();
                ctx.moveTo(physics.bodies[i].shape.centerX,  physics.bodies[i].shape.centerY);
                ctx.lineTo(physics.bodies[i+1].shape.centerX,  physics.bodies[i+1].shape.centerY);
                ctx.stroke();
            }
        }
        ctx.restore();
    }


}]);
