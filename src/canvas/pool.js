import Laser from "canvas/laser";
import Enemy from "canvas/enemy";
import EnemyLaser from "canvas/enemy-laser";

export default function Pool(size) {
  this.size = size;
  this.pool = [];

  this.init = (type, image) => {
    for (let i = 0; i < this.size; i++) {
      let object = null;
      switch (type) {
        case "laser":
          object = new Laser();
          object.type = "laser";
          object.collidableWith = "enemy";
          break;
        case "enemy":
          object = new Enemy();
          break;
        case "enemyLaser":
          object = new EnemyLaser();
          object.type = "enemyLaser";
          object.collidableWith = "ship";
          break;
      }
      object.init(0, 0, image);
      this.pool[i] = object;
    }
  };

  this.get = (x, y, speed) => {
    if (!this.pool[this.size - 1].alive) {
      this.pool[this.size - 1].spawn(x, y, speed);
      this.pool.unshift(this.pool.pop());
    }
  };

  this.getTwo = (x1, x2, y, speed) => {
    if (!this.pool[this.size - 1].alive && !this.pool[this.size - 2].alive) {
      this.get(x1, y, speed);
      this.get(x2, y, speed);
    }
  };

  this.animate = () => {
    for (let i = 0; i < size; i++) {
      if (!this.pool[i].alive) { break; }

      if (this.pool[i].draw()) {
        this.pool[i].clear();
        this.pool.push(this.pool.splice(i, 1)[0]);
      }
    }
  };

  this.getPool = () =>
    {
      var obj = [];
      for (var i = 0; i < size; i++) {
        if (this.pool[i].alive) {
          obj.push(this.pool[i]);
        }
      }
      return obj;
    };
}
