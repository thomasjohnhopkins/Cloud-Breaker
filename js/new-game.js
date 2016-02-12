var CloudBreaker = require('./cloud-breaker-game.js');
var GameClock = require('./game-clock.js');
var Scoreboard = require('./scoreboard.js');

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
