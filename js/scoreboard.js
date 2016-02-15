var Scoreboard = function ($score) {
        // this.clock = $el;

        this.score = 0;
        this.scoreLabel = $score;

};

Scoreboard.prototype.addPoints = function (points) {
  this.score = this.score + points;
  this.scoreLabel[0].innerHTML = this.score;
};

Scoreboard.prototype.pad = function (val) {
  var valString = val + "";
  if(valString.length < 2)
  {
      return "0" + valString;
  }
  else
  {
      return valString;
  }
};

Scoreboard.prototype.run = function () {
  this.setTime();
};

Scoreboard.prototype.setFinalScore = function (points) {
  this.score = points.toString().slice(0, 6);
  this.scoreLabel[0].innerHTML = this.score;
};

Scoreboard.prototype.setToZero = function () {
  this.scoreLabel[0].innerHTML = 0;
};

module.exports = Scoreboard;
