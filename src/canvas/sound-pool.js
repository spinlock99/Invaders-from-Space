export default function SoundPool(size) {
  this.volumes = { "laser": .05, "explosion": .2 };
  this.size = size;
  this.currSound = 0;
  /*
   * Populates the pool array with the given sound.
   */
  this.init = type =>
    {
      this.pool = (new Array(size)).fill(true).map(() =>
        {
          // Initialize the sound
          let sound = new Audio(require(`audio/${type}.mp3`));
          sound.volume = this.volumes[type];
          sound.load();
          return sound;
        }
      );
    };

  /*
   * Plays a sound
   */
  this.get = () =>
    {
      if(this.pool[this.currSound].currentTime == 0 || this.pool[this.currSound].ended) {
        this.pool[this.currSound].play();
      }
      this.currSound = (this.currSound + 1) % size;
    };

  this.readyState = () => this.pool.reduce((accumulator, currSound) => (currSound.readyState === 4) && accumulator, true)

}
