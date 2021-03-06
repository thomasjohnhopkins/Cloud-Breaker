var NewGame = require('./new-game.js');
var CloudBreakerGame = require('./cloud-breaker-game.js');
var GameClock = require('./game-clock.js');
var Scoreboard = require('./scoreboard.js');

(function () {
  if (typeof CloudBreaker === "undefined") {
    window.CloudBreaker = {};
  }

  window.CloudBreaker.$canvasEl = $(".cloud-breaker");
  var ctx = window.CloudBreaker.$canvasEl[0].getContext("2d");
  //
  // ctx.font = "40px Montserrat";
  // ctx.strokeStyle = "rgb(255,255,255)";
  //
  // ctx.strokeText("Welcome to Cloud Breaker!", 375, 100);
  //
  // ctx.strokeText("Press 'n' key to start a new game", 275, 150);

  var Game = CloudBreaker.Game = function () {

      window.CloudBreaker.$canvasEl = $(".cloud-breaker");
      window.CloudBreaker.minutesLabel = $("#minutes");
      window.CloudBreaker.secondsLabel = $("#seconds");
      window.CloudBreaker.scoreLabel = $("#score");

      window.CloudBreaker.scoreboard =
                new Scoreboard(window.CloudBreaker.scoreLabel);
      window.CloudBreaker.gameClock =
                new GameClock(window.CloudBreaker.minutesLabel,
                                window.CloudBreaker.secondsLabel);
      window.CloudBreaker.cloudBreakerGame =
                new CloudBreakerGame(window.CloudBreaker.gameClock,
                                      window.CloudBreaker.scoreboard);
      window.CloudBreaker.cloudBreakerGame.start();

  };

  window.CloudBreaker.Game();

  $(window).on("keydown", function (e) {
    if (e.keyCode === 78) {
      // if (window.CloudBreaker.cloudBreakerGame) {
      //   window.CloudBreaker.cloudBreakerGame.scoreboard.setToZero();
      //   window.CloudBreaker.cloudBreakerGame.gameClock.setToZero();
      // }
      // window.CloudBreaker.Game();
    } else if (e.keyCode === 32) {
      $(".modal").css( "display", "none" );
      $(".place-holder").css( "display", "none" );

      $(".game-instructions").css( "display", "block" );
      if (window.CloudBreaker.cloudBreakerGame.balls.length > 0) {
        window.CloudBreaker.cloudBreakerGame.balls[0].inPlay = true;
      } else {
        window.CloudBreaker.cloudBreakerGame.scoreboard.setToZero();
        window.CloudBreaker.cloudBreakerGame.gameClock.setToZero();
        window.CloudBreaker.Game();
      }
    } else if (e.keyCode === 39) {
      window.CloudBreaker.cloudBreakerGame.paddle.moveRight();
    } else if (e.keyCode === 37) {
      window.CloudBreaker.cloudBreakerGame.paddle.moveLeft();
    }


  });

  $(window).on("keyup", function (e) {
    if (e.keyCode === 37) {
      window.CloudBreaker.cloudBreakerGame.paddle.arrest();
    } else if (e.keyCode === 39) {
      window.CloudBreaker.cloudBreakerGame.paddle.arrest();
    } else {
      // some other key was pressed; ignore for now.
    }
  });


})();
