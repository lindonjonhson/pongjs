import './style.css'
import Phaser from 'phaser'

const gameStartDiv = document.querySelector('#gameStartDiv')
const gameStartBtn = document.querySelector('#gameStartBtn')
const gameEndDiv = document.querySelector('#gameEndDiv')
const gameWinLoseSpan = document.querySelector('#gameWinLoseSpan')
const gameEndScoreSpan = document.querySelector('#gameEndScoreSpan')

let ball;
let player1;
let player2;
let isGameStarted = false;
let cursors;
let keys = {};
let scoreText;
const paddleSpeed = 350;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

class GameScene extends Phaser.Scene{
  constructor(){
    super('scene-game')
  }
  preload(){
    this.load.image('ball','/assets/images/ball.png')
    this.load.image('paddle','/assets/images/paddle.png')
  }
  create(){

    this.scene.pause('scene-game')

    ball = this.physics.add.sprite(
      this.physics.world.bounds.width/2,
      this.physics.world.bounds.height/2,
      'ball'
    )

    player1 = this.physics.add.sprite(
      this.physics.world.bounds.width - (ball.body.width/2+1),
      this.physics.world.bounds.height/2,
      'paddle'
    )
    player2 = this.physics.add.sprite(
      ball.body.width/2+1,
      this.physics.world.bounds.height/2,
      'paddle'
    )

    //  Making the ball collider
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);

    //  Making the paddles-ball colliders and setting them as immovable, so the ball won't affect them
    player1.setImmovable(true)
    this.physics.add.collider(ball, player1);
    player1.setCollideWorldBounds(true);

    player2.setImmovable(true)
    this.physics.add.collider(ball, player2);
    player2.setCollideWorldBounds(true);

    //  Setting cursors and keys
    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //  Creating the score
    scoreText = this.add.text(this.physics.world.bounds.width/2-25,10, 'Score:',{
      font:'25px Arial',
      fill:'#ffffff'
    })
  }
  update(){

    //  Making the ball move
    if(!isGameStarted){
      //  Randomizing start speed
      const initialVelocityX = (Math.random() * 100) + 100;
      const initialVelocityY = (Math.random() * 100) + 100;

      ball.setVelocityX(initialVelocityX)
      ball.setVelocityY(initialVelocityY)
      isGameStarted = true
    }

    //  Making player1 move
    if(cursors.up.isDown){
      player1.body.setVelocityY(-paddleSpeed);
    }else if(cursors.down.isDown){
      player1.body.setVelocityY(paddleSpeed);
    }else{
      player1.body.setVelocityY(0)
    }

    //  Making player2 move
    if(keys.w.isDown){
      player2.body.setVelocityY(-paddleSpeed);
    }else if(keys.s.isDown){
      player2.body.setVelocityY(paddleSpeed);
    }else{
      player2.body.setVelocityY(0)
    }

    //  Setting speed limit for ball
    if(ball.body.velocity.y > paddleSpeed){
      ball.body.setVelocityY(paddleSpeed)
    }
    if(ball.body.velocity.y < -paddleSpeed){
      ball.body.setVelocityY(-paddleSpeed)
    }

    //  Checking if the ball hit one of the walls
    if(ball.body.x > player1.body.x){
      scorePlayer2++;
      console.log('Player1: '+ scorePlayer1 +' Player2: '+ scorePlayer2)
      this.scene.restart();
    }
    if(ball.body.x < player2.body.x){
      scorePlayer1++;
      console.log('Player1: '+ scorePlayer1 +' Player2: '+ scorePlayer2)
      this.scene.restart();
    }

  }
}

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

//  Start game
gameStartBtn.addEventListener('click', ()=>(
    gameStartDiv.style.display='none',
    game.scene.resume('scene-game')
))

function restartScene(){
  //this.scene.pause('scene-game');
  //this.scene.restart('scene-game');
  //scene.pause();
  scene.restart();

  ball.setVelocityX(initialVelocityX);
  ball.setVelocityY(initialVelocityY);
};
