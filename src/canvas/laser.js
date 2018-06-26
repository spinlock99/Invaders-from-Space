import Drawable  from "canvas/drawable";

function Laser(type) {
  this.type = type;
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
    this.element.context.clearRect(this.x, this.y, this.width, this.height);
    this.y -= this.speed;

    if (this.type === "enemy") {
      if (this.y >= this.element.height) return true;
    } else {
      if (this.y <= 0 - this.height) return true;
    }

    this.element.context.drawImage(this.image, this.x, this.y);
    return false;
  };
}

Laser.prototype = new Drawable();
export default Laser;
