import React from "react";

const styles = {
  canvas: {
    position: "absolute",
    top: "0px",
    left: "0px",
    background: "transparent",
    width: "100%",
    height: "100%",
    margin: 0,
    overflow: "hidden",
  }
}

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = null;
    this.ship = null;
    this.state = {
      backgroundLoaded: props.backgroundLoaded
    };

    this.draw = this.draw.bind(this)

    this.background = new Image();
    this.background.src = require("../../../images/background.png");
    this.background.onload = this.draw;

    this.spaceship = new Image();
    this.spaceship.src = require("../../../images/spaceship.png");

    this.y = 0;
  }

  draw() {
    window.requestAnimationFrame(this.draw);

    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.background, 0, this.y);
    ctx.drawImage(this.background, 0, this.y - this.canvas.height);
    this.y += 1;
    if (this.y >= 120) this.y = 120 - this.background.height;

    const shipCtx = this.ship.getContext('2d');
    ctx.drawImage(this.spaceship, 130, 120);
  }

  render() {
    return [
      <canvas key="background" style={styles.canvas} ref={e => this.canvas = e} onTouchStart={e => console.log("touch start")} />,
      <canvas key="main" />,
      <canvas key="ship" ref={e => this.ship = e} />,
    ];
  }
};
