import React from "react";
import Background from "canvas/background";
import Ship from "canvas/ship";
import ImageRepository from "canvas/image-repository";
import Laser from "canvas/laser";
import Enemy from "canvas/enemy";
import EnemyLaser from "canvas/enemy-laser";
import Pool from "canvas/pool";
import QuadTree from "canvas/quad-tree";
import styles from "./styles";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.quadTree = null;
    this.start = { x: 190, y: 700 };
    this.images = new ImageRepository(this.init);
  }

  animate = () => {
    this.quadTree.clear();
    this.quadTree.insert(this.ship.lasers.getPool());
    this.quadTree.insert(this.enemies.getPool());
    this.detectCollision();

    window.requestAnimationFrame(this.animate);

    this.background.draw();
    this.ship.lasers.animate();
    this.enemies.animate();
    Enemy.prototype.lasers.animate();
  };

  detectCollision = () =>
    {
      var objects = [];
      this.quadTree.getAllObjects(objects);

      for (var x = 0, len = objects.length; x < len; x++) {
        var obj = [];
        this.quadTree.findObjects(obj, objects[x]);

        for (var y = 0, length = obj.length; y < length; y++) {
          // DETECT COLLISION ALGORITHM
          if (objects[x].collidableWith === obj[y].type && (
            objects[x].x < obj[y].x + obj[y].width &&
            objects[x].x + objects[x].width > obj[y].x &&
            objects[x].y < obj[y].y + obj[y].height &&
            objects[x].y + objects[x].height > obj[y].y
          )) {
            objects[x].isColliding = true;
            obj[y].isColliding = true;
          }
        }
      }
    };

  init = () => {
    this.background = new Background();
    this.background.init(0, 0, this.images.background);

    this.ship = new Ship();
    this.ship.init(this.start.x, this.start.y, this.images.ship);
    this.ship.lasers.init("laser", this.images.laser);

    this.enemies = new Pool(30);
    this.enemies.init("enemy", this.images.enemy);

    // the enemy laser pool is shared by all enemies so we put it on the prototype.
    Enemy.prototype.lasers.init("enemyLaser", this.images.enemyLaser);

    this.animate();
    setTimeout(() => this.ship.draw(), 200);
    setTimeout(() => this.attack(), 200);
    setInterval(() => this.ship.fire(this.ship.x, this.ship.y), 200);
  };

  attack = () => {
    let x = 20;
    let y = -this.images.enemy.height;
    let spacer = y * 1.5;
    for (let i = 1; i <= 18; i++) {
      this.enemies.get(x, y, 2);
      x += this.images.enemy.width + 25;
      if (i % 6 === 0) {
        x = 20;
        y += spacer;
      }
    }
  };

  setMain = element =>
    {
      if (!element) return;
      this.quadTree = new QuadTree({ x: 0, y: 0, width: element.width, height: element.height });
      Laser.prototype.element = this.extract(element);
      Enemy.prototype.element = this.extract(element);
      EnemyLaser.prototype.element = this.extract(element);
    };

  setBackground = element =>
    {
      if (!element) return;
      Background.prototype.element = this.extract(element);
    };

  setShip = element =>
    {
      if (!element) return;
      Ship.prototype.element = this.extract(element);
    };

  extract = element =>
    ({
      context: element.getContext("2d"),
      height: element.height,
      width: element.width,
    });

  move = event => this.ship.move(event.touches[0].pageX, event.touches[0].pageY);

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
              style={{ ...styles.canvas, ...styles.ship }}
              ref={this.setShip}
              onTouchStart={this.move}
              onTouchMove={this.move}
      />,
    ];
  }
};
