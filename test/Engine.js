"use strict";
let Engine = class Engine{
    
    constructor(opts){
        
        this.isRunning = false;
        
        // Callbacks for the current game object
        this.updateCB = opts.update || false;
        this.renderCB = opts.render || false;
        this.initCB = opts.init || false;
        this.loadCB = opts.load || false;
        
        // Initialize the last timestamp
        this.lastTimestamp = performance.now();
        this.loops = 0;
        
        // Get our canvas and context
        this.canvas = document.getElementById(opts.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Our timing loop
        this.ticker = new Ticker();

    }
    
    loop(timestamp){
        
        // debugger;
        if(this.loops > 1) {
            
            let delta = timestamp - this.lastTimestamp;
            this.update(delta);
            this.render(delta);
            
        }
        
        
        this.loops ++;
        this.lastTimestamp = timestamp;
        if(this.isRunning) requestAnimationFrame(this.loop.bind(this));
        
    }
    
    
    
    update(delta){
        
        // console.log('updating', delta);
        this.updateCB(delta);
        
    }
    
    render(){
        
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderCB(this.ctx);
        
    }
    
    
    pause(){
        
        this.isRunning = false;
            
    }
    
    
    start(){
        
        this.isRunning = true;
        // requestAnimationFrame(this.loop.bind(this));
        this.ticker.start();

    }
    
    load(cb){
        
        if(this.loadCB) this.loadCB();
        setTimeout(() => {
            cb();
        }, 2000);

        
    }
    
    init(){
        
        this.ticker.add(this, this.update, 1000 / 30);
        this.ticker.add(this, this.render, 1000 / 61);

        this.load(() => {
            
            if(this.initCB) this.initCB();
            this.start();
            
        });
        
    }
};


Engine.FPS = 1000 / 61;