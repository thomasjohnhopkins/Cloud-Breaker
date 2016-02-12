var CloudBreaker = require('./cloud-breaker-game.js');
var GameClock = require('./game-clock.js');
var Scoreboard = require('./scoreboard.js');

(function () {
  // if (typeof Game === "undefined") {
  //   window.Game = {};
  // }

  var canvasEl = $(".cloud-breaker");

  var minutesLabel = $("#minutes");
  var secondsLabel = $("#seconds");
  var scoreLabel = $("#score");

  // this somewhat works
  var scoreboard = new Scoreboard(scoreLabel);
  var gameClock = new GameClock(minutesLabel, secondsLabel);

  new CloudBreaker(canvasEl, gameClock, scoreboard);

  // var NewGame = Game.NewGame = function (canvasEl, minutesLabel,
  //                                         secondsLabel, scoreLabel) {
  //   var scoreboard = new Scoreboard(scoreLabel);
  //   var gameClock = new GameClock(minutesLabel, secondsLabel);
  //   new CloudBreaker(canvasEl, gameClock, scoreboard);
  // };
  //
  //
  // $(window).on("keydown", function (e) {
  //   if (e.keyCode === 78) {
  //     Game.NewGame();
  //   }
  // });


})();
