import React from "react";
import Background from "canvas/background";
import Ship from "canvas/ship";
import ImageRepository from "canvas/image-repository";
import Laser from "canvas/laser";

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

    this.move = event => this.ship.move(event.touches[0].pageX, event.touches[0].pageY);

    this.init = () => {
      Background.prototype.context = this.contexts.background;
      this.background = new Background();
      this.background.init(0, 0, this.images.background);

      Ship.prototype.context = this.contexts.ship;
      Laser.prototype.context = this.contexts.ship;

      this.ship = new Ship();
      this.ship.init(this.start.x, this.start.y, this.images.ship);
      this.ship.laserImage = this.images.laser;
      this.ship.lasers.init(this.images.laser);

      this.animate();
      this.ship.draw();
      setInterval(() => this.ship.fire(this.ship.x, this.ship.y), 200);
    };

    this.animate = () => {
      window.requestAnimationFrame(this.animate);

      this.background.draw();
      this.ship.lasers.animate();
    };

    this.images = new ImageRepository(this.init);
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
