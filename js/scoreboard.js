var Scoreboard = function ($score) {

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
  finalScore = points.toString().slice(0, 6);
  intScore = parseInt(finalScore);
  // addedPoints = intScore - this.score;
  // this.addPoints(addedPoints);
  debugger
  this.scoreLabel[0].innerHTML = finalScore;
};

Scoreboard.prototype.setToZero = function () {
  this.score = 0;
  this.scoreLabel[0].innerHTML = this.score;
};

module.exports = Scoreboard;
