import Drawable from './drawable';

function Ship() {
  this.nextX = null;
  this.nextX = null;

  this.laserX = 0;
  this.laserY = -1;
  this.laserWidth = 0;
  this.laserHeight = 0;

  this.thumbHeight = 100;

  this.draw = function () {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.x = this.nextX || this.x;
    this.y = this.nextY || this.y;
    this.context.drawImage(this.image, this.x, this.y);
  }

  this.animateBullets = function () {
    this.context.clearRect(this.laserX, this.laserY, this.laserWidth, this.laserHeight);
    this.laserY -= 5;
    this.context.drawImage(this.laserImage, this.laserX, this.laserY);
  };

  this.move = function (x, y) {
    this.nextX = x - this.image.width / 2;
    this.nextY = y - this.thumbHeight;
    this.draw();
  };

  this.fire = function (x, y, width, height) {
    if (this.laserY < 0) {
      this.laserWidth = width;
      this.laserHeight = height;
      // clear laser rect before moving laser to new firing position
      this.context.clearRect(this.laserX, this.laserY, this.laserWidth, this.laserHeight);
      this.laserX = x + 19;
      this.laserY = y - 15;
    }
  };
}

Ship.prototype = new Drawable();
export default Ship;
