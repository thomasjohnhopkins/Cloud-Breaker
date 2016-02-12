var Paddle = function () {
  this.position = {
    x: 100,
    y: 530
  };

  this.movement = {
    speed: 40
  };

  this.size = {
    height: 10,
    width: 80
  };
};

Paddle.prototype.draw = function (ctx) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(this.position.x, this.position.y + 5,
                        this.size.width, 10);
};

Paddle.prototype.moveLeft = function () {
  if (this.position.x > 0) {
    this.position.x -= this.movement.speed;
  }
};

Paddle.prototype.moveRight = function () {
  if (this.position.x < (900 - this.size.width)) {
    this.position.x += this.movement.speed;
  }
};


module.exports = Paddle;
