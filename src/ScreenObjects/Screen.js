class Screen{
    
    constructor(game, opts){
        
        this.game = game;
        this.load = game.engine.load;
        this.ticker = game.ticker;
        
        this.initCB = opts.init;
        this.updateCB = opts.update;
        this.renderCB = opts.render;
        this.loadCB = opts.load;
        this.loadProgressCB = opts.loadProgress;
        
        // this.add = new LayerFactory(this);
        this.add = new ObjectFactory(this);
        
        this._getOrCreateCanvas(opts.canvas);
        this.width = 400 || opts.width;
        this.height = 300 || opts.height;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    
    _getOrCreateCanvas(canvas){
        
        if(canvas){
            
            this.canvas = typeof canvas === 'object' ? canvas : document.getElementById(canvas);
            
        }
        else{
            
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            
        }
        
    }
    
    _performLoad(){
        
        if(this.loadCB) this.loadCB();
        
        
        this.game.engine.assetManager.go(() => {
            
            this.loadProgress();
            
        }, () => {
	
			console.log('Finished loading');
			this.init();
	
		});
        
    }
    
    loadProgress(){
        
        if(this.loadProgressCB) this.loadProgressCB();
        
    }
    
    init(){
        
        if(this.initCB) this.initCB();
        
        this.game.ticker.start();
        
    }
    
    update(delta){
        
        // console.log('Screen update', delta);
        if(this.updateCB) this.updateCB(delta);
        
    }
    
    render(delta){
        this.ctx.clearRect(0, 0, this.width, this.height);
        // console.log('Screen render', delta);
        if(this.renderCB) this.renderCB(this.ctx, delta);
        
    }
    
    start(){
        
        this._performLoad();
        
    }
    
}