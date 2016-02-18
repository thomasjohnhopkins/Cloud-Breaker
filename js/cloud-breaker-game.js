var Paddle = require('./paddle.js');
var Ball = require('./ball.js');
var Brick = require('./brick.js');



  var CloudBreakerGame = function (gameClock, scoreboard) {
    this.gameClock = gameClock;
    this.scoreboard = scoreboard;

    this.ctx = window.CloudBreaker.$canvasEl[0].getContext("2d");
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
    // $(window).on("keydown", function (e) {
    //   if (CloudBreakerGame.KEYS[event.keyCode] === "W") {
    //     that.paddle.moveLeft();
    //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "E") {
    //     that.paddle.moveRight();
    //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "play") {
    //     that
    //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "new") {
    //     that.scoreboard.setToZero();
    //     that.gameClock.setToZero();
    //
    //   } else {
    //     // some other key was pressed; ignore for now.
    //   }
    // });
    //
    // $(window).on("keyup", function (e) {
    //   if (CloudBreakerGame.KEYS[event.keyCode] === "W") {
    //     that.paddle.arrest();
    //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "E") {
    //     that.paddle.arrest();
    //   } else {
    //     // some other key was pressed; ignore for now.
    //   }
    // });
  };

  CloudBreakerGame.KEYS = {
    39: "E",
    37: "W",
    32: "play",
    78: "new"
  };

  CloudBreakerGame.STEP_MILLIS = 50;

  CloudBreakerGame.prototype.start = function () {
    var that = this;
    this.intervalId = window.requestAnimationFrame(
      that.step.bind(that)
    );
  };


  CloudBreakerGame.prototype.tick = function () {
    if (this.balls[0].inPlay) {
      this.gameClock.run();
    }
  };

  // CloudBreakerGame.prototype.handleKeyEvent = function (event, that) {
  //   if (CloudBreakerGame.KEYS[event.keyCode] === "W") {
  //     this.paddle.moveLeft();
  //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "E") {
  //     this.paddle.moveRight();
  //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "play") {
  //     this.balls[0].inPlay = true;
  //   } else if (CloudBreakerGame.KEYS[event.keyCode] === "new") {
  //     this.scoreboard.setToZero();
  //     this.gameClock.setToZero();
  //   } else {
  //     // some other key was pressed; ignore for now.
  //   }
  // };

  CloudBreakerGame.prototype.step = function () {
    this.ctx.clearRect(0, 0, 900, 550);
    if (this.balls[0] && this.balls[0].lifeLost) {
      this.balls.splice(0, 1);
    }
    if (this.bricks.length === 0) {
      // won game
      this.ctx.clearRect(0, 0, 900, 550);
      this.ctx.font = "48px Montserrat";
      this.ctx.fillStyle = "rgb(255,255,255)";
      this.ctx.fillText("You Win!!", 335, 200);
      var finalScore = this.generateFinalScore();
      var finalScoreString= "Total Points: " + finalScore;
      this.ctx.fillText(finalScoreString, 215, 100);
      clearInterval(this.intervalTimer);
      window.cancelAnimationFrame(this.intervalId);
      // $(window).off("keydown");
      // $(window).off("keyup");
    } else if (this.balls.length === 0) {
      // lost game
      clearInterval(this.intervalTimer);
      window.cancelAnimationFrame(this.intervalId);
      this.ctx.clearRect(0, 0, 900, 550);
      this.ctx.font = "48px Montserrat";
      this.ctx.fillStyle = "rgb(255,255,255)";
      var loseMessage = "You Lose!!";
      this.ctx.fillText(loseMessage, 340, 200);
      // $(window).off("keydown");
      // $(window).off("keyup");
    } else {
      var balls = this.balls;
      var that = this;
      for (var i = 0; i < balls.length; i++) {
        this.ctx.drawImage(balls[i].image, balls[i].position.x,
                            balls[i].position.y, 25, 25);
      }

      this.paddle.move(this.ctx);

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

  CloudBreakerGame.prototype.removeBrick = function (brick) {
    this.ctx.clearRect(brick.position.x, brick.position.y,
                          brick.size.width, brick.size.height);
    for (var i = 0; i < this.bricks.length; i++) {
      if (this.bricks[i].position.x === brick.position.x &&
            this.bricks[i].position.y === brick.position.y) {
        this.bricks.splice(i, 1);
      }
    }
  };

  CloudBreakerGame.prototype.middleBrickCoordinates = function (xPos, yPos) {
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

  CloudBreakerGame.prototype.endBrickCoordinates = function (xPos, yPos) {
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


  CloudBreakerGame.prototype.setupGame = function () {
    this.ctx.clearRect(0, 0, 900, 550);
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

  CloudBreakerGame.prototype.buildBricks = function (brickCoords) {
    var currentBrick;
    for (var i = 0; i < brickCoords.length; i++) {
      currentBrick = new Brick(brickCoords[i]);
      this.bricks.push(currentBrick);
    }
  };
  CloudBreakerGame.prototype.generateFinalScore = function () {
    var totalSeconds = Math.floor(this.gameClock.totalSeconds);
    var finalScore = 1500 + (30000 / totalSeconds) + (this.balls.length * 100);
    var roundedScore = Math.floor(finalScore);
    this.scoreboard.setFinalScore(finalScore);
    return finalScore.toString().slice(0, 6);
  };

  CloudBreakerGame.prototype.play = function () {

  };

module.exports = CloudBreakerGame;
