import Drawable from "canvas/drawable";
import Pool from "canvas/pool";

function Ship() {
  this.thumbHeight = 100;
  this.lasers = new Pool(40);
  this.leftGunOffset = 5;
  this.rightGunOffset = 33;


  this.nextX = null;
  this.nextY = null;

  this.draw = () => {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.x = this.nextX || this.x;
    this.y = this.nextY || this.y;
    this.context.drawImage(this.image, this.x, this.y);
  }

  this.move = (x, y) => {
    this.nextX = x - this.image.width / 2;
    this.nextY = y - this.thumbHeight;
    this.draw();
  };

  this.fire = () => this.lasers.getTwo(this.x + this.leftGunOffset, this.x + this.rightGunOffset, this.y, 3);
}

Ship.prototype = new Drawable();
export default Ship;
