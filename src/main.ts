import Phaser from 'phaser';

import './style.css';

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('logo', 'vite.svg');
  }

  create() {
    const particles = this.add.particles(0, 0, 'logo', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);

    const FKey = this.input.keyboard!.addKey('F');
    const currentScene = this.scene.scene;

    FKey.on('down', function () {
      if (currentScene.scale.isFullscreen) {
        currentScene.scale.stopFullscreen();
      }
      else {
        currentScene.scale.startFullscreen();
      }

    }, this);
  }

  update() {
    (() => {
      const gameDiv = document.getElementById("app"); // Target div that wraps the phaser game
      gameDiv!.style.width = '100%'; // set width to 100%
      gameDiv!.style.height = '100%'; // set height to 100%
    })();
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: Example
};

const game = new Phaser.Game(config);