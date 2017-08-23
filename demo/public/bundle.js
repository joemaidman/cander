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
var CanvasView_1 = __webpack_require__(2);
var Square_1 = __webpack_require__(3);
var canvas = document.getElementById('game');
var viewPort = new CanvasView_1.default(canvas);
var actors = new Array();
var strategies = new Array();
for (var num = 0; num < 100; num++) {
    actors.push(new Square_1.default(Math.floor(Math.random() * 500) + 0, Math.floor(Math.random() * 500) + 0, 30, 30, Math.floor(Math.random() * 255) + 0, Math.floor(Math.random() * 255) + 0, Math.floor(Math.random() * 255) + 0, 1, strategies));
}
var engine = new Engine_1.default(viewPort, actors);
engine.start();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Engine = (function () {
    function Engine(view, actors) {
        this.view = view;
        this.actors = actors;
    }
    Engine.prototype.start = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.loop();
        });
    };
    Engine.prototype.loop = function () {
        var _this = this;
        this.update();
        this.draw();
        requestAnimationFrame(function () {
            _this.loop();
        });
    };
    Engine.prototype.update = function () {
        var _this = this;
        this.actors.forEach(function (actor) {
            actor.update(_this.view.width, _this.view.height);
        });
    };
    Engine.prototype.draw = function () {
        this.view.render(this.actors);
    };
    return Engine;
}());
exports.default = Engine;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Square = (function () {
    function Square(x, y, width, height, red, green, blue, opacity, strategies) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
        this.strategies = strategies;
    }
    Square.prototype.update = function (maxX, maxY) {
        var xLeft = maxX - this.x;
        var yLeft = maxY - this.y;
        if (Math.random() >= 0.5) {
            this.x += Math.min(xLeft, 1);
        }
        else {
            this.x -= Math.min(xLeft, 1);
        }
        if (Math.random() >= 0.5) {
            this.y += Math.min(yLeft, 1);
        }
        else {
            this.y -= Math.min(yLeft, 1);
        }
    };
    return Square;
}());
exports.default = Square;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map