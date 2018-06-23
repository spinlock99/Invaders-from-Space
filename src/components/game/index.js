import React from "react";

const styles = {
  bg: {
    position: "absolute",
    top: "0px",
    left: "0px",
    background: "transparent",
    width: "100%",
    height: "100%",
    margin: 0,
    overflow: "hidden",
    zIndex: -2,
  },
  spaceship: {
    zIndex: 0,
  },
}

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.bg = null;
    this.ship = null;
    this.laser = null;
    this.imagesToLoad = 3;

    this.state = {
      backgroundLoaded: props.backgroundLoaded
    };

    this.draw = this.draw.bind(this)
    this.move = this.move.bind(this)

    this.background = new Image();
    this.background.src = require("background.png");
    this.background.onload = e => --this.imagesToLoad || this.draw();

    this.spaceship = new Image();
    this.spaceship.src = require("spaceship.png");
    this.spaceship.onload = e => --this.imagesToLoad || this.draw();

    this.laserImage = new Image();
    this.laserImage.src = require("laser.png");
    this.laserImage.onload = e => --this.imagesToLoad || this.draw();

    this.y = 0;

    this.shipX = 190;
    this.shipY = 700;
    this.shipNextX = 190;
    this.shipNextY = 700;

    this.laserX = this.shipX + 19;
    this.laserY = this.shipY - 15;
  }

  draw() {
    window.requestAnimationFrame(this.draw);

    const ctx = this.bg.getContext('2d');
    ctx.drawImage(this.background, 0, this.y);
    ctx.drawImage(this.background, 0, (this.y + 360));
    ctx.drawImage(this.background, 0, (this.y - 360));
    if (++this.y >= 360) this.y = 0;

    const shipCtx = this.ship.getContext('2d');
    shipCtx.clearRect(this.shipX, this.shipY, this.spaceship.width, this.spaceship.height);
    this.shipX = this.shipNextX;
    this.shipY = this.shipNextY;
    shipCtx.drawImage(this.spaceship, this.shipX, this.shipY);

    shipCtx.clearRect(this.laserX, this.laserY, this.laserImage.width, this.laserImage.height);
    this.laserY -= 5;
    if (this.laserY < 0) {
      this.laserY = this.shipY - 15;
      this.laserX = this.shipX +19;
    }
    shipCtx.drawImage(this.laserImage, this.laserX, this.laserY);
  }

  move(event) {
    this.shipNextX = event.touches[0].pageX - 20;
    this.shipNextY = event.touches[0].pageY - 30;
  }

  render() {
    return [
      <canvas key="background"
              width="414"
              height="736"
              style={styles.bg}
              ref={element => this.bg = element}
      />,
      <canvas key="ship"
              width="414"
              height="736"
              style={styles.spaceship}
              ref={element => this.ship = element}
              onTouchStart={this.move}
              onTouchMove={this.move}
      />,
      <canvas key="main" />,
    ];
  }
};
