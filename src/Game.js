class Game{
    
    constructor(engine){
        
        this.engine = engine;

		this.play = new ScreenManager(this);
		this.add = this.play.add;
        
        this.ticker = new Ticker();

    }
    
    
}