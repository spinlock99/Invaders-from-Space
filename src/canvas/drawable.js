export default function Drawable() {
  this.speed = 0;
  this.type = "";
  this.collidableWith = "";
  this.isColliding = false;

  this.init = (x, y, image) => {
    this.x = x;
    this.y = y;
    this.width = image.width;
    this.height = image.height;
    this.image = image;
  }

  this.draw = () => {};
  this.move = () => {};
  this.isCollidableWith = object => this.collidableWith === object.type;
}
