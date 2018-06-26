import Drawable from "canvas/drawable";

function Enemy() {
  this.percentFire = .01;
  this.chance = 0;
  this.alive = false;

  this.spawn = (x, y, speed) => {
    this.alive = true;

    this.x = x;
    this.y = y;
    this.speed = speed;

    this.speedX = 0;
    this.speedY = speed;

    this.leftEdge = this.x - 90;
    this.rightEdge = this.x + 90;
    this.bottomEdge = this.y + 140;
  };

  this.draw = () => {
    this.element.context.clearRect(this.x - 1, this.y, this.width + 1, this.height);
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= this.leftEdge) {
      this.speedX = this.speed;
    } else if (this.x >= this.rightEdge + this.width) {
      this.speedX = -this.speed;
    } else if (this.y >= this.bottomEdge) {
      this.speed = 1.5;
      this.speedY = 0;
      this.y -= 5;
      this.speedX = -this.speed;
    }

    this.element.context.drawImage(this.image, this.x, this.y);

    this.chance = Math.floor(Math.random() * 101);
    if (this.chance / 100 < this.percentFire) {
      this.fire();
    }
  };

  this.fire = () => this.lasers.get(this.x + this.width / 2, this.y + this.height, -2.5);

  this.clear = () => {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.alive = false;
  }
}

Enemy.prototype = new Drawable();
export default Enemy;
