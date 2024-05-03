import './style.css'
import Phaser from 'phaser'

const config={
  type: Phaser.WEBGL,
  canvas:gameCanvas,
  width: 800,
  height: 640,
  scale: {
    //  Not necessary if I keep the CSS for the canvas
    // mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics:{
    default: 'arcade',
    arcade:{
      gravity: false,
      debug: true
    }
  },
  scene:[GameScene]
}

const game = new Phaser.Game(config);