class ScreenManager{
    
    constructor(game){
        
        this.game = game;
        this.currentScreen = null;
        this.screens = {};
        this.screenIds = {};
        
        this.add = {};
        this.add.screen = (function(name, opts){
            
            let screen = new Screen(this.game, opts);
            this.screens[name] = screen;
            return screen;
            
        }).bind(this);

    }
    
    stop(){
        
        this.game.ticker.reset();
        
    }
    
    start(name){
        
        this.screenIds.update = this.game.ticker.add(this.currentScreen, this.currentScreen.update, Engine.FPS);
        this.screenIds.render = this.game.ticker.add(this.currentScreen, this.currentScreen.render, Engine.FPS);
        this.currentScreen.start();

    }
    
    screen(name){
        
        this.stop();
        this.currentScreen = this.screens[name];
        this.start();
        
    }
    
}