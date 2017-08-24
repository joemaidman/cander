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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = __webpack_require__(1);
var CanvasView_1 = __webpack_require__(3);
var Square_1 = __webpack_require__(4);
var canvas = document.getElementById('game');
var viewPort = new CanvasView_1.default(canvas);
var actors = new Array();
var strategies = new Array();
for (var num = 0; num < 100; num++) {
    actors.push(new Square_1.default(Math.floor(Math.random() * 500) + 0, Math.floor(Math.random() * 500) + 0, 1, 1, 30, 30, Math.floor(Math.random() * 255) + 0, Math.floor(Math.random() * 255) + 0, Math.floor(Math.random() * 255) + 0, 1, strategies));
}
var engine = new Engine_1.default(viewPort, actors);
engine.start();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Jelly_1 = __webpack_require__(2);
var Engine = (function () {
    function Engine(view, actors) {
        this.view = view;
        this.actors = actors;
        this.timeStep = 1000 / 60;
        this.delta = 0;
        this.targetFPS = 60;
        this.isStarted = false;
        this.isRunning = false;
    }
    Engine.prototype.start = function () {
        var _this = this;
        if (!this.isStarted) {
            this.isStarted = true;
            this.currentFrameID = requestAnimationFrame(function (timestamp) {
                _this.draw();
                _this.isRunning = true;
                _this.lastFrameTimeMs = timestamp;
                _this.currentFrameID = requestAnimationFrame(_this.loop.bind(_this));
            });
        }
    };
    Engine.prototype.stop = function () {
        this.isRunning = false;
        this.isStarted = false;
        cancelAnimationFrame(this.currentFrameID);
    };
    Engine.prototype.loop = function (timeStamp) {
        if (timeStamp < this.lastFrameTimeMs + this.timeStep) {
            this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
            return;
        }
        this.delta += timeStamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timeStamp;
        var numUpdateSteps = 0;
        while (this.delta >= this.timeStep) {
            this.update(this.timeStep);
            this.delta -= this.timeStep;
            if (++numUpdateSteps >= 240) {
                this.abort();
                break;
            }
        }
        this.draw();
        this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
    };
    Engine.prototype.update = function (delta) {
        var _this = this;
        this.actors.forEach(function (actor) {
            actor.update(new Jelly_1.default(), _this.view.width, _this.view.height, delta);
        });
    };
    Engine.prototype.draw = function () {
        this.view.render(this.actors);
    };
    Engine.prototype.abort = function () {
        this.delta = 0;
    };
    return Engine;
}());
exports.default = Engine;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Jelly = (function () {
    function Jelly() {
    }
    Jelly.prototype.run = function (actor, maxX, maxY, delta) {
        var xLeft = maxX - actor.x;
        var yLeft = maxY - actor.y;
        if (Math.random() >= 0.5) {
            actor.x += (Math.min(xLeft, 1) * (delta / 60));
        }
        else {
            actor.x -= (Math.min(xLeft, 1) * (delta / 60));
        }
        if (Math.random() >= 0.5) {
            actor.y += (Math.min(yLeft, 1) * (delta / 60));
        }
        else {
            actor.y -= (Math.min(yLeft, 1) * (delta / 60));
        }
    };
    return Jelly;
}());
exports.default = Jelly;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CanvasView = (function () {
    function CanvasView(viewPort) {
        if (viewPort === void 0) { viewPort = document.createElement('canvas'); }
        this.viewPort = viewPort;
        this.context = this.viewPort.getContext('2d');
        this.width = viewPort.width;
        this.height = viewPort.height;
    }
    CanvasView.prototype.render = function (actors) {
        var _this = this;
        this.clearViewPort();
        actors.forEach(function (actor) {
            _this.setContextFillStyle(actor.red, actor.green, actor.blue, actor.opacity);
            _this.fillRect(actor.x, actor.y, actor.width, actor.height);
        }, this);
    };
    CanvasView.prototype.clearViewPort = function () {
        this.setContextFillStyle(255, 255, 255, 1);
        this.context.clearRect(0, 0, this.width, this.height);
    };
    CanvasView.prototype.setContextFillStyle = function (r, g, b, a) {
        this.context.fillStyle = 'rgba(' + r + ',' +
            g + ',' +
            b + "," +
            a + ')';
    };
    CanvasView.prototype.fillRect = function (x, y, w, h) {
        this.context.fillRect(x, y, w, h);
    };
    return CanvasView;
}());
exports.default = CanvasView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Square = (function () {
    function Square(x, y, xVelocity, yVelocity, width, height, red, green, blue, opacity, strategies) {
        if (xVelocity === void 0) { xVelocity = 0; }
        if (yVelocity === void 0) { yVelocity = 0; }
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
        this.strategies = strategies;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }
    Square.prototype.update = function (strategy, maxX, maxY, delta) {
        strategy.run(this, maxX, maxY, delta);
    };
    return Square;
}());
exports.default = Square;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map