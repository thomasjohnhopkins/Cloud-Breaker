var CloudBreaker = require('./cloud-breaker-game.js');
var GameClock = require('./game-clock.js');
var Scoreboard = require('./scoreboard.js');

var newGame = function ($canvasEl) {

  // var $canvasClone = $canvasEl.clone(true);
  // $canvasEl.replaceWith($canvasClone);


  var minutesLabel = $("#minutes");
  var secondsLabel = $("#seconds");
  var scoreLabel = $("#score");

  this.scoreboard = new Scoreboard(scoreLabel);
  this.gameClock = new GameClock(minutesLabel, secondsLabel);
  this.cloudBreaker = new CloudBreaker($canvasEl, this.gameClock, this.scoreboard);
  this.cloudBreaker.start();
};

module.exports = newGame;
