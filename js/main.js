var NewGame = require('./new-game.js');

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
    this.ctx.clearRect(0, 0, 900, 550);
    new NewGame();
    }
  }).bind(this);


})();
