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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
module.exports = Coin;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Furry;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(1);
__webpack_require__(0);




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(0);
var Furry = __webpack_require__(1);


function Game() {
    this.board = document.querySelectorAll("#board div");

    this.score = 0;

    this.moveFurry = function() {
        if(this.furry.direction === "right") {
            this.furry.x += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x -= 1;
        } else if (this.furry.direction === "up") {
            this.furry.y -= 1;
        } else if (this.furry.direction === "down") {
            this.furry.y += 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    var btn = document.querySelector('#new-game');
    var self = this;
    btn.addEventListener('click', function(){
        self.createNewGame();
    })

}

Game.prototype.index = function(x,y) {
    return x + (y * 10);
};

Game.prototype.showCoin = function () {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin')
};

Game.prototype.hideVisibleFurry = function () {
    this.visibleFurry = document.querySelector(".furry");
    if(this.visibleFurry !== null) {
        this.visibleFurry.classList.remove("furry")
    }
};

Game.prototype.showFurry = function () {
    this.hideVisibleFurry();
    var furryIndex = this.index(this.furry.x, this.furry.y);
    if(this.board[furryIndex]) {
        this.board[furryIndex].classList.add('furry');
    }
};

Game.prototype.turnFurry = function (event) {
    switch (event.which) {
        case 37:
            this.furry.direction = "left";
            break;
        case 39:
            this.furry.direction = "right";
            break;
        case 38:
            this.furry.direction = "up";
            break;
        case 40:
            this.furry.direction = "down";
            break;
    }
};

Game.prototype.checkCoinCollision = function () {
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y){
        var coinToRemove = document.querySelector('.coin');
        coinToRemove.classList.remove('coin');
        this.score += 1;
        var scoreText = document.querySelector('#score strong');
        scoreText.innerText = this.score;
        this.coin = new Coin();
        this.showCoin();
    }
};

Game.prototype.startGame = function () {
    this.furry = new Furry();
    this.coin = new Coin();
    this.showFurry();
    this.showCoin();
    document.addEventListener('keydown', function (event) {
        game.turnFurry(event);
    });

    var self = this;
    this.id = setInterval(function(){
        self.moveFurry()
    }, 250);
};

Game.prototype.gameOver = function () {
    if(this.furry.x > 9 || this.furry.x < 0 || this.furry.y > 9 || this.furry.y < 0){
        this.hideVisibleFurry();
        clearInterval(this.id);
        document.querySelector("#board").classList.add("invisible");
        document.querySelector("#score").classList.add("invisible");
        var scoreGame = document.querySelector('#over strong');
        scoreGame.innerText = this.score;
        document.querySelector("#over").classList.remove("invisible");
    }
};

Game.prototype.createNewGame = function () {
    var coinToRemove = document.querySelector('.coin');
    coinToRemove.classList.remove('coin');
    this.score = 0;
    var scoreGame = document.querySelector('#score strong');
    scoreGame.innerText = 0;
    document.querySelector("#over").classList.add("invisible");
    document.querySelector("#board").classList.remove("invisible");
    document.querySelector("#score").classList.remove("invisible");
    game.startGame();
};

window.game = new Game();
game.startGame();




/***/ })
/******/ ]);