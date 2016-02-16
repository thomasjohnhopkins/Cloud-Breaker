var NewGame = require('./new-game.js');

(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var $canvasEl = $(".cloud-breaker");
  this.ctx = $canvasEl[0].getContext("2d");
  this.ctx.font = "40px Montserrat";
  this.ctx.strokeStyle = "rgb(255,255,255)";

  this.ctx.strokeText("Welcome to Cloud Breaker!", 375, 100);

  this.ctx.strokeText("Press 'n' key to start a new game", 275, 150);

  $(window).on("keydown", function (e) {
    if (e.keyCode === 78) {
    // this.ctx.clearRect(0, 0, 900, 550);

    var $currentCanvasEl = $(".cloud-breaker");
    new NewGame($currentCanvasEl);
    }
  }).bind(this);


})();
