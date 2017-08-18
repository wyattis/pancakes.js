import Button from './Button';
import Text from './Text';
import ProgressBar from './ProgressBar';

/**
 * Factory for adding GUI elements to a GUI layer.
 */
class GUIFactory{

    constructor(scene, layer, cache){

        this.scene = scene;
        this.layer = layer;
        this.cache = cache;

    }


    /**
     * Add a button to the layer.
     */
    button(x, y, content, opts){

        let button = new Button(x, y, content, opts);
        this.layer.buttons.push(button);
        return button;

    }


    /**
     * Add a progress bar.
     * @param {float} x - X position of the progressBar
     * @param {float} y - Y position of the progressBar
     * @param {object} opts
     * @param {float} [opts.max=1]- Indicates the maximum value of the progress bar
     * @param {float} [opts.value] - The current value of the progress bar
     * @param {reference} [opts.ref] - The object which holds the value you want to associate with this progress bar. Must be used in conjunction with opts.refKey
     * @param {string} [opts.refKey] - The property name which holds the value we want to "watch"
     */
    progressBar(x, y, opts){

        let bar = new ProgressBar(x, y, opts);
        this.layer.bars.push(bar);
        return bar;

    }


    /**
     * Add text to the layer.
     * @param {float} x - X position of the text
     * @param {float} y - Y position of the text
     * @param {string} textContent - The contents of the text object
     * @param {object} opts
     */
    text(x, y, textContent, opts){

        let text = new Text(x, y, textContent, opts);
        this.layer.texts.push(text);
        return text;

    }

}


export default GUIFactory;