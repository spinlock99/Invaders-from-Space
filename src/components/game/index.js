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

    this.start = { x: 190, y: 700 };

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
    this.images.background = new Image();
    this.images.background.src = require("background.png");
    this.images.background.onload = e => --this.imagesToLoad || this.init();

    this.images.ship= new Image();
    this.images.ship.src = require("spaceship.png");
    this.images.ship.onload = e => --this.imagesToLoad || this.init();

    this.images.laser = new Image();
    this.images.laser.src = require("laser.png");
    this.images.laser.onload = e => --this.imagesToLoad || this.init();

    this.move = event => this.ship.move(event.touches[0].pageX, event.touches[0].pageY);

    this.init = () => {
      Background.prototype.context = this.contexts.background;
      this.background = new Background();
      this.background.init(0, 0, this.images.background);

      Ship.prototype.context = this.contexts.ship;
      this.ship = new Ship();
      this.ship.init(this.start.x, this.start.y, this.images.ship);
      this.ship.laserImage = this.images.laser;

      this.animate();
      this.ship.draw();
    };

    this.animate = () => {
      window.requestAnimationFrame(this.animate);

      this.background.draw();

      this.ship.fire(this.ship.x, this.ship.y, this.images.laser.width, this.images.laser.height);
      this.ship.animateBullets();
    };

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
