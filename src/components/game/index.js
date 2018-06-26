import React from "react";
import Background from "canvas/background";
import Ship from "canvas/ship";
import ImageRepository from "canvas/image-repository";
import Laser from "canvas/laser";

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
  bg: {
    zIndex: -2,
  },
  spaceship: {
    zIndex: 0,
  },
  main: {
    zIndex: -1,
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
    this.elements = {
      main: {},
    };

    this.images = new ImageRepository(this.init);
  }

  init = () => {
    this.background = new Background();
    this.background.init(0, 0, this.images.background);

    this.ship = new Ship();
    this.ship.init(this.start.x, this.start.y, this.images.ship);
    this.ship.lasers.init(this.images.laser);

    this.animate();
    setTimeout(() => this.ship.draw(), 200);
    setInterval(() => this.ship.fire(this.ship.x, this.ship.y), 200);
  };

  extract = element => ({
    context: element.getContext("2d"),
    height: element.height,
    width: element.width,
  });

  setBackground = element => {
    if (!element) return;
    Background.prototype.element = this.extract(element);
  };

  setMain = element => {
    if (!element) return;
    Laser.prototype.element = this.extract(element);
  };

  setShip = element => {
    if (!element) return;
    Ship.prototype.element = this.extract(element);
  };

  move = event => this.ship.move(event.touches[0].pageX, event.touches[0].pageY);

  animate = () => {
    window.requestAnimationFrame(this.animate);

    this.background.draw();
    this.ship.lasers.animate();
  };

  render() {
    return [
      <canvas key="background"
              width="414"
              height="736"
              style={{ ...styles.canvas, ...styles.bg }}
              ref={this.setBackground}
      />,
      <canvas key="main"
              width="414"
              height="736"
              style={{ ...styles.canvas, ...styles.main }}
              ref={this.setMain}
      />,
      <canvas key="ship"
              width="414"
              height="736"
              style={{ ...styles.canvas, ...styles.spaceship }}
              ref={this.setShip}
              onTouchStart={this.move}
              onTouchMove={this.move}
      />,
    ];
  }
};
