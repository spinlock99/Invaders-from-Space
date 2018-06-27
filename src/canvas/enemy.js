import Drawable from "canvas/drawable";
import Pool from "canvas/pool";

function Enemy() {
  this.type = "enemy";
  this.collidableWith = "laser";
  this.alive = false;
  this.chanceToFire = .01;

  this.spawn = (x, y, speed) =>
    {
      this.alive = true;

      this.x = x;
      this.y = y;
      this.speed = speed;

      this.speedX = 0;
      this.speedY = speed;

      this.leftEdge = this.x - 20;
      this.rightEdge = this.x;
      this.bottomEdge = this.y + 200;
    };

  this.draw = () =>
    {
      this.element.context.clearRect(Math.floor(this.x), Math.floor(this.y), this.image.width + 1, this.image.height + 1);
      this.move();

      if (this.isColliding) return true;

      if (this.shouldFire()) this.fire();

      this.element.context.drawImage(this.image, this.x, this.y);
      return false;
    };

  this.move = () =>
    {
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
    };

  this.shouldFire = () => Math.floor(Math.random() * 1001) / 1000 < this.chanceToFire;

  this.fire = () => this.lasers.get(this.x + this.width / 2, this.y + this.height, -2.5);

  this.clear = () =>
    {
      this.x = 0;
      this.y = 0;
      this.speed = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.alive = false;
      this.isColliding = false;
    };
}

Enemy.prototype = new Drawable();
Enemy.prototype.lasers = new Pool(50);
export default Enemy;
