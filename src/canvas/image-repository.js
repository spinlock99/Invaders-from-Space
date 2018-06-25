export default function ImageRepository(init) {
  this.imagesToLoad = 3;

  this.background = new Image();
  this.background.src = require("background.png");
  this.background.onload = e => --this.imagesToLoad || init();

  this.ship = new Image();
  this.ship.src = require("spaceship.png");
  this.ship.onload = e => --this.imagesToLoad || init();

  this.laser = new Image();
  this.laser.src = require("laser.png");
  this.laser.onload = e => --this.imagesToLoad || init();
}
