var Paddle = function () {
  this.position = {
    x: 100,
    y: 530
  };

  this.movement = {
    speed: 7
  };

  this.size = {
    height: 10,
    width: 80
  };

  this.movingLeft = false;
  this.movingRight= false;
};

Paddle.prototype.draw = function (ctx) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(this.position.x, this.position.y + 5,
                        this.size.width, 10);
};

Paddle.prototype.moveLeft = function () {
    this.movingLeft = true;

};

Paddle.prototype.moveRight = function () {
  // if (this.position.x > (900 - this.size.width)) {
  //   this.movingRight = false;
  // } else {
    this.movingRight = true;
  // }
};

Paddle.prototype.move = function (ctx) {
  if (this.position.x < 0) {
    if (this.movingRight === true) {
      this.position.x += this.movement.speed;
    } else if (this.movingLeft === true) {
      this.arrest();
    }
  } else if (this.position.x + this.size.width > 900) {
    if (this.movingLeft === true) {
      this.position.x -= this.movement.speed;
    } else if (this.movingLeft === true) {
      this.arrest();
    }
  } else if (this.movingRight === true) {
    this.position.x += this.movement.speed;
  } else if (this.movingLeft === true) {
    this.position.x -= this.movement.speed;
  }
  this.draw(ctx);
};

Paddle.prototype.arrest = function () {
  this.movingRight = false;
  this.movingLeft = false;
};


module.exports = Paddle;
