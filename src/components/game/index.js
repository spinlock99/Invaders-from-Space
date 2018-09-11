import Background from "canvas/background";
import Drawable from "canvas/drawable";
import Enemy from "canvas/enemy";
import EnemyLaser from "canvas/enemy-laser";
import GameOver from "components/game-over";
import GameStart from "components/game-start";
import ImageRepository from "canvas/image-repository";
import Laser from "canvas/laser";
import Pool from "canvas/pool";
import PropTypes from "prop-types";
import QuadTree from "canvas/quad-tree";
import React from "react";
import Restart from "components/restart";
import Score from "components/score";
import Ship from "canvas/ship";
import styles from "./styles";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.quadTree = null;
    this.elements = { background: null, ship: null, main: null };
    this.shipStart = { x: 190, y: 700 };
    this.images = new ImageRepository(this.init);
  }

  init = () =>
    {
      this.background = new Background();
      this.background.init(0, 0, this.images.background);

      this.ship = new Ship();
      this.ship.init(this.shipStart.x, this.shipStart.y, this.images.ship);
      this.ship.lasers.init("laser", this.images.laser);

      this.enemies = new Pool(30);
      this.enemies.init("enemy", this.images.enemy);

      // the enemy laser pool is shared by all enemies so we put it on the prototype.
      Enemy.prototype.lasers.init("enemyLaser", this.images.enemyLaser);
      Drawable.prototype.store = this.context.store;

      this.background.draw();
      setTimeout(() => this.ship.draw(), 200);
    };

  checkReadyState = () =>
    {
      if (this.alreadyStarted) return;

      if (this.images.imagesToLoad) {
        setTimeout(() => this.checkReadyState(), 1000);
      } else {
        this.start();
      }
    };

  start = () =>
    {
      this.gameStart();
      this.alreadyStarted = true;
      this.animate();

      setInterval(() => this.ship.fire(this.ship.x, this.ship.y), 200);
    };

  restart = () =>
    {
      for (const key in this.elements) {
        this.elements[key].context.clearRect(0,0,this.elements[key].width, this.elements[key].height);
      }
      this.quadTree.clear();
      this.background.init(0, 0, this.images.background);
      this.ship.init(this.shipStart.x, this.shipStart.y, this.images.ship);
      this.enemies.init("enemy", this.images.enemy);
      Enemy.prototype.lasers.init("enemyLaser", this.images.enemyLaser);
      this.ship.lasers.init("laser", this.images.laser);

      this.ship.isColliding = false;
      this.ship.move(this.shipStart.x, this.shipStart.y);
      this.ship.lasers.reset();

      this.background.draw();
      this.ship.draw();
      this.start();
    };

  animate = () =>
    {
      this.quadTree.clear();
      this.quadTree.insert(this.ship);
      this.quadTree.insert(Enemy.prototype.lasers.getPool());
      this.quadTree.insert(this.ship.lasers.getPool());
      this.quadTree.insert(this.enemies.getPool());
      this.detectCollision();

      if (this.ship.isColliding) {
        this.gameOver();
        this.quadTree.clear();
      } else {
        this.background.draw();
        this.ship.lasers.animate();
        this.enemies.animate();
        Enemy.prototype.lasers.animate();

        if (this.enemies.getPool().length === 0) this.attack();

        window.requestAnimationFrame(this.animate);
      }
    };

  detectCollision = () =>
    {
      let objects = [];
      this.quadTree.getAllObjects(objects);

      for (let x = 0, len = objects.length; x < len; x++) {
        let obj = [];
        this.quadTree.findObjects(obj, objects[x]);

        for (let y = 0, length = obj.length; y < length; y++) {
          // DETECT COLLISION ALGORITHM
          if (objects[x].collidableWith === obj[y].type && (
            objects[x].x < obj[y].x + obj[y].image.width &&
            objects[x].x + objects[x].image.width  > obj[y].x &&
            objects[x].y < obj[y].y + obj[y].image.height &&
            objects[x].y + objects[x].image.height > obj[y].y
          )) {
            objects[x].isColliding = true;
            obj[y].isColliding     = true;
          }
        }
      }
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
      let psudoElement  = this.extract(element);
      psudoElement.context.scale(this.props.ratio, this.props.ratio);
      this.elements.main = psudoElement;
      Laser.prototype.element = psudoElement;
      Enemy.prototype.element = psudoElement;
      EnemyLaser.prototype.element = psudoElement;
    };

  setBackground = element =>
    {
      if (!element) return;
      let psudoElement  = this.extract(element);
      this.elements.background = psudoElement;
      psudoElement.context.scale(this.props.ratio, this.props.ratio);
      Background.prototype.element = psudoElement;
    };

  setShip = element =>
    {
      if (!element) return;
      let psudoElement  = this.extract(element);
      this.elements.ship = psudoElement;
      psudoElement.context.scale(this.props.ratio, this.props.ratio);
      Ship.prototype.element = psudoElement;
    };

  extract = element =>
    ({
      context: element.getContext("2d"),
      height: element.height,
      width: element.width,
      ratio: this.props.ratio,
    });

  move = event => this.ship.move(event.touches[0].pageX, event.touches[0].pageY);

  gameOver = () =>
    {
      this.context.store.dispatch({ type: "GAME_OVER" });
    }

  gameStart = () =>
    {
      this.context.store.dispatch({ type: "GAME_START" });
    }

  render() {
    return [
      <canvas key="background"
              width={this.props.width}
              height={this.props.height}
              style={{ ...styles.canvas, ...styles.bg }}
              ref={this.setBackground}
      />,
      <canvas key="main"
              width={this.props.width}
              height={this.props.height}
              style={{ ...styles.canvas, ...styles.main }}
              ref={this.setMain}
      />,
      <canvas key="ship"
              width={this.props.width}
              height={this.props.height}
              style={{ ...styles.canvas, ...styles.ship }}
              ref={this.setShip}
              onTouchStart={this.checkReadyState}
              onTouchMove={this.move}
      />,
      <Score key="score" />,
      <GameOver key="game-over" />,
      <GameStart key="game-start" />,
      <Restart key="restart" onTouchStart={this.restart} />,
    ];
  }
};

Game.contextTypes = {
  store: PropTypes.object.isRequired,
}
