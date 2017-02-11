/*global Engine*/
/**
 * A factory used by Scenes to create layers
 * @constructor
 * @param {Engine.Scene} scene the scene to attach layers to
 * @returns {Engine.LayerFactory} instance
 */
Engine.LayerFactory = class LayerFactory{

    constructor(scene){

        this.scene = scene;

    }

    layer(name, opts){

        let layer = new Engine.Layer(this.scene, opts);
        this.scene.layers.set(name, layer);
        return layer;

    }

};