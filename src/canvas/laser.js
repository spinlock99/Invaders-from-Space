import Drawable  from "canvas/drawable";

function Laser() {
  this.alive = false;

  this.clear = () => {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.alive = false;
  };

  this.spawn = (x, y, speed) => {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

  this.draw = () => {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.y -= this.speed;
    if (this.y <= 0 - this.height) {
      return true;
    } else {
      this.context.drawImage(this.image, this.x, this.y);
    }
  };
}

Laser.prototype = new Drawable();
export default Laser;
