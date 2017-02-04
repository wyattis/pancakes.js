/*global Engine*/
Engine.LayerFactory = class LayerFactory{

    constructor(scene){

        this.scene = scene;

    }

    layer(name){

        let layer = new Engine.Layer(this.scene);
        this.scene.layers.set(name, layer);
        return layer;

    }

};