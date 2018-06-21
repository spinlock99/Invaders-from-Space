import React from "react";


export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundLoaded: props.backgroundLoaded
    };
    this.canvas = null;
    this.background = new  Image();
    this.background.src = require("../../../images/background.png");
    this.draw = this.draw.bind(this)
    this.background.onload = this.draw;
    this.y = 0;
  }

  draw() {
    window.requestAnimationFrame(this.draw);
    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.background, 0, this.y);
    ctx.drawImage(this.background, 0, this.y - this.canvas.height);
    this.y += 1;
    if (this.y >= 120) this.y = 120 - this.background.height;
  }

  render() { return <canvas id="background" ref={e => this.canvas = e} /> }
};
