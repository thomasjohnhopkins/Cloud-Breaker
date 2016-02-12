var NewGame = require('./new-game.js');

(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  this.games = [];

  this.screen = $(".wrapper");
  // this somewhat works
  // var scoreboard = new Scoreboard(scoreLabel);
  // var gameClock = new GameClock(minutesLabel, secondsLabel);
  //
  // new CloudBreaker(canvasEl, gameClock, scoreboard);


  $(window).on("keydown", function (e) {
    if (e.keyCode === 78) {

    new NewGame();
    }
  }).bind(this);


})();
