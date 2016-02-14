/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var NewGame = __webpack_require__(1);

	(function () {
	  if (typeof Game === "undefined") {
	    window.Game = {};
	  }

	  var $canvasEl = $(".cloud-breaker");
	  this.ctx = $canvasEl[0].getContext("2d");
	  this.ctx.font = "24px Montserrat";
	  this.ctx.fillStyle = "rgb(255,255,255)";
	  this.ctx.fillText("Welcome to Cloud Breaker!", 305, 100);
	  this.ctx.fillText("Press 'N' to start a new game", 300, 150);

	  // this somewhat works
	  // var scoreboard = new Scoreboard(scoreLabel);
	  // var gameClock = new GameClock(minutesLabel, secondsLabel);
	  //
	  // new CloudBreaker(canvasEl, gameClock, scoreboard);


	  $(window).on("keydown", function (e) {
	    if (e.keyCode === 78) {
	    // this.ctx.clearRect(0, 0, 900, 550);

	    var $canvasEl = $(".cloud-breaker");
	    var canvasClone = $canvasEl.clone(true);
	    $canvasEl.replaceWith(canvasClone);



	    new NewGame();
	    }
	  }).bind(this);


	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CloudBreaker = __webpack_require__(2);
	var GameClock = __webpack_require__(6);
	var Scoreboard = __webpack_require__(7);

	var newGame = function () {

	  var canvasEl = $(".cloud-breaker");

	  var minutesLabel = $("#minutes");
	  var secondsLabel = $("#seconds");
	  var scoreLabel = $("#score");

	  this.scoreboard = new Scoreboard(scoreLabel);
	  this.gameClock = new GameClock(minutesLabel, secondsLabel);
	  this.cloudBreaker = new CloudBreaker(canvasEl, this.gameClock, this.scoreboard);
	};

	module.exports = newGame;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Paddle = __webpack_require__(3);
	var Ball = __webpack_require__(4);
	var Brick = __webpack_require__(5);

	var CloudBreaker = function ($el, gameClock, scoreboard) {
	  this.$canvasEl = $el;
	  this.gameClock = gameClock;
	  this.scoreboard = scoreboard;

	  this.ctx = this.$canvasEl[0].getContext("2d");
	  this.paddle = new Paddle();
	  this.balls = [new Ball(50, 20), new Ball(100, 20), new Ball (150, 20)];


	  this.bricks = [];
	  this.lastHitBrick = null;

	  this.setupGame();

	  // this.intervalId = window.setInterval(
	  //   this.step.bind(this),
	  //   CloudBreaker.STEP_MILLIS
	  // );

	  var that = this;
	  this.intervalId = window.requestAnimationFrame(
	    that.step.bind(that)
	  );

	  $(window).on("keydown", this.handleKeyEvent.bind(this));
	};

	CloudBreaker.KEYS = {
	  39: "E",
	  37: "W",
	  32: "play",
	  78: "new"
	};

	CloudBreaker.STEP_MILLIS = 50;

	CloudBreaker.prototype.tick = function () {
	  if (this.balls[0].inPlay) {
	    this.gameClock.run();
	  }
	};

	CloudBreaker.prototype.handleKeyEvent = function (event) {
	  if (CloudBreaker.KEYS[event.keyCode] === "W") {
	    this.paddle.moveLeft();
	  } else if (CloudBreaker.KEYS[event.keyCode] === "E") {
	    this.paddle.moveRight();
	  } else if (CloudBreaker.KEYS[event.keyCode] === "play") {
			debugger
	    this.balls[0].inPlay = true;
	  } else if (CloudBreaker.KEYS[event.keyCode] === "new") {
	    this.scoreboard.setToZero();
	    this.gameClock.setToZero();
	  } else {
	    // some other key was pressed; ignore.
	  }
	};

	CloudBreaker.prototype.step = function () {
	  this.ctx.clearRect(0, 0, 900, 550);
	  if (this.balls[0] && this.balls[0].lifeLost) {
	    this.balls.splice(0, 1);
	  }
	  if (this.bricks.length === 0) {
	    // won game
	    this.ctx.clearRect(0, 0, 900, 550);
	    this.ctx.font = "48px Montserrat";
	    this.ctx.fillStyle = "rgb(255,255,255)";
	    this.ctx.fillText("You Win!!", 345, 200);
	    var finalScore = this.generateFinalScore();
	    var finalScoreString= "Total Points: " + finalScore;
	    this.ctx.fillText(finalScoreString, 165, 100);
	  } else if (this.balls.length === 0) {
	    // lost game
	    clearInterval(this.intervalTimer);
	    window.cancelAnimationFrame(this.intervalId);
	    this.ctx.clearRect(0, 0, 900, 550);
	    this.ctx.font = "48px Montserrat";
	    this.ctx.fillStyle = "rgb(255,255,255)";
	    var loseMessage = "You Lose!!";
	    this.ctx.fillText(loseMessage, 345, 200);

	  } else {
	    var balls = this.balls;
	    var that = this;
	    for (var i = 0; i < balls.length; i++) {
	      this.ctx.drawImage(balls[i].image, balls[i].position.x,
	                          balls[i].position.y, 25, 25);
	    }

	    this.paddle.draw(this.ctx);
	    if (this.balls[0].inPlay) {
	      this.balls[0].move(this.ctx);
	    }

	    this.bricks.forEach( function (brick) {
	      brick.draw(that.ctx);
	    });

	    this.balls[0].checkCollision(this.paddle);

	    if (this.bricks.length > 0) {
	      for (var j = 0; j < this.bricks.length; j++) {
	        var currentBrick = this.bricks[j];
	        // if (this.lastHitBrick === currentBrick) {
	        //   continue;
	        // }
	        var toRemove;
	        toRemove = currentBrick.checkCollision(this.balls[0]);
	        if (toRemove) {
	          // this.lastHitBrick = currentBrick;
	          this.scoreboard.addPoints(toRemove);
	        }
	        if (toRemove === 30) {
	          that.removeBrick(currentBrick);
	        }
	      }

	    }
	  }
	  this.intervalId = window.requestAnimationFrame(
	    this.step.bind(this)
	  );
	};

	CloudBreaker.prototype.removeBrick = function (brick) {
	  this.ctx.clearRect(brick.position.x, brick.position.y,
	                        brick.size.width, brick.size.height);
	  for (var i = 0; i < this.bricks.length; i++) {
	    if (this.bricks[i].position.x === brick.position.x &&
	          this.bricks[i].position.y === brick.position.y) {
	      this.bricks.splice(i, 1);
	    }
	  }
	};

	CloudBreaker.prototype.middleBrickCoordinates = function (xPos, yPos) {
	  var bricks = [[xPos, yPos]];
	  bricks.push([bricks[0][0], (bricks[0][1] + 68)]);
	  bricks.push([(bricks[0][0] - 31), (bricks[0][1] + 17)]);
	  bricks.push([(bricks[0][0] + 31), (bricks[0][1] + 17)]);
	  bricks.push([(bricks[0][0] - 62), (bricks[0][1] + 34)]);
	  bricks.push([(bricks[0][0] + 62), (bricks[0][1] + 34)]);
	  bricks.push([bricks[0][0], (bricks[0][1] + 34)]);
	  bricks.push([(bricks[0][0] - 31), (bricks[0][1] + 51)]);
	  bricks.push([(bricks[0][0] + 31), (bricks[0][1] + 51)]);
	  // 9 bricks in total to form one cloud

	  return bricks;
	};

	CloudBreaker.prototype.endBrickCoordinates = function (xPos, yPos) {
	  var bricks = [[xPos, yPos]];
	  bricks.push([(bricks[0][0] + 62), bricks[0][1]]);
	  bricks.push([bricks[0][0], (bricks[0][1] + 16)]);
	  bricks.push([(bricks[0][0] + 62), (bricks[0][1] + 16)]);
	  bricks.push([(bricks[0][0] - 62), (bricks[0][1] + 16)]);
	  bricks.push([(bricks[0][0] + 124), (bricks[0][1] + 16)]);
	  bricks.push([bricks[0][0], (bricks[0][1] + 32)]);
	  bricks.push([(bricks[0][0] + 62), (bricks[0][1] + 32)]);
	  // 8 bricks in total to form one cloud
	  return bricks;
	};


	CloudBreaker.prototype.setupGame = function () {
	  firstCloud = this.endBrickCoordinates(150, 80);
	  secondCloud = this.middleBrickCoordinates(410, 35);
	  thirdCloud = this.endBrickCoordinates(600, 80);
	  this.buildBricks(firstCloud);
	  this.buildBricks(secondCloud);
	  this.buildBricks(thirdCloud);
	  var that = this;
	  this.intervalTimer = window.setInterval(
	    that.tick.bind(that),
	    1000
	  );
	};

	CloudBreaker.prototype.buildBricks = function (brickCoords) {
	  var currentBrick;
	  for (var i = 0; i < brickCoords.length; i++) {
	    currentBrick = new Brick(brickCoords[i]);
	    this.bricks.push(currentBrick);
	  }
	};
	CloudBreaker.prototype.generateFinalScore = function () {
	  var totalSeconds = Math.floor(this.gameClock.totalMilliseconds / 1000);
	  var finalScore = 1500 + (30000 / totalSeconds) + (this.balls.length * 100);
	  var roundedScore = Math.floor(finalScore);
	  this.scoreboard.setFinalScore(finalScore);
	  return finalScore.toString().slice(0, 6);
	};

	CloudBreaker.prototype.play = function () {

	};

	module.exports = CloudBreaker;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Paddle = function () {
	  this.position = {
	    x: 100,
	    y: 530
	  };

	  this.movement = {
	    speed: 50
	  };

	  this.size = {
	    height: 10,
	    width: 80
	  };
	};

	Paddle.prototype.draw = function (ctx) {
	  ctx.fillStyle = "rgb(255,255,255)";
	  ctx.fillRect(this.position.x, this.position.y + 5,
	                        this.size.width, 10);
	};

	Paddle.prototype.moveLeft = function () {
	  if (this.position.x > 0) {
	    this.position.x -= this.movement.speed;
	  }
	};

	Paddle.prototype.moveRight = function () {
	  if (this.position.x < (900 - this.size.width)) {
	    this.position.x += this.movement.speed;
	  }
	};


	module.exports = Paddle;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Ball = function (xCoord, yCoord) {

	  this.inPlay = false;

	  this.position = {
	    x: xCoord,
	    y: yCoord
	  };

	  this.direction = {
	    x: -1,
	    y: 1
	  };

	  this.centerOfMass = {
	    x: this.position.x + 8,
	    y: this.position.y + 8
	  };


	  this.movement = {
	    speed: 5
	  };

	  this.size = {
	    height: 16,
	    width: 16
	  };

	  this.image = Ball.SUN_EMOJI;

	  this.lifeLost = false;
	};

	Ball.SUN_EMOJI = new Image();
	Ball.SUN_EMOJI.src = 'images/sun.png';


	Ball.prototype.draw = function (ctx) {
	  // this.clearBall(ctx);
	  // ctx.fillStyle = "images/sun_emoji";
	  // ctx.fillRect(this.position.x, this.position.y,
	  //               this.size.width, this.size.height);
	  ctx.drawImage(this.image, this.position.x, this.position.y, 25, 25);
	};

	Ball.prototype.move = function (ctx) {
	  if (this.position.x <= 0) {
	    this.direction.x *= -1;
	  }

	  if (this.position.x >= 870) {
	    this.direction.x *= -1;
	  }

	  if (this.position.y <= 0) {
	    this.direction.y *= -1;
	  }

	  if (this.position.y >= 550) {
	    this.reset();
	  }

	  this.position.x += (this.movement.speed * this.direction.x);
	  this.position.y += (this.movement.speed * this.direction.y);
	  this.centerOfMass.x += (this.movement.speed * this.direction.x);
	  this.centerOfMass.y += (this.movement.speed * this.direction.y);
	};

	Ball.prototype.reset = function () {
	  this.lifeLost = true;
	};

	Ball.prototype.checkCollision = function (object) {
	  if (this.centerOfMass.x > object.position.x + object.size.width + 12.5) {
	    return false;
	  }
	  if (this.centerOfMass.x < object.position.x - 12.5) {
	    return false;
	  }
	  if ((this.position.y + this.size.height) < object.position.y) {
	    return false;
	  }
	  if (this.position.y + this.size.height > object.position.y + 8) {
	    return false;
	  }


	  if (this.centerOfMass.x >= (object.position.x - 12.5) &&
	        this.centerOfMass.x <= (object.position.x + object.size.width + 12.5)) {
	    this.direction.y *= -1;
	  }
	  if (this.direction.x > 0) {
	    if (this.centerOfMass.x < object.position.x + 10) {
	      this.direction.x = -2;
	    } else if (this.centerOfMass.x < object.position.x + 20) {
	      this.direction.x = -1.5;
	    } else if (this.centerOfMass.x < object.position.x + 30) {
	      this.direction.x = -1.0;
	    } else if (this.centerOfMass.x < object.position.x + 40) {
	      this.direction.x = -0.5;
	    } else if (this.centerOfMass.x < object.position.x + 50) {
	      this.direction.x = 0.5;
	    } else if (this.centerOfMass.x < object.position.x + 60) {
	      this.direction.x = 1.0;
	    } else if (this.centerOfMass.x < object.position.x + 30) {
	      this.direction.x = -1.5;
	    } else {
	      this.direction.x = 2.0;
	    }

	  } else if (this.direction.x < 0) {
	    if (this.centerOfMass.x < object.position.x + 20) {
	      this.direction.x = -1.5;
	    } else if (this.centerOfMass.x < object.position.x + 40) {
	      this.direction.x = -0.5;
	    } else if (this.centerOfMass.x < object.position.x + 60) {
	      this.direction.x = 0.5;
	    } else {
	      this.direction.x = 1.5;
	    }
	  }
	};

	module.exports = Ball;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Brick = function (Coords) {
	  this.position = {
	    x: Coords[0],
	    y: Coords[1]
	  };

	  this.size = {
	    height: 15,
	    width: 60
	  };

	  this.health = 3;
	};

	Brick.prototype.checkCollision = function (ball) {
	  if (ball.position.x + 25 < this.position.x - 6 ||
	      ball.position.x > this.position.x + this.size.width + 6) {
	    return false;
	  } else if (ball.position.y + 25 < this.position.y - 8 ||
	              ball.position.y > this.position.y + this.size.height + 8) {
	    return false;
	  }


	  // otherwise there is a hit
	  if (ball.direction.x > 0 && ball.direction.y > 0) {
	    if ((ball.position.y + 30 <= this.position.y) &&
	          (ball.position.x + 30 > this.position.x)) {
	      ball.direction.y *= -1;
	    } else if (ball.position.x + 30 > this.position.x) {
	      ball.direction.y *= -1;
	    } else if (ball.position.y + 30 <= this.position.y) {
	      ball.direction.x *= -1;
	    } else {
	      ball.direction.x *= -1;
	    }
	  } else if (ball.direction.x < 0 && ball.direction.y > 0 ) {
	    // if ((ball.position.y + 30 < this.position.y) &&
	    if (ball.position.x + 30 < this.position.x + this.size.width) {
	      ball.direction.y *= -1;
	    } else if (ball.position.x + 30 < this.position.x + this.size.width) {
	      ball.direction.y *= -1;
	    } else if (ball.position.y + 30 < this.position.y) {
	      ball.direction.x *= -1;
	    } else {
	      ball.direction.x *= -1;
	    }
	  } else if (ball.direction.x > 0 && ball.direction.y < 0) {
	    if (ball.position.x + 30 > this.position.x) {
	          // (ball.position.y + 30 < this.position.y + this.size.height)) {
	      // ball.direction.x *= -1;
	      ball.direction.y *= -1;
	    } else if (ball.position.x + 30 > this.position.x) {
	      ball.direction.y *= -1;
	    } else if (ball.position.y + 30 < this.position.y + this.size.height) {
	      ball.direction.x *= -1;
	    } else {
	      ball.direction.x *= -1;
	    }
	  } else if (ball.direction.x < 0 && ball.direction.y < 0) {
	    if ((ball.position.x + 30 < this.position.x + this.size.width) &&
	          (ball.position.y < this.position.y + this.size.height)) {
	      // ball.direction.x *= -1;
	      ball.direction.y *= -1;
	    } else if (ball.position.x + 30 < this.position.x + this.size.width) {
	      ball.direction.y *= -1;
	    } else if (ball.position.y < this.position.y + this.size.height) {
	      ball.direction.x *= -1;
	    } else {
	      ball.direction.y *= -1;
	      ball.direction.x *= -1;
	    }
	  } else {
	    // ball.direction.x *= -1;
	    // ball.direction.y *= -1;
	  }
	  var toDestroy = this.applyCollisionForce(true);
	  if (toDestroy) {
	    return toDestroy;
	  }
	};

	Brick.prototype.applyCollisionForce = function (hit) {
	  if (hit) {
	    this.health -= 1;
	  }
	  if (this.health === 2) {
	    return 10;
	  } else if (this.health === 1) {
	    return 20;
	  } else if (this.health === 0) {
	    return 30;
	  }
	};

	Brick.prototype.removeBrick = function (brick) {
	  // Logic to clear the brick based on position
	};

	Brick.prototype.draw = function (ctx) {
	  if (this.health === 3) {
	    ctx.fillStyle = "rgb(168, 163, 163)";
	    // ctx.fillRect(this.position.x, this.position.y,
	    //                       this.size.width, this.size.height);
	  } else if (this.health === 2) {
	    ctx.fillStyle = "rgb(199,195,195)";
	    // ctx.fillRect(this.position.x, this.position.y,
	    //                       this.size.width, this.size.height);
	  } else {
	    ctx.fillStyle = "rgb(255,255,255)";
	    // ctx.fillRect(this.position.x, this.position.y,
	    //                       this.size.width, this.size.height);
	  }

	  ctx.beginPath();
	  ctx.rect(this.position.x, this.position.y,
	                        this.size.width, this.size.height);
	  ctx.stroke();
	  ctx.fill();
	};

	module.exports = Brick;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var GameClock = function ($minutes, $seconds) {
	        // this.clock = $el;


	        this.minutesLabel = $minutes;
	        this.secondsLabel = $seconds;
	        this.totalSeconds = 0;

	        // function setTime() {
	        //     ++this.totalSeconds;
	        //     this.secondsLabel.innerHTML = pad(this.totalSeconds%60);
	        //     this.minutesLabel.innerHTML = pad(parseInt(this.totalSeconds/60));
	        // }
	        //
	        // function pad(val)
	        // {
	        //     var valString = val + "";
	        //     if(valString.length < 2)
	        //     {
	        //         return "0" + valString;
	        //     }
	        //     else
	        //     {
	        //         return valString;
	        //     }
	        // }
	};

	GameClock.prototype.setTime = function () {
	  this.totalSeconds = this.totalSeconds + 1;
	  var totalSeconds = Math.floor(this.totalSeconds);
	  this.secondsLabel[0].innerHTML = this.pad(totalSeconds % 60);
	  this.minutesLabel[0].innerHTML = this.pad(parseInt(totalSeconds / 60));
	};

	GameClock.prototype.pad = function (val) {
	  var valString = val + "";
	  if(valString.length < 2)
	  {
	      return "0" + valString;
	  }
	  else
	  {
	      return valString;
	  }
	};

	GameClock.prototype.run = function () {
	  this.setTime();
	};

	GameClock.prototype.setToZero = function () {
	  debugger
	  this.totalSeconds = 0;
		var totalSeconds = this.totalSeconds;
	  this.secondsLabel[0].innerHTML = this.pad(totalSeconds % 60);
	  this.minutesLabel[0].innerHTML = this.pad(parseInt(totalSeconds / 60));
	};

	module.exports = GameClock;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Scoreboard = function ($score) {
	        // this.clock = $el;

	        this.score = 0;
	        this.scoreLabel = $score;

	};

	Scoreboard.prototype.addPoints = function (points) {
	  this.score = this.score + points;
	  this.scoreLabel[0].innerHTML = this.score;
	};

	Scoreboard.prototype.pad = function (val) {
	  var valString = val + "";
	  if(valString.length < 2)
	  {
	      return "0" + valString;
	  }
	  else
	  {
	      return valString;
	  }
	};

	Scoreboard.prototype.run = function () {
	  this.setTime();
	};

	Scoreboard.prototype.setFinalScore = function (points) {
	  this.score = points.toString().slice(0, 6);
	  this.scoreLabel[0].innerHTML = this.score;
	};

	Scoreboard.prototype.setToZero = function () {
	  this.score = 0;
	  this.scoreLabel[0].innerHTML = this.score;
	};

	module.exports = Scoreboard;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
