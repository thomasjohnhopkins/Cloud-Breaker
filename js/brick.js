var Brick = function (Coords) {
  this.position = {
    x: Coords[0],
    y: Coords[1]
  };

  this.size = {
    height: 15,
    width: 60
  };

  this.health = 3;
};

Brick.prototype.checkCollision = function (ball) {
  if (ball.position.x + 16 < this.position.x - 6 ||
      ball.position.x > this.position.x + this.size.width + 6) {
    return false;
  } else if (ball.position.y + 16 < this.position.y - 8 ||
              ball.position.y > this.position.y + this.size.height + 8) {
    return false;
  }


  // otherwise there is a hit
  if (ball.direction.x >= 0 && ball.direction.y > 0) {
    if ((ball.position.y + 16 <= this.position.y) &&
          (ball.position.x + 16 > this.position.x)) {
      ball.direction.y *= -1;
    } else if (ball.position.x + 16 > this.position.x) {
      ball.direction.y *= -1;
    } else if (ball.position.y + 16 <= this.position.y) {
      ball.direction.x *= -1;
    } else {
      ball.direction.x *= -1;
    }
  } else if (ball.direction.x <= 0 && ball.direction.y > 0 ) {
    // if ((ball.position.y + 30 < this.position.y) &&
    if (ball.position.x + 16 < this.position.x + this.size.width) {
      ball.direction.y *= -1;
    } else if (ball.position.x + 16 < this.position.x + this.size.width) {
      ball.direction.y *= -1;
    } else if (ball.position.y + 16 < this.position.y) {
      ball.direction.x *= -1;
    } else {
      ball.direction.x *= -1;
    }
  } else if (ball.direction.x >= 0 && ball.direction.y < 0) {
    if (ball.position.x + 16 > this.position.x) {
      ball.direction.y *= -1;
    } else if (ball.position.x + 16 > this.position.x) {
      ball.direction.y *= -1;
    } else if (ball.position.y + 16 < this.position.y + this.size.height) {
      ball.direction.x *= -1;
    } else {
      ball.direction.x *= -1;
    }
  } else if (ball.direction.x <= 0 && ball.direction.y < 0) {
    if ((ball.position.x + 16 < this.position.x + this.size.width) &&
          (ball.position.y < this.position.y + this.size.height)) {
      // ball.direction.x *= -1;
      ball.direction.y *= -1;
    } else if (ball.position.x + 16 < this.position.x + this.size.width) {
      ball.direction.y *= -1;
    } else if (ball.position.y < this.position.y + this.size.height) {
      ball.direction.x *= -1;
    } else {
      ball.direction.x *= -1;
    }
  } else {
    // ball.direction.x *= -1;
    // ball.direction.y *= -1;
  }
  var toDestroy = this.applyCollisionForce(true);
  if (toDestroy) {
    return toDestroy;
  }
};

Brick.prototype.applyCollisionForce = function (hit) {
  if (hit) {
    this.health -= 1;
  }
  if (this.health === 2) {
    return 10;
  } else if (this.health === 1) {
    return 20;
  } else if (this.health === 0) {
    return 30;
  }
};

Brick.prototype.removeBrick = function (brick) {
  // Logic to clear the brick based on position
};

Brick.prototype.draw = function (ctx) {
  if (this.health === 3) {
    ctx.fillStyle = "rgb(168, 163, 163)";
    // ctx.fillRect(this.position.x, this.position.y,
    //                       this.size.width, this.size.height);
  } else if (this.health === 2) {
    ctx.fillStyle = "rgb(199,195,195)";
    // ctx.fillRect(this.position.x, this.position.y,
    //                       this.size.width, this.size.height);
  } else {
    ctx.fillStyle = "rgb(255,255,255)";
    // ctx.fillRect(this.position.x, this.position.y,
    //                       this.size.width, this.size.height);
  }

  ctx.beginPath();
  ctx.rect(this.position.x, this.position.y,
                        60, 15);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.fill();
};

module.exports = Brick;
