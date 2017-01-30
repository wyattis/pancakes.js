/*global Engine*/
class LayerFactory{

    constructor(scene){

        this.scene = scene;

    }

    layer(name){

        let layer = new Layer(this.scene);
        this.scene.layers.set(name, layer);
        return layer;

    }

}