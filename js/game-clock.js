var GameClock = function ($minutes, $seconds) {
        // this.clock = $el;


        this.minutesLabel = $minutes;
        this.secondsLabel = $seconds;
        this.totalSeconds = 0;

        // function setTime() {
        //     ++this.totalSeconds;
        //     this.secondsLabel.innerHTML = pad(this.totalSeconds%60);
        //     this.minutesLabel.innerHTML = pad(parseInt(this.totalSeconds/60));
        // }
        //
        // function pad(val)
        // {
        //     var valString = val + "";
        //     if(valString.length < 2)
        //     {
        //         return "0" + valString;
        //     }
        //     else
        //     {
        //         return valString;
        //     }
        // }
};

GameClock.prototype.setTime = function () {
  this.totalSeconds = this.totalSeconds + 1;
  var totalSeconds = Math.floor(this.totalSeconds);
  this.secondsLabel[0].innerHTML = this.pad(totalSeconds % 60);
  this.minutesLabel[0].innerHTML = this.pad(parseInt(totalSeconds / 60));
};

GameClock.prototype.pad = function (val) {
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

GameClock.prototype.run = function () {
  this.setTime();
};

GameClock.prototype.setToZero = function () {
  this.totalSeconds = 0;

  var totalSeconds = this.totalSeconds;
  this.secondsLabel[0].innerHTML = this.pad(totalSeconds % 60);
  this.minutesLabel[0].innerHTML = this.pad(parseInt(totalSeconds / 60));
};

module.exports = GameClock;
