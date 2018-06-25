import React from "react";
import Background from "canvas/background";
import Ship from "canvas/ship";

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

    this.contexts = {
      background: null,
      ship: null,
    };
    this.setBackgroundContext = element => element && (this.contexts.background = element.getContext('2d'));
    this.setShipContext = element => element && (this.contexts.ship = element.getContext('2d'));

    this.images = {
      background: null,
      ship: null,
      laser: null,
    };
    this.imagesToLoad = Object.keys(this.images).length;

    this.componentDidMount = this.componentDidMount.bind(this);

    this.init = this.init.bind(this);
    this.draw = this.draw.bind(this);
    this.move = event => this.ship.move(event.touches[0].pageX, event.touches[0].pageY);

    this.shipX = 190;
    this.shipY = 700;

    this.laserX = this.shipX + 19;
    this.laserY = this.shipY - 15;
  }

  componentDidMount() {
    this.images.background = new Image();
    this.images.background.src = require("background.png");
    this.images.background.onload = e => --this.imagesToLoad || this.init();

    this.images.ship= new Image();
    this.images.ship.src = require("spaceship.png");
    this.images.ship.onload = e => --this.imagesToLoad || this.init();

    this.laserImage = new Image();
    this.laserImage.src = require("laser.png");
    this.laserImage.onload = e => --this.imagesToLoad || this.init();
  }

  init() {
    Background.prototype.context = this.contexts.background;
    this.background = new Background();
    this.background.init(0, 0, this.images.background);

    Ship.prototype.context = this.contexts.ship;
    this.ship = new Ship();
    this.ship.init(this.shipX, this.shipY, this.images.ship);

    this.draw();
  }

  draw() {
    window.requestAnimationFrame(this.draw);

    this.background.draw();
    this.ship.draw();

    // Lasers
    this.contexts.ship.clearRect(this.laserX, this.laserY, this.laserImage.width, this.laserImage.height);
    this.laserY -= 5;
    if (this.laserY < 0) {
      this.laserY = this.shipY - 15;
      this.laserX = this.shipX + 19;
    }
    this.contexts.ship.drawImage(this.laserImage, this.laserX, this.laserY);
  }


  render() {
    return [
      <canvas key="background"
              width="414"
              height="736"
              style={styles.bg}
              ref={this.setBackgroundContext}
      />,
      <canvas key="ship"
              width="414"
              height="736"
              style={styles.spaceship}
              ref={this.setShipContext}
              onTouchStart={this.move}
              onTouchMove={this.move}
      />,
      <canvas key="main" />,
    ];
  }
};
