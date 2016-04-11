var Ball = function (xCoord, yCoord) {
  this.inPlay = false;

  this.position = {
    x: xCoord,
    y: yCoord
  };

  this.direction = {
    x: -1,
    y: 1
  };

  this.centerOfMass = {
    x: this.position.x + 8,
    y: this.position.y + 8
  };


  this.movement = {
    speed: 4
  };

  this.size = {
    height: 16,
    width: 16
  };

  this.image = Ball.SUN_EMOJI;

  this.lifeLost = false;
};

Ball.SUN_EMOJI = new Image();
Ball.SUN_EMOJI.src = 'images/sun.png';


Ball.prototype.draw = function (ctx) {
  ctx.drawImage(this.image, this.position.x, this.position.y, 25, 25);
};

Ball.prototype.move = function (ctx) {
  if (this.position.x <= 0) {
    this.direction.x *= -1;
  }

  if (this.position.x >= 870) {
    this.direction.x *= -1;
  }

  if (this.position.y <= 0) {
    this.direction.y *= -1;
  }

  if (this.position.y >= 550) {
    this.reset();
  }

  this.position.x += (this.movement.speed * this.direction.x);
  this.position.y += (this.movement.speed * this.direction.y);
  this.centerOfMass.x += (this.movement.speed * this.direction.x);
  this.centerOfMass.y += (this.movement.speed * this.direction.y);
};

Ball.prototype.reset = function () {
  this.lifeLost = true;
};

Ball.prototype.checkCollision = function (object) {
  if (this.centerOfMass.x > object.position.x + object.size.width + 8) {
    return false;
  }
  if (this.centerOfMass.x < object.position.x - 8) {
    return false;
  }
  if ((this.position.y + this.size.height) < object.position.y) {
    return false;
  }
  if (this.position.y + this.size.height > object.position.y + 8) {
    return false;
  }


  if (this.centerOfMass.x >= (object.position.x - 12.5) &&
        this.centerOfMass.x <= (object.position.x + object.size.width + 12.5)) {
    this.direction.y *= -1;
  }

    if (this.centerOfMass.x < object.position.x + 10) {
      this.direction.x = -2;
    } else if (this.centerOfMass.x < object.position.x + 20) {
      this.direction.x = -1.5;
    } else if (this.centerOfMass.x < object.position.x + 30) {
      this.direction.x = -1.0;
    } else if (this.centerOfMass.x < object.position.x + 38) {
      this.direction.x = -0.5;
    } else if (this.centerOfMass.x < object.position.x + 42) {
      this.direction.x = -0.15;
    } else if (this.centerOfMass.x < object.position.x + 46) {
      this.direction.x = 0.15;
    } else if (this.centerOfMass.x < object.position.x + 50) {
      this.direction.x = 0.5;
    } else if (this.centerOfMass.x < object.position.x + 60) {
      this.direction.x = 1.0;
    } else if (this.centerOfMass.x < object.position.x + 70) {
      this.direction.x = 1.5;
    } else {
      this.direction.x = 2.0;
    }

};

module.exports = Ball;
