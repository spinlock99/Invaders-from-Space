import Drawable  from "canvas/drawable";

function Laser() {
  this.alive = false;

  this.clear = () =>
    {
      this.x = 0;
      this.y = 0;
      this.speed = 0;
      this.alive = false;
      this.isColliding = false;
    };

  this.spawn = (x, y, speed) =>
    {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.alive = true;
    };

  this.draw = () =>
    {
      this.element.context.clearRect(
        Math.floor(this.x),
        Math.floor(this.y),
        this.image.width + 1,
        this.image.height + 1
      );

      this.y -= this.speed; // move

      if (this.isColliding) return true;
      if (this.isOffPage()) return true;

      this.element.context.drawImage(this.image, this.x, this.y);
      return false;
    };

  this.isOffPage = () => this.y <= 0 - this.height;
}

Laser.prototype = new Drawable();
export default Laser;
