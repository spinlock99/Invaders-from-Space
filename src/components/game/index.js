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
    this.background.onload = this.draw.bind(this)
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.background, 0, 0);
  }

  render() { return <canvas id="background" ref={e => this.canvas = e} /> }
};
