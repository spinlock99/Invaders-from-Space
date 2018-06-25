import Drawable from './drawable';

function Ship() {
  this.nextX = null;
  this.nextX = null;
  this.thumbHeight = 100;

  this.draw = function () {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.x = this.nextX || this.x;
    this.y = this.nextY || this.y;
    this.context.drawImage(this.image, this.x, this.y);
  };

  this.move = function (x, y) {
    this.nextX = x - this.image.width / 2;
    this.nextY = y - this.thumbHeight;
  };
}

Ship.prototype = new Drawable();
export default Ship;
