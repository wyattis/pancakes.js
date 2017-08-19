var pancakes =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _StockPile = __webpack_require__(11);

var _StockPile2 = _interopRequireDefault(_StockPile);

var _AssetManager = __webpack_require__(12);

var _AssetManager2 = _interopRequireDefault(_AssetManager);

var _Game = __webpack_require__(13);

var _Game2 = _interopRequireDefault(_Game);

var _C = __webpack_require__(8);

var _C2 = _interopRequireDefault(_C);

var _Measure = __webpack_require__(37);

var _Measure2 = _interopRequireDefault(_Measure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Base object for pancakes.js
 */
var Engine = {

	/**
  * @name load
  * @param {string} cacheKey The string key that will be used to store the asset in the cache.
  * @param {string} url The url that hosts the asset
  * @returns {undefined}
  */
	load: function load(cacheKey, url) {

		Engine.assetManager.addToQue(cacheKey, url);
	},

	/**
  * @name game Factory function to return a new instance of a Game
  * @param {{}} opts Any options that should be passed to the
  * @returns {Engine.Game} instance
  */
	game: function game(opts) {

		Engine.cache = Engine.cache || new _StockPile2.default();
		Engine.assetManager = Engine.assetManager || new _AssetManager2.default(Engine.cache);
		return new _Game2.default(Engine, opts);
	},

	RECTANGLE: 0,
	CIRCLE: 1

};

Engine.FPS = 0;
Engine.C = _C2.default;
Engine.measure = new _Measure2.default();

exports.default = Engine;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a 2D vector with x and y points
 * @constructor
 * @param {float} x the x dimension of the vector
 * @param {float} y the y dimension of the vector
 * @returns {Engine.Vector} instance
 */
var Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this.x = x;
        this.y = y;
    }

    /**
     * Return the magnitude of a vector
     */


    _createClass(Vector, [{
        key: "mag",
        value: function mag() {

            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * Clamp the vector values between the min and max
         */

    }, {
        key: "clamp",
        value: function clamp(xMin, xMax, yMin, yMax) {

            if (this.x > xMin) {

                if (this.x > xMax) {

                    this.x = xMax;
                }
            } else {

                this.x = xMin;
            }

            if (this.y > yMin) {

                if (this.y > yMax) {

                    this.y = yMax;
                }
            } else {

                this.y = yMin;
            }
        }

        /**
         * Make a non referential copy of the vector
         */

    }, {
        key: "clone",
        value: function clone() {

            return new Vector(this.x, this.y);
        }

        /**
         * Will draw an arrow representing the vector
         */

    }, {
        key: "draw",
        value: function draw(fromPos, ctx) {

            if (this.x === 0 && this.y === 0) return;
            var fromx = fromPos.x;
            var fromy = fromPos.y;
            var tox = fromPos.x + this.x;
            var toy = fromPos.y + this.y;

            var headlen = 5;
            var angle = Math.atan2(toy - fromy, tox - fromx);

            //starting path of the arrow from the start square to the end square and drawing the stroke
            ctx.beginPath();
            ctx.moveTo(fromx, fromy);
            ctx.lineTo(tox, toy);
            ctx.lineWidth = 2;
            ctx.stroke();

            //starting a new path from the head of the arrow to one of the sides of the point
            ctx.beginPath();
            ctx.moveTo(tox, toy);
            ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

            //path from the side point of the arrow, to the other side point
            ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));

            //path from the side point back to the tip of the arrow, and then again to the opposite side point
            ctx.lineTo(tox, toy);
            ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

            //draws the paths created above
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fill();
        }
    }]);

    return Vector;
}();

exports.default = Vector;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Event = __webpack_require__(16);

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Custom event registrar. Handles registering and dispatching custom events.
 * @constructor
 * @returns {Reactor} instance
 */
var Reactor = function () {
    function Reactor() {
        _classCallCheck(this, Reactor);

        this.events = new Map();
    }

    /**
     * Add event listener
     */


    _createClass(Reactor, [{
        key: 'on',
        value: function on(eventName, cb, opts) {

            this.events.get(eventName).registerCallback(cb, opts);
        }

        /**
         * Let the Reactor know that an event exists
         */

    }, {
        key: 'register',
        value: function register(eventName) {

            var event = new _Event2.default(eventName);
            this.events.set(eventName, event);
        }

        /**
         * Unregister an event
         */

    }, {
        key: 'unregister',
        value: function unregister(eventName) {

            this.events.delete(eventName);
        }

        /**
         * Dispatch an instance of the specified event
         */

    }, {
        key: 'dispatch',
        value: function dispatch(eventName, eventArgs) {

            var cbs = this.events.get(eventName).callbacks;
            var l = cbs.length;
            while (l--) {
                cbs[l](eventArgs);
            }
        }
    }]);

    return Reactor;
}();

exports.default = Reactor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = __webpack_require__(4);

var _Button2 = _interopRequireDefault(_Button);

var _Text = __webpack_require__(17);

var _Text2 = _interopRequireDefault(_Text);

var _ProgressBar = __webpack_require__(18);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Factory for adding GUI elements to a GUI layer.
 */
var GUIFactory = function () {
    function GUIFactory(scene, layer, cache) {
        _classCallCheck(this, GUIFactory);

        this.scene = scene;
        this.layer = layer;
        this.cache = cache;
    }

    /**
     * Add a button to the layer.
     */


    _createClass(GUIFactory, [{
        key: 'button',
        value: function button(x, y, content, opts) {

            var button = new _Button2.default(x, y, content, opts);
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

    }, {
        key: 'progressBar',
        value: function progressBar(x, y, opts) {

            var bar = new _ProgressBar2.default(x, y, opts);
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

    }, {
        key: 'text',
        value: function text(x, y, textContent, opts) {

            var text = new _Text2.default(x, y, textContent, opts);
            this.layer.texts.push(text);
            return text;
        }
    }]);

    return GUIFactory;
}();

exports.default = GUIFactory;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

var _Rectangle = __webpack_require__(5);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Reactor = __webpack_require__(2);

var _Reactor2 = _interopRequireDefault(_Reactor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create a Button on the current layer.
 */
var Button = function () {
    function Button(x, y, content, opts) {
        var _this = this;

        _classCallCheck(this, Button);

        this.pos = new _Vector2.default(x, y);
        this.content = content;
        this.state = Button.DEFAULT;
        this.shape = new _Rectangle2.default(x, y, 100, 50);

        this.opts = {
            textStyle: "black",
            font: '48px serif',
            padding: {
                left: 10, right: 10, top: 10, bottom: 10
            }
        };

        Object.assign(this.opts, opts);

        this.reactor = new _Reactor2.default();

        this.reactor.register('hover');
        this.reactor.register('out');
        this.reactor.register('click');
        this.reactor.register('release');

        // Change the state of the button depending on the events fired
        this.reactor.on('hover', function () {
            _this.state = Button.HOVER;
            _this._hasChanged = true;
        });
        this.reactor.on('out', function () {
            _this.state = Button.DEFAULT;
            _this._hasChanged = true;
        });
        this.reactor.on('click', function () {
            _this.state = Button.ACTIVE;
            _this._hasChanged = true;
        });
        this.reactor.on('release', function () {
            _this.state = Button.HOVER;
            _this._hasChanged = true;
        });

        // Create alias for the event handler
        this.on = this.reactor.on.bind(this.reactor);

        this._hasChanged = true; // Make sure we render right away
    }

    /**
     * Calculate the width of the given text.
     * @private
     */


    _createClass(Button, [{
        key: '_calculateSize',
        value: function _calculateSize(ctx) {

            ctx.font = this.opts.font;
            var measurement = ctx.measureText(this.content);
            var height = 48;
            this.setPos(this.pos.x - this.opts.padding.left, this.pos.y - this.opts.padding.top);
            this.shape.setSize(measurement.width + this.opts.padding.left + this.opts.padding.right, height + this.opts.padding.top + this.opts.padding.bottom);
        }

        /**
         * Render the current state of the button
         * @param {CanvasRenderingContext2D} ctx - Reference to the layer rendering context.
         * @private
         */

    }, {
        key: 'render',
        value: function render(ctx) {

            ctx.font = this.opts.font;
            ctx.textBaseline = "hanging";

            if (this.state === Button.DEFAULT) {
                ctx.fillStyle = 'green';
                ctx.fillRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);

                ctx.fillStyle = this.opts.textStyle;
                ctx.fillText(this.content, this.shape.x + this.opts.padding.left, this.shape.y + this.opts.padding.top);
                this._hasChanged = false;
            } else {

                ctx.fillStyle = 'lightblue';
                ctx.fillRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);

                ctx.fillStyle = this.opts.textStyle;
                ctx.fillText(this.content, this.shape.x + this.opts.padding.left, this.shape.y + this.opts.padding.top);
                this._hasChanged = false;
            }
        }

        /**
         * Clear the button on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Reference to the layer rendering context.
         * @private
         */

    }, {
        key: 'clear',
        value: function clear(ctx) {

            // TODO: Handle circles as well
            ctx.clearRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);
        }

        /**
         * Set the position of the button.
         * @param {float} x - X position of the button
         * @param {float} y - Y position of the button
         */

    }, {
        key: 'setPos',
        value: function setPos(x, y) {

            this.pos.x = x;
            this.pos.y = y;
            this.shape.setPos(x, y);
        }
    }]);

    return Button;
}();

Button.DEFAULT = 0;
Button.HOVER = 1;
Button.ACTIVE = 2;

exports.default = Button;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstraction of a rectangle
 * @constructor
 * @param {float} x the x position of the top left corner of a rectangle
 * @param {float} y the y position of the top left corner of a rectangle
 * @param {float} width the width of a rectangle
 * @param {float} height the height of a rectangle
 * @returns {Engine.Rectangle} instance
 */
var Rectangle = function () {
    function Rectangle(x, y, width, height) {
        _classCallCheck(this, Rectangle);

        this.type = _Engine2.default.RECTANGLE;
        this.width = width;
        this.height = height;
        this.setPos(x, y);
    }

    /**
     * Set the position of the Rectangle and update all of the other properties
     * related to the position.
     * @param {float} x - X position
     * @param {float} y - Y position
     */


    _createClass(Rectangle, [{
        key: 'setPos',
        value: function setPos(x, y) {

            this.x = x;
            this.y = y;
            this.top = y;
            this.left = x;
            this.right = x + this.width;
            this.bottom = y + this.height;
            this.centerX = (this.left + this.right) / 2;
            this.centerY = (this.top + this.bottom) / 2;
            this.diagSqrd = this.width ^ 2 + this.height ^ 2;
        }

        /**
         * Set the size of the Rectangle and update all of the other related
         * properties.
         * @param {float} width - Width of the rectangle
         * @param {float} height - Height of the rectangle
         */

    }, {
        key: 'setSize',
        value: function setSize(width, height) {

            this.width = width;
            this.height = height;
            this.right = this.x + this.width;
            this.bottom = this.y + this.height;
            this.centerX = (this.left + this.right) / 2;
            this.centerY = (this.top + this.bottom) / 2;
            this.diagSqrd = this.width ^ 2 + this.height ^ 2;
        }
    }]);

    return Rectangle;
}();

exports.default = Rectangle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Group = __webpack_require__(19);

var _Group2 = _interopRequireDefault(_Group);

var _Sprite = __webpack_require__(7);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Spritesheet = __webpack_require__(25);

var _Spritesheet2 = _interopRequireDefault(_Spritesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a factory for adding sprites and resources to a scene and world
 * @constructor
 * @param {Scene} scene reference to the parent scene
 * @param {World} world reference to the parent world
 * @param {Layer} layer reference to the parent layer
 * @param {StockPile} cache reference to the cache being used by this game
 */
var ObjectFactory = function () {
	function ObjectFactory(scene, world, layer, cache) {
		_classCallCheck(this, ObjectFactory);

		this.scene = scene;
		this.world = world;
		this.layer = layer;
		this.cache = cache;
	}

	/**
  * Adds a sprite to the referenced scene, world and layer.
  * @param {float} x - The x position of the sprite.
  * @param {float} y - The y position of the sprite.
  * @link {Sprite}
  * @returns {Sprite} instance
  */


	_createClass(ObjectFactory, [{
		key: 'sprite',
		value: function sprite(x, y) {

			var sprite = new _Sprite2.default(this.scene, this.world, x, y);
			this.world.sprites.push(sprite);
			this.layer.sprites.push(sprite);
			return sprite;
		}

		/**
   * Adds a spritesheet to the cache.
   * @param {string} cacheKey - The name of the spritesheet within the cache.
   * @param {string} imageKey - The name of the image to be used with the spritesheet.
   * @param {int} tileWidth - The width of a single tile within the spritesheet
   * @param {int} tileHeight - The height of a single tile within the spritesheet
   * @param {int} tilePadding - The padding between tiles in the spritesheet
   * @link {Spritesheet}
   * @returns {Spritesheet}
   */

	}, {
		key: 'spritesheet',
		value: function spritesheet(cacheKey, imageKey, tileWidth, tileHeight, tilePadding) {

			var spritesheet = new _Spritesheet2.default(this.cache.use(imageKey), tileWidth, tileHeight, tilePadding);
			this.cache.add(cacheKey, spritesheet);
			return spritesheet;
		}

		/**
   * Adds a group to the scene/world
   * @link {Group}
   * @returns {Group}
   */

	}, {
		key: 'group',
		value: function group(arr) {

			var group = new _Group2.default(this.scene, this.world, this.layer, arr);
			return group;
		}
	}]);

	return ObjectFactory;
}();

exports.default = ObjectFactory;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Body = __webpack_require__(21);

var _Body2 = _interopRequireDefault(_Body);

var _SpriteFactory = __webpack_require__(22);

var _SpriteFactory2 = _interopRequireDefault(_SpriteFactory);

var _SpriteController = __webpack_require__(24);

var _SpriteController2 = _interopRequireDefault(_SpriteController);

var _Rectangle = __webpack_require__(5);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a Sprite. Sprites can have animations, physics bodies, etc. TODO
 * @constructor
 * @param {Scene} scene reference to the parent scene
 * @param {World} world reference to the parent world
 * @param {float} x the initial x position of the body in pixels
 * @param {float} y the initial y position of the body in pixels
 * @returns {Sprite} instance
 */
var Sprite = function () {
	function Sprite(scene, world, x, y) {
		_classCallCheck(this, Sprite);

		// TODO: how to handle rendering shapes, images, tiles, or animations?
		// TODO: how should we add audio effects to a sprite?

		this.scene = scene;
		this.world = world;
		this.currentAnimation = null;
		this.animations = {};
		this.needsRendered = true;
		this.body = new _Body2.default(x, y);

		// Add SpriteFactory for handy API
		this.add = new _SpriteFactory2.default(this);

		// Play handler
		this.play = new _SpriteController2.default(this);
	}

	/**
  * Enable physics for this Sprite. Takes care of adding the body to the sprite.
  * @param {object} opts
  * @param {float} [opts.mass=100] - The mass to use when bodies collide.
  *		Not sure how this number equates to real world mass.
  * @param {float} [opts.normalizedMaxSpeed=0] - The maximum, normalized
  *		speed of this body. If this value is 0 then the speed unlimited.
  * @param {Vector} [opts.maxSpeed={}] - Direction based max speed
  *		for the body.
  * @param {Vector} [opts.friction={}] - Friction to apply to
  *		the body.
  * @param {Vector} [opts.gravity={}] - Supplying a Vector will
  *		make gravity be applied for the given body.
  * @param {boolean} [opts.clamped=false] - If true the Body will be clamped
  *		within the bounds of the world.
  * @param {boolean} [opts.fixed=false] - If true the Body will not be
  *		affected by collisions it is a part of.
  * @param {boolean} [opts.enabled=true] - If false then collisions won't
  *		happen with this body. This can be changed while the game is running
  *		by changing the sprite.body.enabled property.
  *
  * @param {undefined|string|Rectangle} [shape] This allows you to set
  *		your own geometry for this sprite. If left empty it will assume the
  *		shape is a rectangle the size of the image, tile or animation
  *		assigned to it.
  */


	_createClass(Sprite, [{
		key: 'enablePhysics',
		value: function enablePhysics(opts, shape) {

			// TODO: add shape based on image, tile or animation if shape is not
			//		 supplied.


			if (shape) {
				// Override the physics shape. Sprite shape stays the same for rendering purposes.
				this.body.addShape(shape);
			} else {
				this.body.addShape(this.shape);
			}

			// Add the supplied options to the physics body
			if (opts) Object.assign(this.body, opts);

			this.world.physics.add(this.body);
		}

		/**
   * Specify the group, array, sprite or body that this sprite body should collide with. Essentially an alias for Body.collidesWith.
   * @param {Array|Group|Body|Sprite} what - The game object(s) this sprite should collide with.
   */

	}, {
		key: 'collidesWith',
		value: function collidesWith(what) {

			this.body.collidesWith(what);
		}

		/**
   * Sprite update method for updating relevant
   * animations
   * @private
   */

	}, {
		key: 'update',
		value: function update(delta) {

			if (this.currentAnimation) {
				this.currentAnimation.update(delta);
			}
		}

		/**
   * Render the given sprite
   * @private
   */

	}, {
		key: 'render',
		value: function render(ctx, delta) {

			if (this.currentAnimation) {
				// (0.5 + num) << 0 is a bitwise shift to perform rounding

				var rInfo = this.currentAnimation.getRenderInfo();
				// this.currentAnimation.render(ctx, (0.5 + this.body.pos.x) << 0, (0.5 + this.body.pos.y) << 0);

				// _width and _height include any scaling associated with the body
				ctx.drawImage(rInfo.texture, rInfo.sx, rInfo.sy, rInfo.tileWidth, rInfo.tileHeight, 0.5 + this.body.pos.x << 0, 0.5 + this.body.pos.y << 0, this.shape.width, this.shape.height);
			} else if (this.image && this.body.shape) {

				ctx.drawImage(this.image, 0.5 + this.body.pos.x << 0, 0.5 + this.body.pos.y << 0, this.shape.width, this.shape.height);
			} else {

				ctx.drawImage(this.image, 0.5 + this.body.pos.x << 0, 0.5 + this.body.pos.y << 0, this.shape.width, this.shape.height);
			}
			this.needsRendered = false;
			// Not rounding makes the images appear fuzzy
			// this.currentAnimation.render(this.world.ctx, this.pos.x, this.pos.y);
		}

		/**
   * Set the position of the sprite. Also lets the world know that the sprite
   * needs to be rendered again.
   */

	}, {
		key: 'setPos',
		value: function setPos(x, y) {

			// If the position is different than the previous position we will render
			// the sprite again
			if (this.pos.x !== x || this.pos.y !== y) this.queForRender();
			this.last.pos.x = this.pos.x;
			this.last.pos.y = this.pos.y;
			this.pos.x = x;
			this.pos.y = y;
		}

		/**
   * Add a position value to the current position of the Sprite
   */

	}, {
		key: 'addPos',
		value: function addPos(x, y) {

			this.body.setPos(this.body.pos.x + x, this.body.pos.y + y);
		}

		/**
   * Let the screen/layer know that this sprite has changed and needs to be
   * rendered again.
   * @private
   */

	}, {
		key: 'queForRender',
		value: function queForRender() {

			this.needsRendered = true;
		}
	}]);

	return Sprite;
}();

exports.default = Sprite;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a mathematics helper class
 */
var C = function () {
  function C() {
    _classCallCheck(this, C);
  }

  _createClass(C, null, [{
    key: "random",


    /**
     * Returns a random value between min (inclusive) and max (inclusive)
     */
    value: function random(min, max) {

      return Math.random() * (max - min + 1) + min;
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     */

  }, {
    key: "randomInt",
    value: function randomInt(min, max) {

      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Returns an array of integers from min (inclusive) to max (exclusive)
     */

  }, {
    key: "range",
    value: function range(min, max) {

      var l = [];
      for (var i = min; i < max; i++) {
        l.push(i);
      }return l;
    }
  }]);

  return C;
}();

exports.default = C;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = exports.Physics = exports.Rectangle = exports.C = exports.Vector = exports.Engine = undefined;

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

var _C = __webpack_require__(8);

var _C2 = _interopRequireDefault(_C);

var _Rectangle = __webpack_require__(5);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Physics = __webpack_require__(33);

var _Physics2 = _interopRequireDefault(_Physics);

var _Body = __webpack_require__(21);

var _Body2 = _interopRequireDefault(_Body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Engine = _Engine2.default;
exports.Vector = _Vector2.default;
exports.C = _C2.default;
exports.Rectangle = _Rectangle2.default;
exports.Physics = _Physics2.default;
exports.Body = _Body2.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global Engine*/
/**
 * Describes a simple memory cache for resources
 * @constructor
 * @returns {StockPile} instance
 */
var StockPile = function () {
	function StockPile() {
		_classCallCheck(this, StockPile);

		this.items = {};
	}

	_createClass(StockPile, [{
		key: "add",
		value: function add(key, obj) {

			this.items[key] = obj;
		}
	}, {
		key: "use",
		value: function use(key) {

			return this.items[key];
		}
	}]);

	return StockPile;
}();

exports.default = StockPile;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global Engine*/
/**
 * Describes a tool for loading remote assets like images, audio, video and text bases resources.
 * @constructor
 * @param {StockPile} cache the cache to use to store the loaded resources
 * @returns {AssetManager} instance
 */
var AssetManager = function () {
	function AssetManager(cache) {
		_classCallCheck(this, AssetManager);

		this.cache = cache;
		this.queue = [];
		this.numCompleted = 0;
	}

	_createClass(AssetManager, [{
		key: 'addToQue',
		value: function addToQue(cacheKey, url) {

			var item = {
				key: cacheKey,
				url: url
			};

			var urlParts = AssetManager.formatLink(url);
			var ext = urlParts.extension;

			if (AssetManager.imageExtensions.indexOf(ext) > -1) {

				item.type = 'image';
			} else if (AssetManager.videoExtensions.indexOf(ext) > -1) {

				item.type = 'video';
			} else if (AssetManager.textExtensions.indexOf(ext) > -1) {

				item.type = 'text';
			} else {

				item.type = 'unknown';
			}

			this.queue.push(item);
		}
	}, {
		key: 'go',
		value: function go(progressCB, finishedCB) {

			if (this.queue.length === 0) return finishedCB();

			this.progressCB = progressCB;
			this.finishedCB = finishedCB;

			for (var i = 0; i < this.queue.length; i++) {

				var item = this.queue[i];

				if (item.type === 'image') {

					this._loadImage(item.key, item.url);
				} else {

					console.error('No support for loading ' + item.type + ' files yet');
				}
			}
		}
	}, {
		key: '_loadImage',
		value: function _loadImage(cacheKey, url) {
			var _this = this;

			var img = new Image();

			// debugger;

			// When finished call
			img.onload = function () {
				_this._updateProgress();
			};

			console.log('Starting image load');
			img.src = url;

			this.cache.add(cacheKey, img);
		}
	}, {
		key: '_updateProgress',
		value: function _updateProgress(err) {

			this.numCompleted++;
			if (this.numCompleted === this.queue.length) {

				this.finishedCB();
			} else {

				this.progressCB(this.numComplete, this.queue.length);
			}
		}
	}], [{
		key: 'formatLink',
		value: function formatLink(url) {

			var a = document.createElement('a');
			a.href = url;

			var parts = a.pathname.split(/(\/|\\)/);
			var extension = parts[parts.length - 1].split('.')[1];
			return {
				pathname: a.pathname,
				extension: extension
			};
		}
	}]);

	return AssetManager;
}();

AssetManager.imageExtensions = ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'bmp', 'gif'];

AssetManager.textExtensions = ['txt', 'json', 'js', 'doc'];

AssetManager.videoExtensions = ['mp4', 'avi', 'mvk', 'mov'];

AssetManager.audioExtensions = ['mp3', 'wma', 'wav'];

exports.default = AssetManager;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneManager = __webpack_require__(14);

var _SceneManager2 = _interopRequireDefault(_SceneManager);

var _Input = __webpack_require__(35);

var _Input2 = _interopRequireDefault(_Input);

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a Game object.
 * @constructor
 * @param {Engine} engine a reference to the Engine
 * @param {Object} [opts] any engine specific options
 * @returns {Game} returns a Game object with a reference to the Engine
 */
var Game = function () {
    function Game(engine, opts) {
        _classCallCheck(this, Game);

        this.engine = engine;
        this.play = new _SceneManager2.default(this);
        this.add = this.play.add;

        // Create or find the container element
        this.container = undefined;
        this._createContainer(opts && opts.container);

        // Create the input object for this game
        this.input = new _Input2.default(this.container);

        // Container setup
        this.width = opts && opts.width || this.container.clientWidth;
        this.height = opts && opts.height || this.container.clientHeight;

        // Keep track of the state of the engine
        this.state = Game.STOPPED;
        this._animationRequest;
    }

    /**
     * Handles the finding or creation of the container DOM element. Essential
     * for handling input and supporting multiple layers.
     * @param {DOMelement|id} [container] Allows a user to specify where in the DOM they want the container.
     * @protected
     */


    _createClass(Game, [{
        key: '_createContainer',
        value: function _createContainer(container) {

            // If the container is a DOM element already we should use it. Otherwise search for given
            // id. Otherwise create the container element and append it to the document body.
            // Clear the container's innerHTML either way.
            if (container) {

                this.container = (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object' ? container : document.getElementById(container);
                this.container.innerHTML = "";
            } else {

                this.container = document.createElement('div');
                this.container.id = 'pancakes';
                document.body.appendChild(this.container);
            }

            this.container.style.position = 'relative';
            this.container.tabIndex = 0;
        }

        /**
         * The main game loop. Has the logic for looping. TODO: improve this.
         * @param {function} update Function containing the update logic
         * @param {function} render Function containing the render logic
         */

    }, {
        key: 'loop',
        value: function loop(update, render) {
            var _this = this;

            var tick = function tick(timestamp) {

                _Engine2.default.measure.end('tick');

                if (_this.state === Game.STOPPED) return;

                _this._animationRequest = window.requestAnimationFrame(tick);

                var delta = timestamp - _this.lastTimestamp;

                // console.log(delta);

                _Engine2.default.measure.begin('update');
                update(delta);
                _Engine2.default.measure.end('update');

                _Engine2.default.measure.begin('render');
                render(delta);
                _Engine2.default.measure.end('render');

                _Engine2.default.measure.log('update', 240);
                _Engine2.default.measure.log('render', 240);
                _Engine2.default.measure.log('tick', 240);

                _this.lastTimestamp = timestamp;
                _Engine2.default.measure.begin('tick');
            };

            // let timestamp = performance.now();
            // const tick = () => {

            //     loops = 0;

            //     while ((new Date).getTime() > nextGameTick) {
            //         update();
            //         nextGameTick += skipTicks;
            //         loops++;
            //     }

            //     if (!loops) {
            //         render((nextGameTick - (new Date).getTime()) / skipTicks);
            //     }
            //     else {
            //         render(0);
            //     }

            //     tick();
            // };

            this.lastTimestamp = performance.now();
            _Engine2.default.measure.begin('tick');
            this._animationRequest = window.requestAnimationFrame(tick);
            this.state = Game.PLAYING;
        }

        /**
         * Stop the current game loop completely.
         */

    }, {
        key: 'stop',
        value: function stop() {

            if (this._animationRequest !== undefined) window.cancelAnimationFrame(this._animationRequest);

            this.state = Game.STOPPED;
        }
    }]);

    return Game;
}();

Game.STOPPED = 0;
Game.PLAYING = 1;
Game.PAUSED = 2;

exports.default = Game;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scene = __webpack_require__(15);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Used to add/remove/change/play/pause scenes
 * @constructor
 * @param {Engine.Game} game reference to the parent game
 * @returns {Engine.SceneManager} manager
 */
var SceneManager = function () {
    function SceneManager(game) {
        _classCallCheck(this, SceneManager);

        this.game = game;
        this.currentScene = null;
        this.scenes = new Map();

        this.add = {};
        this.add.scene = function (name, opts) {

            var scene = new _Scene2.default(this.game, opts);
            this.scenes.set(name, scene);
            return scene;
        }.bind(this);
    }

    /**
     * Used to create a canvas within the game container and return the context
     * for it.
     */


    _createClass(SceneManager, [{
        key: '_createNewCanvas',
        value: function _createNewCanvas() {

            var canvas = document.createElement('canvas');
            this.game.container.appendChild(canvas);
            canvas.width = this.game.width;
            canvas.height = this.game.height;
            canvas.style.position = 'absolute';
            canvas.style.zIndex = 0;

            console.log('Width, height', this.width, this.height);

            return canvas.getContext('2d');
        }

        /**
         * Unload the current screen from memory and remove all layers(canvases) from
         * the game container.
         */

    }, {
        key: '_stop',
        value: function _stop() {

            // Stop the loop in the game
            this.game.stop();

            // Remove any references used in the current screen.
            if (this.currentScene) this.currentScene.destroy();
            // TODO: Stop playing any music associated with the current screen, etc.
            //       What are these things exactly?
            this.game.container.innerHTML = "";
        }

        /**
         * Create the layer canvases needed for the next screen.
         */

    }, {
        key: '_start',
        value: function _start(name) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = this.currentScene.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var layer = _step.value;

                    var ctx = this._createNewCanvas();
                    layer[1].setCtx(ctx);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.currentScene.start();
        }

        /**
         * Used to play the current screen.
         */

    }, {
        key: 'scene',
        value: function scene(name) {

            this._stop();
            this.currentScene = this.scenes.get(name);
            this._start();
        }
    }]);

    return SceneManager;
}();

exports.default = SceneManager;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GUIFactory = __webpack_require__(3);

var _GUIFactory2 = _interopRequireDefault(_GUIFactory);

var _ObjectFactory = __webpack_require__(6);

var _ObjectFactory2 = _interopRequireDefault(_ObjectFactory);

var _LayerFactory = __webpack_require__(26);

var _LayerFactory2 = _interopRequireDefault(_LayerFactory);

var _Camera = __webpack_require__(30);

var _Camera2 = _interopRequireDefault(_Camera);

var _World = __webpack_require__(32);

var _World2 = _interopRequireDefault(_World);

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a Scene. Currently only supports programmed games but will support videos and scripted scenes as well.
 * @constructor
 * @param {Game} game reference to the parent game
 * @param {object} opts any scene specific options
 * @returns {Scene} instance
 */
var Scene = function () {
    function Scene(game, opts) {
        _classCallCheck(this, Scene);

        this.game = game;
        this.cache = game.engine.cache;
        this.load = game.engine.load;

        this.opts = {
            useKeyboard: true,
            useMouse: true,
            size: {
                width: 600,
                height: 400
            }
        };

        Object.assign(this.opts, opts);

        this.animations = []; // Reference to all of the animations that live within this scene
        this.layers = new Map(); // Reference to all of the layers within this scene

        this.initCB = opts.init;
        this.updateCB = opts.update;
        this.loadCB = opts.load;
        this.loadProgressCB = opts.loadProgress;

        // Create layer factory and default layer
        this.new = new _LayerFactory2.default(this);

        // Create the world for this scene
        this.world = new _World2.default(this, this.opts.size.width, this.opts.size.height);

        // Camera for the scene
        this.camera = new _Camera2.default(this.world, 0, 0, this.game.width, this.game.height);

        this._createDefaultLayer();
    }

    /**
     * Creates the default layers.
     */


    _createClass(Scene, [{
        key: '_createDefaultLayer',
        value: function _createDefaultLayer() {

            if (this.opts.type === 'gui') {
                this.new.guiLayer('default', { zIndex: 1000 });
                this.add = new _GUIFactory2.default(this.scene, this.layers.get('default'), _Engine2.default.cache);
            } else {
                this.new.layer('default', { zIndex: 1000 });
                this.add = new _ObjectFactory2.default(this.scene, this.world, this.layers.get('default'), _Engine2.default.cache);
            }
        }

        /**
         * Actually load the assets that are queued via the .load interface.
         */

    }, {
        key: '_performLoad',
        value: function _performLoad() {
            var _this = this;

            if (this.loadCB) this.loadCB(this);

            this.game.engine.assetManager.go(function (completed, total) {

                _this.loadProgress(completed, total);
            }, function () {

                console.log('Finished loading');
                setTimeout(_this.init.bind(_this), 200);
            });
        }

        /**
         * Call the load progress callback.
         */

    }, {
        key: 'loadProgress',
        value: function loadProgress(completed, total) {

            if (this.loadProgressCB) this.loadProgressCB(completed, total);
        }

        /**
         * Perform any screen level initialization. Primarily used to create
         * any user supplied sprites/objs.
         */

    }, {
        key: 'init',
        value: function init() {

            // Start listening to keyboard input by default
            if (this.opts.useKeyboard) this.game.input.startKeyboard();

            if (this.opts.useMouse) this.game.input.startMouse();

            // Do any layer specific setup
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var layer = _step.value;

                    layer[1].boot(this);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (this.initCB) this.initCB(this);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.layers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _layer = _step2.value;

                    _layer[1].init(this);
                }

                // TODO: Send a single update -> http://stackoverflow.com/a/22986867/5551941
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.game.loop(this.update.bind(this), this.render.bind(this));
        }

        /**
         * Screen level update function.
         */

    }, {
        key: 'update',
        value: function update(delta) {

            // Perform user supplied updates first
            if (this.updateCB) this.updateCB(delta);

            // This call updates each sprite in the world and performs any physics
            // that are necessary.
            this.world.update(delta);

            // Always update the camera last
            this.camera.update(delta);
        }

        /**
         * Render each layer.
         */

    }, {
        key: 'render',
        value: function render(delta) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {

                for (var _iterator3 = this.layers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var layer = _step3.value;


                    layer[1].render(delta, -this.camera.pos.x, -this.camera.pos.y);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         * Start the screen by loading and then initializing the screen.
         */

    }, {
        key: 'start',
        value: function start() {

            this._performLoad();
        }

        /**
         * Destroy any unecessary parts of the scene
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            // Stop the game input
            this.game.input.stopKeyboard();
            this.game.input.stopMouse();

            this.animations = [];

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.layers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var layer = _step4.value;


                    layer[1].destroy();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.world.destroy();

            this.layers = new Map();
            this._createDefaultLayer();
        }
    }]);

    return Scene;
}();

exports.default = Scene;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a custom event
 * @constructor
 * @param {string} name what kind of event is this?
 * @returns {Event} instance
 */
var Event = function () {
    function Event(name) {
        _classCallCheck(this, Event);

        this.name = name;
        this.callbacks = [];
    }

    /**
     * Register a callback for this event
     * @param {function} cb the function to be called when this event fires
     */


    _createClass(Event, [{
        key: "registerCallback",
        value: function registerCallback(cb) {

            this.callbacks.push(cb);
        }
    }]);

    return Event;
}();

exports.default = Event;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An abstract text object on the display.
 */
var Text = function () {
    function Text(x, y, content, opts) {
        _classCallCheck(this, Text);

        this.pos = new _Vector2.default(x, y);
        this.content = content;

        this.opts = {
            style: "black", // Style of the font
            size: 48, // Size must be in pixels
            type: "serif" // The font type to use
        };

        Object.assign(this.opts, opts);

        this.font = this.opts.size + 'px ' + this.opts.type;
    }

    /**
     * Calculate the width of the text.
     */


    _createClass(Text, [{
        key: "_calculateSize",
        value: function _calculateSize(ctx) {

            ctx.font = this.font;
            var measurement = ctx.measureText(this.content);

            this.width = measurement.width;
            this.height = this.opts.size;
        }

        /**
         * Render the Text
         * @param {CanvasRenderingContext2D} ctx
         * @private
         */

    }, {
        key: "render",
        value: function render(ctx) {

            // ctx.fillStyle = 'red';
            ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);

            ctx.font = this.font;
            ctx.fillStyle = this.opts.style;
            ctx.fillText(this.content, this.pos.x, this.pos.y);
        }
    }]);

    return Text;
}();

exports.default = Text;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = function () {
    function ProgressBar(x, y, opts) {
        _classCallCheck(this, ProgressBar);

        this.pos = new _Vector2.default(x, y);

        this.max = 1; // The max value of the progress bar
        this.width = 100; // The width of the progress bar
        this.height = 30; // The height of the progress bar
        this.value = undefined; // The current value of the progress bar
        this.ref = undefined; // Reference to the object holding the progress value. Allows you to attach the progress bar directly to the character.
        this.refKey = undefined; // Which property on the referenced object should we watch?
        this.color = "red"; // Color of the progress bar
        this.borderColor = "black"; // Color of the border on the progress bar
        this.borderWidth = 4; // Size of the border on the progress bar
        this.spectrum = undefined; // TODO: Are we going to use a color spectrum to define this progress bar?

        // Apply options
        Object.assign(this, opts);
    }

    /**
     * Render the progress bar on the given context.
     * @param {CanvasRenderContext2D} ctx
     * @private
     */


    _createClass(ProgressBar, [{
        key: "render",
        value: function render(ctx) {

            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

            ctx.strokeStyle = this.borderColor;
            ctx.lineWidth = this.borderWidth;
            ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
        }
    }]);

    return ProgressBar;
}();

exports.default = ProgressBar;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GroupFactory = __webpack_require__(20);

var _GroupFactory2 = _interopRequireDefault(_GroupFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a collection of sprites to perform bulk operations on
 * @constructor
 * @param {Engine.Scene} scene Reference to the parent scene
 * @param {Engine.World} world Reference to the parent world
 * @param {array} arr any sprites to add to the Group initially
 * @returns {Engine.Group} instance
 */
var Group = function () {

    // TODO: Allow for sprites to be grouped together for rendering, updating, physics, etc.
    function Group(scene, world, layer, arr) {
        _classCallCheck(this, Group);

        this.members = arr || [];
        this.add = new _GroupFactory2.default(scene, world, layer, this);
    }

    /**
     * Enable physics on all members
     */


    _createClass(Group, [{
        key: 'enablePhysics',
        value: function enablePhysics() {

            var i = this.members.length;
            while (i--) {
                this.members[i].enablePhysics();
            }
        }

        /**
         * Call collidesWith on each member of this group
         */

    }, {
        key: 'collidesWith',
        value: function collidesWith(what) {

            var i = this.members.length;
            while (i--) {
                this.members[i].collidesWith(what);
            }
        }
    }]);

    return Group;
}();

exports.default = Group;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite = __webpack_require__(7);

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Essentially mirror the API of the Engine.Sprite object to provide a simple way
 * to make changes to the entire group.
 * @constructor
 * @param {Scene} scene - The parent scene
 * @param {World} world - The parent world
 * @param {Layer} layer - The parent layer
 * @param {Group} group - The parent group
 */
var GroupFactory = function () {
    function GroupFactory(scene, world, layer, group) {
        _classCallCheck(this, GroupFactory);

        this.scene = scene;
        this.world = world;
        this.layer = layer;
        this.group = group;
    }

    /**
     * Add a Sprite to the parent group
     * @param {Integer} x - the x position of the sprite
     * @param {Integer} y - the y position of the sprite
     */


    _createClass(GroupFactory, [{
        key: 'sprite',
        value: function sprite(x, y) {

            var sprite = new _Sprite2.default(this.scene, this.world, x, y);
            this.world.sprites.push(sprite);
            this.layer.sprites.push(sprite);
            this.group.members.push(sprite);
            return sprite;
        }

        /**
         * Add an animation to all of the sprites in this group
         * @link {Sprite.add.animation}
         */

    }, {
        key: 'animation',
        value: function animation() {

            var i = this.group.members.length;
            while (i--) {

                this.group.members[i].add.animation.apply(this.group.members[i].add, arguments);
            }
        }

        /**
         * Add an image to all of the sprites in this group.
         * @link {Sprite.add.image}
         */

    }, {
        key: 'image',
        value: function image() {

            var i = this.group.members.length;
            while (i--) {

                this.group.members[i].add.image.apply(this.group.members[i].add, arguments);
            }
        }
    }]);

    return GroupFactory;
}();

exports.default = GroupFactory;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a physics body
 * @constructor
 * @param {float} x the initial x position of the body in pixels
 * @param {float} y the initial y position of the body in pixels
 * @param {float} vx the initial x velocity of the body in units per second
 * @param {float} vy the initial y velocity of the body in units pixels per second
 * @returns {Engine.Body} instance
 */
var Body = function () {
    function Body(x, y, vx, vy) {
        _classCallCheck(this, Body);

        this.enabled = false; // physics are enabled
        this.fixed = false; // static body not affected by physics
        this.clamped = false; // there is a clamp on the bounds of pos?
        this.bouncy = false; // should the body bounce when it collides with the world bounds?
        this.dynamicScale = false; // indicates if the width of the shape needs recalculated with each update
        this.mass = 100; // mass of the body
        this.maxSpeed = 0; // the normalized maximum speed of the body
        this.friction = Object.create(null, {}); // friction of the body
        this.maxSpeed = Object.create(null, {}); // maximum speed of the body after normalization
        this.gravity = Object(null, {}); // vector representing the gravity on this body

        this.scale = new _Vector2.default(1, 1); // the x and y scale of the body
        this.pos = new _Vector2.default(0, 0); // position of the body
        this.lastPos = new _Vector2.default(0, 0); // last position of the body
        this.vel = new _Vector2.default(0, 0); // velocity of the body
        this.acc = new _Vector2.default(0, 0); // acceleration of the body
        this.angle = 0; // angle of the body
        this.omega = 0; // angular rotation of the body
        this.alpha = 0; // angular acceleration of the body


        this._collisionBodies = new Set(); // Holds the bodies that this body collides with

        if (vx || vy) this.setVel(vx, vy);

        if (x || y) this.setPos(x, y);

        // Private values
        this._vel_tol = 1e-2; // The tolerance at which to call a velocity 0
    }

    /**
     * Specify another body that this body collides with. This uses duck typing
     * to determine if the object/array passed in is valid.
     */


    _createClass(Body, [{
        key: 'collidesWith',
        value: function collidesWith(whatWeAreCollidingWith) {

            if (!whatWeAreCollidingWith) throw Error('collidesWith must have an argument that is a Body, Sprite, Array or Group');

            // This if/else block is used to coerce any of the supported types into a
            // single body that can be added to the private _collisionBodies Set().
            // This results in recursive calls for Groups and Arrays that are passed
            // into this method.
            if (whatWeAreCollidingWith.pos && whatWeAreCollidingWith.vel) {
                // We have a Body object

                if (whatWeAreCollidingWith !== this) this._collisionBodies.add(whatWeAreCollidingWith);
            } else if (whatWeAreCollidingWith.body && whatWeAreCollidingWith.body.pos && whatWeAreCollidingWith.body.vel) {
                // We have a Sprite instance

                if (whatWeAreCollidingWith.body !== this) this._collisionBodies.add(whatWeAreCollidingWith.body);
            } else if (Array.isArray(whatWeAreCollidingWith.members)) {
                // We have a Group object

                var i = whatWeAreCollidingWith.members.length;
                while (i--) {
                    this.collidesWith(whatWeAreCollidingWith.members[i]);
                }
            } else if (Array.isArray(whatWeAreCollidingWith)) {
                // We have an Array

                var _i = whatWeAreCollidingWith.length;
                while (_i--) {
                    this.collidesWith(whatWeAreCollidingWith[_i]);
                }
            } else {
                // We don't have any of the supported types

                throw Error('collidesWith must be passed a Body, Sprite, Array or Group');
            }
        }

        /**
         * Add a shape supported by the physics engine
         */

    }, {
        key: 'addShape',
        value: function addShape(shape) {

            this.shape = shape;
            this._calculateSize();
        }

        /**
         * Recalculate the shape size based on the scale
         * @private
         */

    }, {
        key: '_calculateSize',
        value: function _calculateSize() {

            this.shape._width = this.shape.width * this.scale.x;
            this.shape._height = this.shape.height * this.scale.y;

            console.log('width', this.width, 'height', this.height);
        }

        /**
         * Setter for position
         */

    }, {
        key: 'setPos',
        value: function setPos(x, y) {

            this.pos.x = x;
            this.pos.y = y;
            if (this.shape) this.shape.setPos(x, y);
        }

        /**
         * Setter for velocity
         */

    }, {
        key: 'setVel',
        value: function setVel(x, y) {

            if (x !== undefined) this.vel.x = x;
            if (y !== undefined) this.vel.y = y;
        }

        /**
         * Setter for acceleration
         */

    }, {
        key: 'setAcc',
        value: function setAcc(x, y) {

            this.acc.x = x;
            this.acc.y = y;
        }

        /**
         * Update the position of the body
         * @private
         */

    }, {
        key: 'update',
        value: function update(delta) {

            // accelerate or apply friction
            if (this.acc.x || this.acc.y) {

                this.vel.x += this.acc.x * delta / 400;
                this.vel.y += this.acc.y * delta / 400;
            } else {

                // Apply friction in the x and y directions
                if (this.friction.x) {

                    var FCX = this.friction.x * delta;
                    if (this.vel.x > 0) {
                        this.vel.x -= FCX / 400;

                        if (this.vel.x < this._vel_tol) this.vel.x = 0;
                    } else {
                        this.vel.x += FCX / 400;

                        if (this.vel.x > -this._vel_tol) this.vel.x = 0;
                    }
                }

                if (this.friction.y) {

                    var FCY = this.friction.y * delta;

                    if (this.vel.y > 0) {
                        this.vel.y -= FCY / 400;

                        if (this.vel.y < this._vel_tol) this.vel.y = 0;
                    } else {
                        this.vel.y += FCY / 400;

                        if (this.vel.y > -this._vel_tol) this.vel.y = 0;
                    }
                }
            }

            // Apply gravity
            if (this.gravity.x) {

                this.vel.x += this.gravity.x * delta / 400;
            }
            if (this.gravity.y) {

                this.vel.y += this.gravity.y * delta / 400;
            }

            // Normalize velocity and apply maximum speed
            if (this.normalizedMaxSpeed) {

                var mag = this.vel.mag();
                if (mag > this.normalizedMaxSpeed) {

                    this.vel.x *= this.normalizedMaxSpeed / mag;
                    this.vel.y *= this.normalizedMaxSpeed / mag;
                }
            }

            // Direction specific maxSpeeds
            if (this.maxSpeed.x) {

                if (this.vel.x > this.maxSpeed.x) this.vel.x = this.maxSpeed.x;else if (this.vel.x < -this.maxSpeed.x) this.vel.x = -this.maxSpeed.x;
            }
            if (this.maxSpeed.y) {

                if (this.vel.y > this.maxSpeed.y) this.vel.y = this.maxSpeed.y;else if (this.vel.y < -this.maxSpeed.y) this.vel.y = -this.maxSpeed.y;
            }

            // Add the velocity to the position
            if (this.vel.x || this.vel.y) {
                this.pos.x += this.vel.x * delta / 400;
                this.pos.y += this.vel.y * delta / 400;
                this.shape.setPos(this.pos.x, this.pos.y);
            }

            if (this.dynamicScale) this._calculateSize();

            // TODO: apply rotation acceleration
            // TODO: apply rotation


            // Normalize the angle
            if (this.angle) this.angle = this.angle % Math.PI;
        }
    }]);

    return Body;
}();

exports.default = Body;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animation = __webpack_require__(23);

var _Animation2 = _interopRequireDefault(_Animation);

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

var _Rectangle = __webpack_require__(5);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Factory for adding animations, images and audio to a Sprite.
 */
var SpriteFactory = function () {
  function SpriteFactory(sprite) {
    _classCallCheck(this, SpriteFactory);

    this.sprite = sprite;
  }

  /**
   * Add an animation to the parent Engine.Sprite.
   * @param {string} name - The name of the animation. Used to play the animation later.
   * @param {string} spritesheetKey - The name of the spritesheet associated with this. animation
   * @param {Array} frames - An array of frames in the animation.
   * @param {Integer} totalTime - How many milliseconds long is this animation.
   * @param {Object} options - Any options for this animation.
   */


  _createClass(SpriteFactory, [{
    key: 'animation',
    value: function animation(name, spritesheetKey, frames, totalTime, options) {

      var animation = new _Animation2.default(this.sprite, _Engine2.default.cache.use(spritesheetKey), frames, totalTime, options);
      this.sprite.animations[name] = animation;
      this.sprite.currentAnimation = animation;
      this.sprite.shape = new _Rectangle2.default(0, 0, animation.width, animation.height);
      return animation;
    }

    /**
     * Add a single image to the Sprite. This also defines the sprite shape.
     * @param {string} cacheKey - The name of the image in the game cache.
     */

  }, {
    key: 'image',
    value: function image(cacheKey) {

      this.sprite.image = _Engine2.default.cache.use(cacheKey);
      this.sprite.shape = new _Rectangle2.default(0, 0, this.sprite.image.width, this.sprite.image.height);
    }

    /**
     * Add a single tile from a spritesheet to the Sprite
     * @param {string} spritesheetName The key for the spritesheet
     * @param {int} tileIndex The index of the tile in the spritesheet
     */

  }, {
    key: 'tile',
    value: function tile(spritesheetName, tileIndex) {

      //TODO: How should we handle single tiles?


    }
  }]);

  return SpriteFactory;
}();

exports.default = SpriteFactory;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Reactor = __webpack_require__(2);

var _Reactor2 = _interopRequireDefault(_Reactor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a single sprite based animation
 * @constructor
 * @param {Sprite|Object} parent the parent object that the animation has been assigned to. Usually an instance of Sprite.
 * @param {Spritesheet} spritesheet reference to the spritesheet used by this animation
 * @returns {Animation} instance
 */
var Animation = function () {
    function Animation(parent, spritesheet, frames, animationTime, options) {
        _classCallCheck(this, Animation);

        this.reactor = new _Reactor2.default();
        this.parent = parent;
        this.currentIndex = 0;
        this.frames = frames;
        this.spritesheet = spritesheet;
        this.timeSinceLastFrameChange = 0;
        this.width = spritesheet.tileWidth;
        this.height = spritesheet.tileHeight;

        this.options = {
            debug: false,
            infinite: true
        };

        Object.assign(this.options, options);

        if (options) {
            if (options.backAndForth) {
                this.frames = frames.concat(frames.slice(1, frames.length - 1).reverse());
            }
        }

        this.frameTime = animationTime / this.frames.length;

        // Register the events that can be emitted by an Animation
        this.reactor.register('complete');
        this.reactor.register('start');
        this.reactor.register('repeat');

        this.on = this.reactor.on.bind(this.reactor);
    }

    /**
     * Update the animation. Switch frames if enough time has passed since the last
     * change of the frame.
     * @param {integer} delta - milliseconds since the last update
     */


    _createClass(Animation, [{
        key: 'update',
        value: function update(delta) {

            this.timeSinceLastFrameChange += delta;

            // console.log(this.frameTime, this.currentIndex + '/' + this.frames.length, this.timeSinceLastFrameChange, delta);
            if (this.timeSinceLastFrameChange >= this.frameTime) {

                // Dispatch the animation start event
                if (this.currentIndex === 0) this.reactor.dispatch('start');

                // if we are on the last frame then set it to the first frame
                if (this.currentIndex === this.frames.length - 1) {

                    if (this.options.infinite) {

                        // Dispathc the animation repeat event
                        this.reactor.dispatch('repeat');

                        this.currentIndex = 0;
                    } else {

                        this.reactor.dispatch('complete');
                    }
                } else {

                    this.currentIndex++;
                }

                // The frame has changed so we need to que this for another render
                // debugger;
                this.parent.queForRender();

                this.timeSinceLastFrameChange = this.timeSinceLastFrameChange % this.frameTime;
            }
        }

        /**
         * Resets the animation to the specified index. Resets to the beginning if no index is supplied.
         * @param {Integer} [index=0] - The frame index to return the animation to. Will return to the beginning if index isn't included.
         */

    }, {
        key: 'reset',
        value: function reset(index) {

            this.currentIndex = index || 0;
        }

        /**
         * Called to render the animation
         * @param {CanvasRenderingContext2D} ctx - the canvas rendering context
         * @param {float} x - the x position to render the animation
         * @param {float} y - the y position to render the animation
         */

    }, {
        key: 'render',
        value: function render(ctx, x, y) {

            this.spritesheet.render(ctx, x, y, this.frames[this.currentIndex], this.options.debug);
        }

        /**
         * Get the spritesheet info for the current frame
         */

    }, {
        key: 'getRenderInfo',
        value: function getRenderInfo() {

            return this.spritesheet.getRenderInfo(this.frames[this.currentIndex]);
        }
    }]);

    return Animation;
}();

exports.default = Animation;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Allow Sprites to use the `play` keyword to control audio and animations
 * @param {Engine.Sprite} sprite - The sprite instance associated with this controller.
 */
var SpriteController = function () {
    function SpriteController(sprite) {
        _classCallCheck(this, SpriteController);

        this.sprite = sprite;
    }

    /**
     * Play the animation specified.
     * @param {string} name - The name of the animation that was previously created.
     * @param {boolean} shouldResetCurrent - If this is true then it will restart the current animation if it's the same animation you're trying to play.
     */


    _createClass(SpriteController, [{
        key: "animation",
        value: function animation(name, shouldResetCurrent) {

            if (shouldResetCurrent && this.sprite.currentAnimation === this.sprite.animations[name]) {

                this.sprite.currentAnimation.reset();
            } else {

                this.sprite.currentAnimation = this.sprite.animations[name];
                this.sprite.currentAnimation.reset();
            }
        }
    }]);

    return SpriteController;
}();

exports.default = SpriteController;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a Spritesheet
 * @constructor
 * @param {Image} texture the texture to use when rendering this sheet
 * @param {integer} tileWidth the width of each tile in pixels
 * @param {integer} tileHeight the height of each tile in pixels
 * @param {integer} tilePadding the padding between each tile in pixels
 * @returns {Engine.Body} instance
 */
var Spritesheet = function () {
	function Spritesheet(texture, tileWidth, tileHeight, tilePadding) {
		_classCallCheck(this, Spritesheet);

		this.texture = texture;
		this.spritePositions = [];
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tilePadding = tilePadding;

		this.calculatePositions();
	}

	/**
  * Create the indexes.
  */


	_createClass(Spritesheet, [{
		key: "calculatePositions",
		value: function calculatePositions() {

			var numX = Math.floor(this.texture.width / this.tileWidth);
			var numY = Math.floor(this.texture.height / this.tileHeight);

			for (var y = 0; y < numY; y++) {
				for (var x = 0; x < numX; x++) {

					this.spritePositions.push([x * this.tileWidth, y * this.tileHeight]);
				}
			}
		}

		/**
   * Render frame
   */

	}, {
		key: "render",
		value: function render(ctx, x, y, index, debug) {

			if (debug) {
				ctx.fillStyle = 'lightblue';
				ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
				ctx.fillStyle = "black";
				ctx.fillText(index.toString(), x + this.tileWidth / 2, y + this.tileHeight + 10);
			}
			var clippedPos = this.spritePositions[index];

			ctx.drawImage(this.texture, clippedPos[0], clippedPos[1], this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
		}

		/**
   * Get the properties for the current frame
   */

	}, {
		key: "getRenderInfo",
		value: function getRenderInfo(index) {

			return { texture: this.texture, sx: this.spritePositions[index][0], sy: this.spritePositions[index][1], tileWidth: this.tileWidth, tileHeight: this.tileHeight };
		}
	}]);

	return Spritesheet;
}();

exports.default = Spritesheet;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer = __webpack_require__(27);

var _Layer2 = _interopRequireDefault(_Layer);

var _GUILayer = __webpack_require__(28);

var _GUILayer2 = _interopRequireDefault(_GUILayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A factory used by Scenes to create layers
 * @constructor
 * @param {Engine.Scene} scene the scene to attach layers to
 * @returns {Engine.LayerFactory} instance
 */
var LayerFactory = function () {
    function LayerFactory(scene) {
        _classCallCheck(this, LayerFactory);

        this.scene = scene;
    }

    /**
     * Create a normal game layer. Useful for optimization since we can draw
     * less frequently.
     * @param {string} name - The layer's unique name in the scene.
     * @param {object} [opts]
     */


    _createClass(LayerFactory, [{
        key: 'layer',
        value: function layer(name, opts) {

            var layer = new _Layer2.default(this.scene, opts);
            this.scene.layers.set(name, layer);
            return layer;
        }

        /**
         * Create a GUI layer. This layer can have GUI elements like buttons and
         * text added to it.
         */

    }, {
        key: 'guiLayer',
        value: function guiLayer(name, opts) {

            var layer = new _GUILayer2.default(this.scene, opts);
            this.scene.layers.set(name, layer);
            return layer;
        }
    }]);

    return LayerFactory;
}();

exports.default = LayerFactory;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ObjectFactory = __webpack_require__(6);

var _ObjectFactory2 = _interopRequireDefault(_ObjectFactory);

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstraction of a render layer. Each layer has its own canvas that is layered on top of the other canvases.
 * @constructor
 * @param {Engine.Scene} scene - Reference to the parent Engine.Scene
 * @param {Object} opts - Options used when creating this Layer
 * @param {integer} [opts.depth=1] - Specifies how much the layer should translate with the camera. Higher depth give the effect of the layer being further away. A depth of 0 indicates the layer should not translate at all. A depth of 1 makes the layer translate an equal amount.
 * @param {boolean} [opts.animated=true] - Indicates if there are any animated or moving sprites in the layer. If this is set to false then the layer will only rerender when changes are made.
 * @param {Integer} [opts.zIndex=0] - Indicate where this layer should render in the z plane.
 */
var Layer = function () {
    function Layer(scene, opts) {
        _classCallCheck(this, Layer);

        this.opts = {
            animated: true,
            depth: 1,
            zIndex: 0
        };

        Object.assign(this.opts, opts); // Override default options with user options

        this.scene = scene; // Reference to the parent scene
        this.ctx;
        this.sprites = [];
        this.groups = [];
        this.add = new _ObjectFactory2.default(this.scene, this.scene.world, this, _Engine2.default.cache);
        this.preRenderCB;
        this.postRenderCB;

        this._translate = { x: -10000, y: -10000 }; // Holds the current translate
        this._previousTranslate = { x: -1000, y: -1000 }; // Holds the previous translate
    }

    /**
     * Boot the layer.
     */


    _createClass(Layer, [{
        key: 'boot',
        value: function boot() {

            if (this.opts.zIndex) this.ctx.canvas.style.zIndex = this.opts.zIndex;
        }

        /**
         * Initialize the layer
         */

    }, {
        key: 'init',
        value: function init() {}

        // Does anything need to happen here?

        /**
         * Set the context used to draw this layer.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
         */

    }, {
        key: 'setCtx',
        value: function setCtx(ctx) {

            this.ctx = ctx;
        }

        /**
         * Set the post render CB for this layer
         * @param {Layer~renderCallback} callback - function to be called after the layer has rendered
         */

    }, {
        key: 'setRender',
        value: function setRender(callback) {

            this.postRenderCB = callback;
        }

        /**
         * Set the pre render CB for this layer
         * @param {Layer~renderCallback} callback - function to be called before the layer has rendered
         */

    }, {
        key: 'setPreRender',
        value: function setPreRender(callback) {

            this.preRenderCB = callback;
        }

        /**
         * Render this layer.
         * @param {integer} delta the amount of time since last update
         * @param {float} translateX - how much the camera has translated in the x direction
         * @param {float} translateY - how much the camera has translated in the y direction
         */

    }, {
        key: 'render',
        value: function render(delta, translateX, translateY) {

            this._translate.x = Math.round(translateX / this.opts.depth);
            this._translate.y = Math.round(translateY / this.opts.depth);

            if (this.opts.animated) {

                // Render all the time
                this._redraw(delta);
            } else if (this._translate.x !== this._previousTranslate.x || this._translate.y !== this._previousTranslate.y) {

                // We need to only render changes when they happen
                this._redraw(delta);
                this._previousTranslate.x = this._translate.x;
                this._previousTranslate.y = this._translate.y;
            }
        }

        /**
         * Actually redraw the canvas. Including the preRender and postRender callbacks
         */

    }, {
        key: '_redraw',
        value: function _redraw(delta) {

            // Clear the entire canvas
            this.ctx.clearRect(0, 0, this.scene.game.width, this.scene.game.height);
            this.ctx.save();

            // Translate the context if depth is greater than 0
            if (this.opts.depth) this.ctx.translate(this._translate.x, this._translate.y);

            // Call the preRender callback if we have one
            if (this.preRenderCB) this.preRenderCB(this.ctx, delta);

            // Render all of the sprites in this layer
            var i = this.sprites.length;
            while (i--) {

                // TODO: check if the sprite is within the bounds of the camera
                this.sprites[i].render(this.ctx, delta);
            }

            // Call the postRender callback if we have one
            if (this.postRenderCB) this.postRenderCB(this.ctx, delta);

            // Restore the canvas context
            this.ctx.restore();
        }

        /**
         * Set the apparent depth of the layer
         * @param {Integer} depth - How far back the layer should be
         */

    }, {
        key: 'setDepth',
        value: function setDepth(depth) {
            this.opts.depth = depth;
        }

        /**
         * Destroy the layer.
         * @private
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            this.sprites = [];
            this.groups = [];
            this.ctx = null;
            this._translate = { x: -10000, y: -10000 };
            this._previousTranslate = { x: -1000, y: -1000 };
        }
    }]);

    return Layer;
}();

/**
 * Function that gets called either before or after the layer has rendered
 * @callback Layer~renderCallback
 * @param {CanvasRenderingContext2D} ctx - rendering context for this layer
 * @param {integer} delta - the amount of time since the last render
 */

exports.default = Layer;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GUIFactory = __webpack_require__(3);

var _GUIFactory2 = _interopRequireDefault(_GUIFactory);

var _Geometry = __webpack_require__(29);

var _Geometry2 = _interopRequireDefault(_Geometry);

var _Button = __webpack_require__(4);

var _Button2 = _interopRequireDefault(_Button);

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A layer used for handling
 */
var GUILayer = function () {
    function GUILayer(scene, opts) {
        _classCallCheck(this, GUILayer);

        this.opts = {
            zIndex: 0
        };

        Object.assign(this.opts, opts); // Override default options with user options

        this._mayHaveChanged = true; // Let's the layer know it needs to check if it needs to redraw

        this.scene = scene; // Reference to the parent scene
        this.ctx;
        this.buttons = [];
        this.bars = [];
        this.texts = [];
        this.add = new _GUIFactory2.default(this.scene, this, _Engine2.default.cache);
        this.preRenderCB;
        this.postRenderCB;
    }

    /**
     * Handle mousedown events on this layer
     * @param {object} pos - The position of the cursor.
     * @private
     */


    _createClass(GUILayer, [{
        key: '_handleMouseDown',
        value: function _handleMouseDown(pos) {

            var i = this.buttons.length;
            while (i--) {

                if (_Geometry2.default.rectContains(pos, this.buttons[i].shape)) {

                    this.buttons[i].reactor.dispatch('click');
                    this._mayHaveChanged = true;
                }
            }
        }

        /**
         * Handle mouseup events on this layer
         * @param {object} pos - The position of the cursor.
         * @private
         */

    }, {
        key: '_handleMouseUp',
        value: function _handleMouseUp(pos) {

            var i = this.buttons.length;
            while (i--) {

                if (_Geometry2.default.rectContains(pos, this.buttons[i].shape)) {

                    this.buttons[i].reactor.dispatch('release');
                    this._mayHaveChanged = true;
                }
            }
        }

        /**
         * Handle mousemove events on this layer
         * @param {object} pos - The position of the cursor.
         * @private
         */

    }, {
        key: '_handleMouseMove',
        value: function _handleMouseMove(pos) {

            var i = this.buttons.length;
            while (i--) {

                if (_Geometry2.default.rectContains(pos, this.buttons[i].shape)) {

                    this.buttons[i].reactor.dispatch('hover');
                    this._mayHaveChanged = true;
                } else if (this.buttons[i].state === _Button2.default.HOVER || this.buttons[i].state === _Button2.default.ACTIVE) {

                    this.buttons[i].reactor.dispatch('out');
                    this._mayHaveChanged = true;
                }
            }
        }

        /**
         * Boot the layer.
         */

    }, {
        key: 'boot',
        value: function boot() {

            if (this.opts.zIndex) this.ctx.canvas.style.zIndex = this.opts.zIndex;

            // Initialize mouse input handlers
            this.scene.game.input.on('mousemove', this._handleMouseMove.bind(this));
            this.scene.game.input.on('mousedown', this._handleMouseDown.bind(this));
            this.scene.game.input.on('mouseup', this._handleMouseUp.bind(this));
        }

        /**
         * Intialize the layer.
         */

    }, {
        key: 'init',
        value: function init() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var button = _step.value;


                    button._calculateSize(this.ctx);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.texts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var t = _step2.value;


                    t._calculateSize(this.ctx);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        /**
         * Set the context used to draw this layer.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
         */

    }, {
        key: 'setCtx',
        value: function setCtx(ctx) {

            this.ctx = ctx;
        }

        /**
         * Set the post render CB for this layer
         * @param {Layer~renderCallback} callback - function to be called after the layer has rendered
         */

    }, {
        key: 'setRender',
        value: function setRender(callback) {

            this.postRenderCB = callback;
        }

        /**
         * Set the pre render CB for this layer
         * @param {Layer~renderCallback} callback - function to be called before the layer has rendered
         */

    }, {
        key: 'setPreRender',
        value: function setPreRender(callback) {

            this.preRenderCB = callback;
        }

        /**
         * Render this layer. GUILayers are very exact about the areas they render.
         * Only changes are cleared and rendered again.
         * @param {integer} delta the amount of time since last update
         */

    }, {
        key: 'render',
        value: function render(delta) {

            if (this._mayHaveChanged) {

                // Render buttons
                var i = this.buttons.length;
                while (i--) {

                    if (this.buttons[i]._hasChanged) {
                        this.buttons[i].clear(this.ctx);
                        this.buttons[i].render(this.ctx);
                    }
                }

                // Render progress bars
                i = this.bars.length;
                while (i--) {

                    this.bars[i].render(this.ctx);
                }

                // Render text updates
                i = this.texts.length;
                while (i--) {

                    this.texts[i].render(this.ctx);
                }

                this._mayHaveChanged = false;
            }
        }

        /**
         * Destroy the current layer.
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            this.buttons = [];
            this.bars = [];
            this.texts = [];
            this._mayHaveChanged = true;
        }
    }]);

    return GUILayer;
}();

/**
 * Function that gets called either before or after the layer has rendered
 * @callback Layer~renderCallback
 * @param {CanvasRenderingContext2D} ctx - rendering context for this layer
 * @param {integer} delta - the amount of time since the last render
 */

exports.default = GUILayer;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds the static logic for checking intersections
 */
var Geometry = function () {
    function Geometry() {
        _classCallCheck(this, Geometry);
    }

    _createClass(Geometry, null, [{
        key: 'intersects',


        /**
         * Generic method to take two objects of any type and see if they intersect.
         */
        value: function intersects(a, b) {

            if (a.shape.type === _Engine2.default.RECTANGLE && b.shape.type === _Engine2.default.RECTANGLE) {
                return Geometry.rectsIntersect(a.shape, b.shape);
            } else {
                console.error('Unsupported shape type');
            }
        }

        /**
         * Check if a rectangle contains a point.
         * @param {{x,y}} point - Holds the x and y positions for the point.
         * @param {Engine.Rectangle} rect - Holds the rectangle to check.
         */

    }, {
        key: 'rectContains',
        value: function rectContains(point, rect) {

            return point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;
        }

        /**
         * Check if two rectangles intersect
         */

    }, {
        key: 'rectsIntersect',
        value: function rectsIntersect(a, b) {

            return !(a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top);
        }
    }]);

    return Geometry;
}();

exports.default = Geometry;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

var _Tween = __webpack_require__(31);

var _Tween2 = _interopRequireDefault(_Tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes the where/how the current world should be displayed
 * @constructor
 * @param {Engine.World} world reference to the world the camera is associated with
 * @param {float} x the initial x position of the camera
 * @param {float} y the initial y position of the camera
 * @param {float} width the initial width of the camera
 * @param {float} height the initial height of the camera
 * @returns {Engine.Camera} instance
 */
var Camera = function () {
    function Camera(world, x, y, width, height) {
        _classCallCheck(this, Camera);

        this.world = world; // Reference to the world
        this.followBodies = []; // Array of the bodies it should follow
        this.pos = new _Vector2.default(x || 0, y || 0);
        this.size = { width: width, height: height };

        this.desiredPos = new _Tween2.default(this.pos, this.pos);
        this.desiredPos.roundToPixel = true;

        // TODO: How to handle when the camera size is larger than the world?
        //       Could center world in the camera or just not move the camera?

        // Set the bounds for the camera
        this.bounds = {
            x: {
                min: 0,
                max: this.world.width - this.size.width
            },
            y: {
                min: 0,
                max: this.world.height - this.size.height
            }
        };
    }

    /**
     * Add a body/sprite to the camera so it can follow it.
     */


    _createClass(Camera, [{
        key: 'follow',
        value: function follow(obj) {

            // Allow for sprites to be passed into this method directly
            if (obj.body) {
                obj = obj.body;
            }

            // Duck typing to check for necessary properties
            if (obj.pos && obj.shape) {

                this.followBodies.push(obj);
            } else {

                console.error("Can't follow an objects without .pos.x, .pos.y and .shape");
            }
        }

        /**
         * Update the camera position. This should happen after all other game
         * objects have been updated :).
         */

    }, {
        key: 'update',
        value: function update(delta) {

            // TODO: make the camera frame and follow multiple bodies. Right now it will only follow the first one added.


            // TODO: handle apparent shakiness of followed character when tween is maxed out.
            //       Could potentially have a max rectangle that the camera keeps the
            //       character within? Or maybe match the camera velocity with the
            //       velocity of the character?

            if (this.followBodies.length) {

                this.desiredPos.setTo({
                    x: this.followBodies[0].pos.x + this.followBodies[0].shape.width / 2 - this.size.width / 2,
                    y: this.followBodies[0].pos.y + this.followBodies[0].shape.height / 2 - this.size.height / 2
                });

                this.desiredPos.update(delta);
                this.desiredPos.ref.clamp(this.bounds.x.min, this.bounds.x.max, this.bounds.y.min, this.bounds.y.max);
            }
        }
    }]);

    return Camera;
}();

exports.default = Camera;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a Tween object that can be used to change properties of an object using different easing functions
 * @constructor
 * @param {Object} ref a reference to the object whose properties should change
 * @param {Object} desired a reference to the desired properties of the object
 * @param {Engine.Tween.EASE_OUT} type the type of easing function to use with this tween
 * @returns {Engine.Tween} instance
 */
var Tween = function () {
    function Tween(ref, desired, type) {
        _classCallCheck(this, Tween);

        this.ref = ref; // Array of references to the values we want to change
        this.desired = desired; // Array of their desired values
        this.type = type || Tween.EASE_OUT;
        this.roundToPixel = false;
        this.finished = false;
        this.speed = 1 / 15;
        this.tolerance = 1e-3;
    }

    /**
     * Update the position based on the specified tweening function
     */


    _createClass(Tween, [{
        key: "update",
        value: function update(delta) {

            var diffX = this.desired.x - this.ref.x;
            var diffY = this.desired.y - this.ref.y;

            // If we are there already it should just return
            if (this.diffX === 0) return;

            // Perform the different tweens
            if (this.type === Tween.EASE_OUT) {

                if (this.roundToPixel) {
                    this.ref.x = Math.round(Tween.easeOut(this.ref.x, this.desired.x, diffX, this.speed));
                    this.ref.y = Math.round(Tween.easeOut(this.ref.y, this.desired.y, diffY, this.speed));
                } else {
                    this.ref.x = Tween.easeOut(this.ref.x, this.desired.x, diffX, this.speed);
                    this.ref.y = Tween.easeOut(this.ref.y, this.desired.y, diffY, this.speed);
                }
            } else {}

            // TODO: additional tweening methods

            // Check if we're within the position tolerance for the x direction
            if (diffX < this.tolerance && diffX > -this.tolerance) this.ref.x = this.desired.x;

            // Check if we're within the position tolerance for the y direction
            if (diffY < this.tolerance && diffY > -this.tolerance) this.ref.y = this.desired.y;
        }

        /**
         * Set the desired value for this tween
         */

    }, {
        key: "setTo",
        value: function setTo(desired) {

            this.desired = desired;

            if (this.roundToPixel) {
                this.desired.x = Math.round(this.desired.x);
                this.desired.y = Math.round(this.desired.y);
            }
        }

        /**
         * Static ease out method
         */

    }], [{
        key: "easeOut",
        value: function easeOut(from, to, diff, speed) {

            return from + diff * speed;
        }
    }]);

    return Tween;
}();

Tween.EASE_OUT = 0;

exports.default = Tween;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Physics = __webpack_require__(33);

var _Physics2 = _interopRequireDefault(_Physics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a container for all of the game objects in a Scene.
 * @constructor
 * @param {object} scene reference to the parent scene
 * @param {integer} width The width of the world in number of pixels
 * @param {integer} height The height of the world in number of pixels
 * @returns {Engine.World} instance
 */
var World = function () {
    function World(scene, width, height) {
        _classCallCheck(this, World);

        this.scene = scene;
        this.width = width;
        this.height = height;

        this.sprites = [];

        // Will be populated if physics are enabled
        this.physics = undefined;

        // use the ObjectFactory from the parent scene
        this.add = this.scene.add;
    }

    /**
     * Update all of the objects in this world comtainer :)
     * @param {integer} delta The number of milliseconds that have passed since the last update
     */


    _createClass(World, [{
        key: 'update',
        value: function update(delta) {

            var i = this.sprites.length;
            while (i--) {

                this.sprites[i].update(delta);
            }

            // Update physics
            if (this.physics) this.physics.tick(delta);
        }

        /**
         * Enable the physics for this world
         * @param {object} opts Any options for the physics engine
         */

    }, {
        key: 'enablePhysics',
        value: function enablePhysics(opts) {

            this.physics = new _Physics2.default(this, opts);
        }

        /**
         * Destroy the world.
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            this.sprites = [];
            this.physics = undefined;
        }
    }]);

    return World;
}();

exports.default = World;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuadTree = __webpack_require__(34);

var _QuadTree2 = _interopRequireDefault(_QuadTree);

var _Geometry = __webpack_require__(29);

var _Geometry2 = _interopRequireDefault(_Geometry);

var _Collision = __webpack_require__(38);

var _Collision2 = _interopRequireDefault(_Collision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles all physics for a world.
 * @constructor
 * @param {World} world reference to the parent world
 * @param {object} opts any specific physics options
 * @returns {Physics} instance
 */
var Physics = function () {
    function Physics(world, options) {
        _classCallCheck(this, Physics);

        this.world = world;
        this.options = {
            rotation: false
        };
        Object.assign(this.options, options);

        // Private Map for memoization when checking collisions. Just used to avoid
        // instantiating a new Map for each tick.
        this._collisionMemo = new Map();
        this.bodies = [];

        this.tree = new _QuadTree2.default();
    }

    /**
     * Clear all bodies from physics
     * @private
     */


    _createClass(Physics, [{
        key: 'clear',
        value: function clear() {

            this._collisionMemo.clear();
            this.bodies = [];
            this.tree.clear();
        }

        /**
         * Add a single body to the physics
         */

    }, {
        key: 'add',
        value: function add(bodies) {

            if (bodies.pos && bodies.vel) {

                this.bodies.push(bodies);
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {

                    for (var _iterator = this.bodies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var body = _step.value;

                        this.bodies.push(body);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }

        /**
         * The physics logic
         * @private
         */

    }, {
        key: 'tick',
        value: function tick(delta) {

            // Clear the memo at the beginning of each tick
            this._collisionMemo.clear();

            // First update the physics bodies
            var i = this.bodies.length;
            while (i--) {
                this.bodies[i].update(delta);

                // Fix bounds
                if (this.bodies[i].clamped) {

                    // Reverse velocities if we've hit the sides
                    if (this.bodies[i].pos.x + this.bodies[i].shape.width > this.world.width || this.bodies[i].pos.x < 0) {

                        if (this.bodies[i].bouncy) this.bodies[i].vel.x = -this.bodies[i].vel.x;else this.bodies[i].vel.x = 0;

                        this.bodies[i].acc.x = 0;
                    }
                    if (this.bodies[i].pos.y + this.bodies[i].shape.height > this.world.height || this.bodies[i].pos.y < 0) {

                        if (this.bodies[i].bouncy) this.bodies[i].vel.y = -this.bodies[i].vel.y;else this.bodies[i].vel.y = 0;

                        this.bodies[i].acc.y = 0;
                    }

                    this.bodies[i].pos.clamp(0, this.world.width - this.bodies[i].shape.width, 0, this.world.height - this.bodies[i].shape.height);
                }
            }

            // Check each body for collision
            // TODO: use a quadtree for this update

            // for(let leftIndex=0; leftIndex<this.bodies.length - 1; leftIndex++){

            //     for(let rightIndex=leftIndex+1; rightIndex<this.bodies.length; rightIndex++){

            //         if(this.bodies[leftIndex] === this.bodies[rightIndex] ||
            //             this._collisionMemo.get(this.bodies[leftIndex]) === this.bodies[rightIndex] ||
            //             !this.bodies[leftIndex].enabled || !this.bodies[rightIndex].enabled){

            //             // These bodies have already collided
            //             continue;

            //         }
            //         else if(Engine.Geometry.intersects(this.bodies[leftIndex], this.bodies[rightIndex])){

            //             // Check for intersect of these two bodies
            //             this._collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);    // Record this collision so we don't repeat calculations
            //             Engine.Collision.collision(this.bodies[leftIndex], this.bodies[rightIndex]);       // Calculate the collision of these bodies

            //         }

            //     }

            // }


            var rightIndex = this.bodies.length;
            var leftIndex = 0;
            // console.time('collisionCheck');
            while (rightIndex--) {

                leftIndex = 0;
                while (leftIndex < rightIndex) {

                    // console.log(leftIndex, rightIndex);
                    if (this.bodies[leftIndex] !== this.bodies[rightIndex] && this.bodies[leftIndex].enabled && this.bodies[rightIndex].enabled) {
                        // Don't collide with yourself and make sure they are enabled

                        // console.log('body is not itself and both bodies are enabled');

                        if (this.bodies[leftIndex]._collisionBodies.has(this.bodies[rightIndex]) || this.bodies[rightIndex]._collisionBodies.has(this.bodies[leftIndex])) {

                            if (this._collisionMemo.get(this.bodies[leftIndex]) !== this.bodies[rightIndex] || this._collisionMemo.get(this.bodies[rightIndex]) !== this.bodies[leftIndex]) {

                                // console.log('Can collide');
                                if (_Geometry2.default.intersects(this.bodies[leftIndex], this.bodies[rightIndex])) {
                                    // TODO: doesn't this form of memoization limit me to one collision per body per update???
                                    this._collisionMemo.set(this.bodies[leftIndex], this.bodies[rightIndex]);
                                    this._collisionMemo.set(this.bodies[rightIndex], this.bodies[leftIndex]);
                                    // console.log(leftIndex, rightIndex)

                                    _Collision2.default.collision(this.bodies[leftIndex], this.bodies[rightIndex]);
                                }
                            }
                        }
                    }

                    leftIndex++;
                }
            }
            // console.timeEnd('collisionCheck');
        }
    }]);

    return Physics;
}();

exports.default = Physics;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Will someday help simplify collision checking by minimizing the number of checks we are making
 * @constructor
 */
var QuadTree = function () {
  function QuadTree() {
    _classCallCheck(this, QuadTree);
  }

  /**
   * Clear the QuadTree
   */


  _createClass(QuadTree, [{
    key: "clear",
    value: function clear() {}
  }]);

  return QuadTree;
}();

exports.default = QuadTree;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Reactor = __webpack_require__(2);

var _Reactor2 = _interopRequireDefault(_Reactor);

var _Keyboard = __webpack_require__(36);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describes a object that handles keyboard, mouse and touch input for each scene.
 * @constructor
 * @param {DOMElement} element the DOM node to attach input events to
 * @returns {Input} instance
 */
var Input = function () {
    function Input(element) {
        _classCallCheck(this, Input);

        // TODO: handle event callbacks for individual keycodes

        this.element = element; // The element to attach events to
        this.elementRect = element.getBoundingClientRect();
        this.keyboard = undefined; // Holds keyboard specific logic
        this.reactor = new _Reactor2.default(); // Used to dispatch custom events

        this.isListening = {
            keyboard: {
                down: false,
                up: false
            }
        };

        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);
        this._handleMouseMove = this._handleMouseMove.bind(this);

        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleKeyUp = this._handleKeyUp.bind(this);
    }

    /**
     * "on()" method to handle callbacks for the different types of events
     */


    _createClass(Input, [{
        key: 'on',
        value: function on(eventName, cb, opts) {

            this.reactor.on(eventName, cb, opts);
        }

        /**
         * Private handler of keydown events.
         */

    }, {
        key: '_handleKeyDown',
        value: function _handleKeyDown(event) {

            var key = this.keyboard.keys[_Keyboard2.default.keyCodes[event.keyCode]];
            if (key.isDown) key.isHeld = true;

            key.isDown = true;
            key.isUp = false;

            event.preventDefault();
        }

        /**
         * Private handler of keyup events.
         */

    }, {
        key: '_handleKeyUp',
        value: function _handleKeyUp(event) {

            var key = this.keyboard.keys[_Keyboard2.default.keyCodes[event.keyCode]];
            key.isHeld = false;
            key.isDown = false;
            key.isUp = true;

            event.preventDefault();
        }

        /**
         * Start listening to keydown and keyup events.
         */

    }, {
        key: 'startKeyboard',
        value: function startKeyboard() {

            this.keyboard = new _Keyboard2.default();
            console.log('keyboard defined', this.keyboard);
            this.element.addEventListener('keydown', this._handleKeyDown);
            this.element.addEventListener('keyup', this._handleKeyUp);

            this.isListening.keyboard.down = true;
            this.isListening.keyboard.up = true;
        }

        /**
         * Stop listening to keydown and keyup events.
         */

    }, {
        key: 'stopKeyboard',
        value: function stopKeyboard() {

            this.element.removeEventListener('keydown', this._handleKeyDown);
            this.element.removeEventListener('keyup', this._handleKeyUp);

            this.isListening.keyboard.down = false;
            this.isListening.keyboard.up = false;
        }

        /**
         * Handle mouse down
         */

    }, {
        key: '_handleMouseDown',
        value: function _handleMouseDown(event) {

            var pos = this.getMousePosition(event);
            this.reactor.dispatch('mousedown', pos);
        }

        /**
         *
         * Handle mouse down
         */

    }, {
        key: '_handleMouseUp',
        value: function _handleMouseUp(event) {

            var pos = this.getMousePosition(event);
            this.reactor.dispatch('mouseup', pos);
        }

        /**
         * Handle mouse down
         */

    }, {
        key: '_handleMouseMove',
        value: function _handleMouseMove(event) {

            var pos = this.getMousePosition(event);
            this.reactor.dispatch('mousemove', pos);
        }

        /**
         * Start listening to mouse events
         */

    }, {
        key: 'startMouse',
        value: function startMouse() {

            this.reactor.register('mousemove');
            this.reactor.register('mousedown');
            this.reactor.register('mouseup');

            this.element.addEventListener('mousemove', this._handleMouseMove);
            this.element.addEventListener('mousedown', this._handleMouseDown);
            this.element.addEventListener('mouseup', this._handleMouseUp);
        }

        /**
         * Stop listening to mouse events
         */

    }, {
        key: 'stopMouse',
        value: function stopMouse() {

            this.reactor.unregister('mousemove');
            this.reactor.unregister('mousedown');
            this.reactor.unregister('mouseup');

            this.element.removeEventListener('mousemove', this._handleMouseMove);
            this.element.removeEventListener('mousedown', this._handleMouseDown);
            this.element.removeEventListener('mouseup', this._handleMouseUp);
        }

        /**
         * Convert the mouse event coordinates into a valid mouse position
         */

    }, {
        key: 'getMousePosition',
        value: function getMousePosition(event) {

            return {
                x: event.clientX - this.elementRect.left,
                y: event.clientY - this.elementRect.top
            };
        }
    }]);

    return Input;
}();

exports.default = Input;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstraction of a Keyboard. Holds keycode information and holdes the state of each key for easy access
 * @constructor
 * @returns {Keyboard} instance
 */
var Keyboard = function () {
    function Keyboard() {
        _classCallCheck(this, Keyboard);

        this.keys = Object.keys(Keyboard.keyCodes).reduce(function (keys, code) {

            keys[Keyboard.keyCodes[code]] = {
                isDown: false,
                isUp: true,
                isHeld: false
            };

            return keys;
        }, {});
    }

    /**
     * Map the keycode to the key name
     */


    _createClass(Keyboard, null, [{
        key: "map",
        value: function map(keyCode) {

            return Keyboard.keyCodes[keyCode];
        }

        /**
         * Map the keyname to the keycode
         */

    }, {
        key: "mapName",
        value: function mapName(keyName) {

            return Keyboard.keys[keyName.toUpperCase()];
        }
    }]);

    return Keyboard;
}();

// Hardcoded keycodes


Keyboard.keyCodes = { 8: "BACKSPACE", 9: "TAB", 13: "ENTER", 16: "SHIFT", 17: "CTRL", 18: "ALT", 19: "PAUSE/BREAK", 20: "CAPS LOCK", 27: "ESC", 32: "SPACE", 33: "PAGE UP", 34: "PAGE DOWN", 35: "END", 36: "HOME", 37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 45: "Insert", 46: "Delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "Windows", 93: "Right Click", 96: "Numpad 0", 97: "Numpad 1", 98: "Numpad 2", 99: "Numpad 3", 100: "Numpad 4", 101: "Numpad 5", 102: "Numpad 6", 103: "Numpad 7", 104: "Numpad 8", 105: "Numpad 9", 106: "Numpad *", 107: "Numpad +", 109: "Numpad -", 110: "Numpad .", 111: "Numpad /", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Num Lock", 145: "Scroll Lock", 182: "My Computer", 183: "My Calculator", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" };

exports.default = Keyboard;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Measure = exports.Measure = function () {
    function Measure() {
        _classCallCheck(this, Measure);

        this.measurements = {};
    }

    _createClass(Measure, [{
        key: "add",
        value: function add(name) {

            this.measurements[name] = new Measurement();
        }
    }, {
        key: "begin",
        value: function begin(name) {

            if (!this.measurements[name]) this.add(name);
            this.measurements[name].begin();
        }
    }, {
        key: "end",
        value: function end(name) {

            this.measurements[name].end();
        }
    }, {
        key: "log",
        value: function log(name, frequency) {

            this.measurements[name].log(name, frequency);
        }
    }]);

    return Measure;
}();

var Measurement = exports.Measurement = function () {
    function Measurement() {
        _classCallCheck(this, Measurement);

        this.sum = 0;
        this.values = [];
        this.count = 0;
        this.startTime;
        this.endTime;
    }

    _createClass(Measurement, [{
        key: "begin",
        value: function begin() {

            this.startTime = performance.now();
        }
    }, {
        key: "end",
        value: function end() {

            this.endTime = performance.now();
            this.sum += this.endTime - this.startTime;
            this.values.push(this.endTime - this.startTime);
            this.count++;
        }
    }, {
        key: "log",
        value: function log(name, frequency) {

            if (this.count % frequency === 0) console.log(name + " - Full Average: " + this.sum / this.count + ", Average of last 10: " + this.values.slice(-10).reduce(function (a, v) {
                return a + v;
            }) / 10);
        }
    }]);

    return Measurement;
}();

exports.default = Measure;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Engine = __webpack_require__(0);

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds the static logic for newtonian collision calculations
 */
var Collision = function () {
    function Collision() {
        _classCallCheck(this, Collision);
    }

    _createClass(Collision, null, [{
        key: 'collision',


        /**
         * Collision handler
         */
        value: function collision(a, b) {

            if (a.shape.type === _Engine2.default.RECTANGLE && b.shape.type === _Engine2.default.RECTANGLE) {

                return Collision.rectangleCollision(a, b);
            }
        }

        /**
         * Calculate the final velocity and position of two rectangles colliding
         */

    }, {
        key: 'rectangleCollision',
        value: function rectangleCollision(a, b) {

            var dxPos = a.shape.centerX - b.shape.centerX;
            var dyPos = a.shape.centerY - b.shape.centerY;
            var dxVel = a.vel.x - b.vel.x;
            var dyVel = a.vel.y - b.vel.y;

            if (a.shape.left < b.shape.right && a.shape.right > b.shape.left) {
                // React in X direction because that the is the direction the rectangles
                // must be colliding in.

                // Calculate the final velocities of the rectangles
                var vels = Collision.elasticParticleCollision1D(a.vel.x, a.mass, b.vel.x, b.mass);
                a.vel.x = vels[0];
                b.vel.x = vels[1];

                // Move the rectangles so that they don't accidentally collide on the next tick
                var fullWidth = (a.shape.width + b.shape.width) / 2;
                var widthDiff = (fullWidth - Math.abs(dxPos)) / 2 + .01;
                // console.log('X collision:', fullWidth, dxPos, widthDiff);
                if (widthDiff > 1) {}
                // console.log('X error');
                // console.dir(a);
                // console.dir(b);

                // if(a.vel.x > 0){
                a.pos.x -= widthDiff;
                b.pos.x += widthDiff;
                // }
                // else if(a.vel.x < 0){
                //     a.pos.x += widthDiff;
                //     b.pos.x -= widthDiff;
                // }
            } else {
                // React in Y direction because the rectangles must be hitting in the
                // y direction or on a corner. Either way we just assume the y direction
                // is colliding.

                // Calculate the final velocities of the rectangles
                var _vels = Collision.elasticParticleCollision1D(a.vel.y, a.mass, b.vel.y, b.mass);
                a.vel.y = _vels[0];
                b.vel.y = _vels[1];

                // Move the rectangles so that they don't accidentally collide on the next tick
                var fullHeight = (a.shape.height + b.shape.height) / 2;
                var heightDiff = (fullHeight - Math.abs(dyPos)) / 2 >> 0;
                // console.log('Y collision:', fullHeight, dyPos, heightDiff);
                if (heightDiff > 1) {}
                // console.log('Y error');
                // console.dir(a);
                // console.dir(b);

                // if(a.vel.y > 0){
                a.pos.y -= heightDiff;
                b.pos.y += heightDiff;
                // }
                // else if(a.vel.y < 0){
                //     a.pos.y += heightDiff;
                //     b.pos.y -= heightDiff;
                // }
            }
        }

        /*
         *  Calculates final velocities for 1D elastic particle collision
         */

    }, {
        key: 'elasticParticleCollision1D',
        value: function elasticParticleCollision1D(v_1, m_1, v_2, m_2) {

            var v_1_f = v_1 * ((m_1 - m_2) / (m_1 + m_2)) + v_2 * (2 * m_2 / (m_1 + m_2));

            var v_2_f = v_1 * (2 * m_1 / (m_1 + m_2)) + v_2 * ((m_2 - m_1) / (m_1 + m_2));

            return [v_1_f, v_2_f];
        }

        /*
         *  Returns the final velocities for two particles SLAMMING
         */

    }, {
        key: 'elasticParticleCollision2D',
        value: function elasticParticleCollision2D(v_1, m_1, v_2, m_2) {

            var v_f_x = Collision.elasticParticleCollision1D(v_1.x, m_1, v_2.x, m_2);

            var v_f_y = Collision.elasticParticleCollision1D(v_1.y, m_1, v_2.y, m_2);

            return [v_f_x, v_f_y];
        }
    }]);

    return Collision;
}();

exports.default = Collision;

/***/ })
/******/ ]);