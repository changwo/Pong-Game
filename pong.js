
class Game {
  constructor(name){
    this.name = name;
    this.board = new Board(700, 500)
    this.setGameEventListener();
    console.log("pong")
    
  }

 
  startGame = () => {
    // start initializing game aspects....
    this.board.boardPlay()
    this.board.setNames();
  }

  setGameEventListener = () => {
    let button = document.getElementById('btn')
    const eventType = 'click';
    button.addEventListener(eventType, this.startGame) // clicing this, starts the game
  }


}

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = document.querySelector("canvas")
    this.ctx = this.canvas.getContext("2d");
    this.ball = new Ball(this.ctx, [350, 250], 2)
    this.paddle = new Paddle(this.ctx, "w", "s", [0, 230], "Habib");
    this.paddle2 = new Paddle(this.ctx, "o", "l", [680, 230], "Hugo");
    this.player1Score = 0;
    this.player2Score = 0;
  }

  logCanvas = () => {
    console.log(this.canvas)
  }

  renderBoard = () => {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  render = () => {
    this.renderBoard();
    this.ball.renderBall()
    this.paddle.renderPaddle()
    this.paddle2.renderPaddle()
    
  }

  boardPhys = () => {

    if(this.ball.ballPos[0] >= this.width || this.ball.ballPos[0] <= 0) {
      this.ball.vx = -this.ball.vx;
    }


    
    if (this.ball.ballPos[1] >= this.height || this.ball.ballPos[1] <= 0) {
      this.ball.vy = -this.ball.vy;
    }

    if(this.ball.ballPos[1] >= this.paddle.paddlePos[1] && this.ball.ballPos[1] <= this.paddle.paddlePos[1]+60 && this.ball.ballPos[0] <= this.paddle.paddlePos[0]+20) { //&& this.ball.ballPos[1] <= this.paddle.paddlePos[1]+60
      this.ball.vy = -this.ball.vy;
    }
    
    if(this.ball.ballPos[1] >= this.paddle2.paddlePos[1] && this.ball.ballPos[1] <= this.paddle2.paddlePos[1]+60 && this.ball.ballPos[0] >= this.paddle2.paddlePos[0]) { //&& this.ball.ballPos[1] <= this.paddle.paddlePos[1]+60
      this.ball.vy = -this.ball.vy;
    }
    
    if(this.ball.ballPos[0] <= this.paddle.paddlePos[0]+30 && this.ball.ballPos[1] >= this.paddle.paddlePos[1] && this.ball.ballPos[1] <= this.paddle.paddlePos[1]+60) {
      this.ball.vx = -this.ball.vx;
    }

    if(this.ball.ballPos[0] >= this.paddle2.paddlePos[0]-10 && this.ball.ballPos[1] >= this.paddle2.paddlePos[1] && this.ball.ballPos[1] <= this.paddle2.paddlePos[1]+60) {
      this.ball.vx = -this.ball.vx;
    }
  }

  boardPlay = () => {
  
    setInterval(() => {

      this.render();
      this.checkForPoints();
      this.ball.ballMove();
      this.boardPhys();

    }, 17)

  }

  resetBallPos = () => {
    this.ball.ballPos[0] = 350
    this.ball.ballPos[1] = 250
  }

  checkForPoints = () => {
    if (this.ball.ballPos[0] >= this.width) {
      this.blinkRed("right")
      this.player1Score += 1
      document.getElementById("player1Score").textContent = this.player1Score
      
      //this.resetBallPos()
      //this.syncSetTimeout(()=>{}, 500)
    }

    if (this.ball.ballPos[0] <= 0) {
      this.blinkRed("left")
      this.player2Score += 1
      document.getElementById("player2Score").textContent = this.player2Score
      
      //this.resetBallPos()
      //this.syncSetTimeout(()=>{}, 500)

    }
  }

  setNames = () => {
    document.getElementById("player1").textContent = this.paddle.playername;
    document.getElementById("player2").textContent = this.paddle2.playername;
  }

  syncSetTimeout = (fn, delay) => {
    const actual = Date.now(); // number that represents ms
    while(Date.now() - actual < delay) {} // new snapshot fo the this ms - initial
    fn();
  }

  blinkRed = (id) => {
    var f = document.getElementById(id);
    setTimeout(function() {
      f.style.display = (f.style.display == 'none' ? 'inline' : 'inline');
    }, 100);
    setTimeout(function() {
      f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 200);
  }



}

class Ball {
  constructor(ctx, ballPos, velocity) {
    this.ctx = ctx;
    this.ballPos = ballPos;
    this.velocity = velocity;
    this.vx = velocity;
    this.vy = velocity;
  }

  renderBall = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.ballPos[0], this.ballPos[1], 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
  }

  ballMove = () => {
    this.ballPos[0] += this.vx;
    this.ballPos[1] += this.vy;
  }

}

class Paddle {
  constructor(ctx, moveUpBtn, moveDwnBtn, paddlePos, playername) {
    this.ctx = ctx;
    this.moveUpBtn = moveUpBtn;
    this.moveDwnBtn = moveDwnBtn;
    this.paddlePos = paddlePos;
    this.playername = playername
    this.height = 60;
    this.width = 20;
    this.color = this.getRandomColour()
    this.setPaddleEventListener()
  }

  renderPaddle = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.paddlePos[0], this.paddlePos[1], this.width, this.height);
  }

  getRandomColour = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
  }

  setPaddleEventListener = () => {
    document.addEventListener("keypress", (event) => {
      //console.log(event);
      if (event.key === this.moveDwnBtn && this.paddlePos[1] <= 435 ) {
        this.paddlePos[1] += 5
      }
  
      if (event.key === this.moveUpBtn && this.paddlePos[1] >= 5) {
        this.paddlePos[1] -= 5
      }
  
  })
  }
}

const game1 = new Game("Game 1")
//game1.startGame()


