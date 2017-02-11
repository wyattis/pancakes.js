/*global Engine*/
/**
 * Abstraction of a Keyboard. Holds keycode information and holdes the state of each key for easy access
 * @constructor
 * @returns Engine.Keyboard
 */
Engine.Keyboard = class Keyboard{

    constructor(){

        this.keys = Object.keys(Engine.Keyboard.keyCodes)
            .reduce((keys, code) => {

                keys[Engine.Keyboard.keyCodes[code]] = {
                    isDown: false,
                    isUp: true,
                    isHeld: false,
                };


                return keys;

            }, {});

    }

    /**
     * Map the keycode to the key name
     */
    static map(keyCode){

        return Engine.Keyboard.keyCodes[keyCode];

    }


    /**
     * Map the keyname to the keycode
     */
    static mapName(keyName){

        return Engine.Keyboard.keys[keyName.toUpperCase()];

    }

};


// Hardcoded keycodes
Engine.Keyboard.keyCodes = {8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",18:"ALT",19:"PAUSE/BREAK",20:"CAPS LOCK",27:"ESC",32:"SPACE",33:"PAGE UP",34:"PAGE DOWN",35:"END",36:"HOME",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};