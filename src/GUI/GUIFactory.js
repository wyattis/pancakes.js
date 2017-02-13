/*global Engine*/
/**
 * Factory for adding GUI elements to a GUI layer.
 */
Engine.GUIFactory = class GUIFactory{

    constructor(scene, layer, cache){

        this.scene = scene;
        this.layer = layer;
        this.cache = cache;

    }


    /**
     * Add a button to the layer.
     */
    button(x, y, content, opts){

        let button = new Engine.Button(x, y, content, opts);
        this.layer.buttons.push(button);
        return button;

    }


    /**
     * Add text to the layer.
     */
    text(x, y, textContent, opts){

        // TODO:

    }

};