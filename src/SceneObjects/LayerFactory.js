import Layer from './Layer';
import GUILayer from '../GUI/GUILayer';

/**
 * A factory used by Scenes to create layers
 * @constructor
 * @param {Engine.Scene} scene the scene to attach layers to
 * @returns {Engine.LayerFactory} instance
 */
class LayerFactory{

    constructor(scene){

        this.scene = scene;

    }


    /**
     * Create a normal game layer. Useful for optimization since we can draw
     * less frequently.
     * @param {string} name - The layer's unique name in the scene.
     * @param {object} [opts]
     */
    layer(name, opts){

        let layer = new Layer(this.scene, opts);
        this.scene.layers.set(name, layer);
        return layer;

    }



    /**
     * Create a GUI layer. This layer can have GUI elements like buttons and
     * text added to it.
     */
    guiLayer(name, opts){

        let layer = new GUILayer(this.scene, opts);
        this.scene.layers.set(name, layer);
        return layer;

    }

}

export default LayerFactory;