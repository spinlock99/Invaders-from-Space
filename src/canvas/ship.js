import Drawable from "canvas/drawable";
import Pool from "canvas/pool";

function Ship() {
  this.lasers = new Pool(40);
  this.leftGunOffset = 5;
  this.rightGunOffset = 33;
  this.thumbOffset = 60;

  this.nextX = null;
  this.nextY = null;

  this.type = "ship";
  this.collidableWith = "enemyLaser";

  this.draw = () =>
    {
      this.element.context.clearRect(this.x, this.y, this.width, this.height);
      this.x = this.nextX || this.x;
      this.y = this.nextY || this.y;
      this.element.context.drawImage(this.image, this.x, this.y);
    };

  this.move = (x, y) =>
    {
      this.nextX = x - this.image.width / 2;
      this.nextY = y - this.thumbOffset;

      if (this.isColliding) return;

      this.pewPews.get();
      this.draw();
    };

  this.fire = () =>
    {
      if (this.isColliding) return;
      this.lasers.getTwo(this.x + this.leftGunOffset, this.x + this.rightGunOffset, this.y, 3);
    }
}

Ship.prototype = new Drawable();
export default Ship;
