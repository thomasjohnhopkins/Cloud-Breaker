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

module.exports = Scoreboard;
