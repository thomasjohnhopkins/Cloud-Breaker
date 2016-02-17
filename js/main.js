var NewGame = require('./new-game.js');
var CloudBreaker = require('./cloud-breaker-game.js');
var GameClock = require('./game-clock.js');
var Scoreboard = require('./scoreboard.js');

(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  this.$canvasEl = $(".cloud-breaker");
  var ctx = this.$canvasEl[0].getContext("2d");

  var reset_canvas = function ($canvasEl) {
    var minutesLabel = $("#minutes");
    var secondsLabel = $("#seconds");
    var scoreLabel = $("#score");

    var scoreboard = new Scoreboard(scoreLabel);
    var gameClock = new GameClock(minutesLabel, secondsLabel);
    return new CloudBreaker($canvasEl, gameClock, scoreboard);
  };

  // cloudBreaker.start();
  //
  // this.ctx = $canvasEl[0].getContext("2d");
  ctx.font = "40px Montserrat";
  ctx.strokeStyle = "rgb(255,255,255)";

  ctx.strokeText("Welcome to Cloud Breaker!", 375, 100);

  ctx.strokeText("Press 'n' key to start a new game", 275, 150);

  $(window).on("keydown", function (e) {
    if (e.keyCode === 78) {

    var $canvasClone = this.$canvasEl.clone(true);

    this.$canvasEl.replaceWith($canvasClone);
    var $canvasEl = $(".cloud-breaker");
    var ctx = $canvasEl[0].getContext("2d");
    ctx.clearRect(0, 0, 900, 550);
    debugger
    // var $currentCanvasEl = $(".cloud-breaker");
    // new NewGame($currentCanvasEl);
    new NewGame(reset_canvas($canvasEl));
    }
  }).bind(this);


})();
