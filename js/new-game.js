var CloudBreakerGame = require('./cloud-breaker-game.js');
var GameClock = require('./game-clock.js');
var Scoreboard = require('./scoreboard.js');


(function () {
  if (typeof CloudBreaker === "undefined") {
    window.CloudBreaker = {};
  }

  var Game = CloudBreaker.Game = function () {

      this.$canvasEl = $(".cloud-breaker");
      this.minutesLabel = $("#minutes");
      this.secondsLabel = $("#seconds");
      this.scoreLabel = $("#score");

      var scoreboard = new Scoreboard(this.scoreLabel);
      var gameClock = new GameClock(this.minutesLabel, this.secondsLabel);
      var cloudBreaker = CloudBreaker.CloudBreakerGame(gameClock, scoreboard);
      cloudBreaker.start();

  };

  //
  // var reset_canvas = function ($canvasEl) {
  //   var minutesLabel = $("#minutes");
  //   var secondsLabel = $("#seconds");
  //   var scoreLabel = $("#score");
  //
  //   var scoreboard = new Scoreboard(scoreLabel);
  //   var gameClock = new GameClock(minutesLabel, secondsLabel);
  //   return new CloudBreaker($canvasEl, gameClock, scoreboard);
  // };

  // cloudBreaker.start();
  //
  // this.ctx = $canvasEl[0].getContext("2d");

  // this.$canvasEl = $(".cloud-breaker");

  // var $canvasClone = $canvasEl.clone(true);
  // $canvasEl.replaceWith($canvasClone);

})();
