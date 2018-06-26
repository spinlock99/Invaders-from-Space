import Drawable from "canvas/drawable";
import Pool from "canvas/pool";

function Ship() {
  this.lasers = new Pool(40);
  this.leftGunOffset = 5;
  this.rightGunOffset = 33;

  this.nextX = null;
  this.nextY = null;

  this.draw = () =>
    {
      this.element.context.clearRect(this.x, this.y, this.width, this.height);
      this.x = this.nextX || this.x;
      this.y = this.nextY || this.y;
      this.element.context.drawImage(this.image, this.x, this.y);
    };

  this.move = (x, y) =>
    {
      this.nextX = x;
      this.nextY = y;
      this.draw();
    };

  this.fire = () => this.lasers.getTwo(this.x + this.leftGunOffset, this.x + this.rightGunOffset, this.y, 3);
}

Ship.prototype = new Drawable();
export default Ship;
