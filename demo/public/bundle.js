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
for (var num = 0; num < 20000; num++) {
    actors.push(new Square_1.default(Math.floor(Math.random() * 900) + 0, Math.floor(Math.random() * 900) + 0, 1, 1, 5, 5, Math.floor(Math.random() * 255) + 0, Math.floor(Math.random() * 255) + 0, Math.floor(Math.random() * 255) + 0, 1, strategies));
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
        this.timeStepLimit = 240;
    }
    Engine.prototype.start = function () {
        var _this = this;
        if (!this.isStarted) {
            this.isStarted = true;
            this.currentFrameID = requestAnimationFrame(function (timestamp) {
                _this.draw();
                _this.isRunning = true;
                _this.updateLastFrameTime(timestamp);
                _this.prepareLoop();
            });
        }
    };
    Engine.prototype.stop = function () {
        this.isRunning, this.isStarted = false;
        cancelAnimationFrame(this.currentFrameID);
    };
    Engine.prototype.loop = function (timeStamp) {
        if (this.checkMaxFps(timeStamp)) {
            this.prepareLoop();
            return;
        }
        else {
            this.increaseDelta(timeStamp - this.lastFrameTimeMs);
            this.updateLastFrameTime(timeStamp);
            this.simulateTime();
            this.draw();
            this.prepareLoop();
        }
    };
    Engine.prototype.simulateTime = function () {
        while (this.delta >= this.timeStep) {
            this.update(this.timeStep);
            this.decreaseDelta(this.timeStep);
            if (++this.currentUpdateSteps >= this.timeStepLimit) {
                this.abort();
                break;
            }
        }
        this.currentUpdateSteps = 0;
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
        this.currentUpdateSteps = 0;
    };
    Engine.prototype.checkMaxFps = function (timeStamp) {
        return timeStamp < this.lastFrameTimeMs + this.timeStep;
    };
    Engine.prototype.prepareLoop = function () {
        this.currentFrameID = requestAnimationFrame(this.loop.bind(this));
    };
    Engine.prototype.increaseDelta = function (amount) {
        this.delta += amount;
    };
    Engine.prototype.decreaseDelta = function (amount) {
        this.delta -= amount;
    };
    Engine.prototype.updateLastFrameTime = function (timeStamp) {
        this.lastFrameTimeMs = timeStamp;
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
            actor.x += Math.floor((Math.min(xLeft, 5) * (delta / 60)));
        }
        else {
            actor.x -= Math.floor((Math.min(xLeft, 5) * (delta / 60)));
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
        this.offScreenViewPort = document.createElement('canvas');
        this.offScreenViewPort.width = viewPort.width;
        this.offScreenViewPort.height = viewPort.height;
        this.context = this.viewPort.getContext('2d');
        this.offScreenContext = this.offScreenViewPort.getContext('2d');
        this.width = viewPort.width;
        this.height = viewPort.height;
    }
    CanvasView.prototype.render = function (actors) {
        var _this = this;
        this.clearViewPort();
        actors.forEach(function (actor) {
            actor.draw(_this.offScreenContext);
        }, this);
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.drawImage(this.offScreenViewPort, 0, 0);
    };
    CanvasView.prototype.clearViewPort = function () {
        this.offScreenContext.clearRect(0, 0, this.width, this.height);
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
        this.rgba = 'rgba(' + red + ',' +
            green + ',' +
            blue + ',' +
            opacity + ')';
    }
    Square.prototype.update = function (strategy, maxX, maxY, delta) {
        strategy.run(this, maxX, maxY, delta);
    };
    Square.prototype.draw = function (context) {
        context.fillStyle = this.rgba;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    return Square;
}());
exports.default = Square;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map