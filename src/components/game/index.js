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
  },
  spaceship: {
    zIndex: 100,
  },
}

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = null;
    this.ship = null;
    this.imagesToLoad = 2;

    this.state = {
      backgroundLoaded: props.backgroundLoaded
    };

    this.draw = this.draw.bind(this)

    this.background = new Image();
    this.background.src = require("../../../images/background.png");
    this.background.onload = e => --this.imagesToLoad || this.draw();

    this.spaceship = new Image();
    this.spaceship.src = require("../../../images/spaceship.png");
    this.spaceship.onload = e => --this.imagesToLoad || this.draw();

    this.y = 0;

    this.shipX = 207;
    this.shipY = 700;
  }

  draw() {
    window.requestAnimationFrame(this.draw);

    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.background, 0, this.y);
    ctx.drawImage(this.background, 0, (this.y + 360));
    ctx.drawImage(this.background, 0, (this.y - 360));
    if (++this.y >= 360) this.y = 0;

    const shipCtx = this.ship.getContext('2d');
    ctx.drawImage(this.spaceship, this.shipX, this.shipY);
  }

  render() {
    return [
      <canvas key="ship"
              width="414"
              height="736"
              style={styles.spaceship}
              ref={element => this.ship = element}
      />,
      <canvas key="background"
              width="414"
              height="736"
              style={styles.canvas}
              ref={element => this.canvas = element}
              onTouchStart={event => { this.shipX = event.touches[0].pageX - 20; this.shipY = event.touches[0].pageY - 30 }}
              onTouchMove={event => { this.shipX = event.touches[0].pageX - 20; this.shipY = event.touches[0].pageY - 30 }}
      />,
      <canvas key="main" />,
    ];
  }
};
