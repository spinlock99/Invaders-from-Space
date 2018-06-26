import React from "react";
import Background from "canvas/background";
import Ship from "canvas/ship";
import ImageRepository from "canvas/image-repository";
import Laser from "canvas/laser";
import Enemy from "canvas/enemy";
import EnemyLaser from "canvas/enemy-laser";
import Pool from "canvas/pool";

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
    this.images = new ImageRepository(this.init);
  }

  init = () => {
    this.background = new Background();
    this.background.init(0, 0, this.images.background);

    this.ship = new Ship();
    this.ship.init(this.start.x, this.start.y, this.images.ship);
    this.ship.lasers.init("laser", this.images.laser);

    this.enemies = new Pool(30);
    this.enemies.init("enemy", this.images.enemy);
    let x = 100;
    let y = -this.images.enemy.height;
    let spacer = y * 1.5;
    for (let i = 1; i <= 18; i++) {
      this.enemies.get(x, y, 2);
      x += this.images.enemy.width + 25;
      if (i % 6 === 0) {
        x = 100;
        y += spacer;
      }
    }

    Enemy.prototype.lasers = new Pool(50);
    Enemy.prototype.lasers.init("enemyLaser", this.images.enemyLaser);

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
    Enemy.prototype.element = this.extract(element);
    EnemyLaser.prototype.element = this.extract(element);
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
    this.enemies.animate();
    Enemy.prototype.lasers.animate();
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
