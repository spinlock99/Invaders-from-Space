export default function ImageRepository(onload) {
  this.imagesToLoad = 4;

  this.background = new Image();
  this.background.src = require("images/background.png");
  this.background.onload = e => --this.imagesToLoad || onload();

  this.ship = new Image();
  this.ship.src = require("images/spaceship.png");
  this.ship.onload = e => --this.imagesToLoad || onload();

  this.laser = new Image();
  this.laser.src = require("images/laser.png");
  this.laser.onload = e => --this.imagesToLoad || onload();

  this.enemyLaser = new Image();
  this.enemyLaser.src = require("images/enemy-laser.png");
  this.laser.onload = e => --this.imagesToLoad || onload();

  this.enemy = new Image();
  this.enemy.src = require("images/enemy.png");
  this.enemy.onload = e => --this.imagesToLoad || onload();
}
