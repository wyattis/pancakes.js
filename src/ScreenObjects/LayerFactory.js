class LayerFactory{
    
    constructor(screen){
        
        this.screen = screen;
        
    }
    
    layer(ctx){
        
        return new Layer(ctx);
        
    }
    
}