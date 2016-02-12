var GameClock = function ($minutes, $seconds) {
        // this.clock = $el;


        this.minutesLabel = $minutes;
        this.secondsLabel = $seconds;
        this.totalMilliseconds = 0;

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
  this.totalMilliseconds = this.totalMilliseconds + 50;
  var totalSeconds = Math.floor(this.totalMilliseconds / 1000);
  this.secondsLabel[0].innerHTML = this.pad(totalSeconds%60);
  this.minutesLabel[0].innerHTML = this.pad(parseInt(totalSeconds/60));
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

module.exports = GameClock;
