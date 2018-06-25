export default function Drawable() {
  this.init = (x, y, image) => {
    this.x = x;
    this.y = y;
    this.width = image.width;
    this.height = image.height;
    this.image = image;
  }

  this.draw = () => {};
  this.move = () => {};
}
