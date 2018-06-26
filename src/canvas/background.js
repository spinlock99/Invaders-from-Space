import Drawable from './drawable';

function Background() {
  this.draw = function () {
    this.element.context.drawImage(this.image, 0, this.y);
    this.element.context.drawImage(this.image, 0, (this.y + this.height));
    this.element.context.drawImage(this.image, 0, (this.y - this.height));
    if (++this.y >= 360) this.y = 0;
  };
}

Background.prototype = new Drawable();
export default Background;
