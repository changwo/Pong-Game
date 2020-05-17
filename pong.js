class Game {
	constructor(name) {
		this.name = name;
		this.board = new Board(700, 500);
		this.setGameEventListener();
		console.log("pong");
	}

	startGame = () => {
		// start initializing game aspects....
		this.board.boardPlay();
		this.board.setNames();
	};

	setGameEventListener = () => {
		let button = document.getElementById("btn");
		const eventType = "click";
		button.addEventListener(eventType, this.startGame); // clicing this, starts the game
	};
}

class Board {
	constructor(width, height) {
		this.player1Score = 0;
		this.player2Score = 0;
		this.width = width;
		this.height = height;
		this.canvas = document.querySelector("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.paddle = new Paddle(this.ctx, "w", "s", [80, 230], "Habib", [this.width, this.height], 20, 120);
		this.paddle2 = new Paddle(this.ctx, "o", "l", [600, 230], "Hugo", [this.width, this.height], 20, 120);
		this.ball = new Ball(this.ctx, [width / 2, height / 2], 5, [this.width, this.height], this.paddle, this.paddle2, 36, [this.player1Score, this.player2Score]);
		this.ball2 = new Ball(this.ctx, [width / 2, height / 2], 4, [this.width, this.height], this.paddle, this.paddle2, 20, [this.player1Score, this.player2Score]);
		this.ball3 = new Ball(this.ctx, [width / 2, height / 2], 6, [this.width, this.height], this.paddle, this.paddle2, 30, [this.player1Score, this.player2Score]);
		this.ball4 = new Ball(this.ctx, [width / 2, height / 2], 7, [this.width, this.height], this.paddle, this.paddle2, 25, [this.player1Score, this.player2Score]);
		this.ball5 = new Ball(this.ctx, [width / 2, height / 2], 2, [this.width, this.height], this.paddle, this.paddle2, 33, [this.player1Score, this.player2Score]);
		this.ball6 = new Ball(this.ctx, [width / 2, height / 2], 12, [this.width, this.height], this.paddle, this.paddle2, 27, [this.player1Score, this.player2Score]);
		this.ball7 = new Ball(this.ctx, [width / 2, height / 2], 4, [this.width, this.height], this.paddle, this.paddle2, 29, [this.player1Score, this.player2Score]);
		this.ball8 = new Ball(this.ctx, [width / 2, height / 2], 5, [this.width, this.height], this.paddle, this.paddle2, 20, [this.player1Score, this.player2Score]);
		this.ball9 = new Ball(this.ctx, [width / 2, height / 2], 3, [this.width, this.height], this.paddle, this.paddle2, 12, [this.player1Score, this.player2Score]);
		this.ball10 = new Ball(this.ctx, [width / 2, height / 2], 1, [this.width, this.height], this.paddle, this.paddle2, 40, [this.player1Score, this.player2Score]);

	}

	logCanvas = () => {
		console.log(this.canvas);
	};

	renderBoard = () => {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.width, this.height);
	};

	render = () => {
		this.renderBoard();
		this.ball.renderBall();
		this.ball2.renderBall();
		this.ball3.renderBall();
		this.ball4.renderBall();
		this.ball5.renderBall();
		this.ball6.renderBall();
		this.ball7.renderBall();
		this.ball8.renderBall();
		this.ball9.renderBall();
		this.ball10.renderBall();
		this.paddle.renderPaddle();
		this.paddle2.renderPaddle();
	};



	boardPlay = () => {
		const renderGame = setInterval(() => {
			this.render();
			this.ball.checkForPoints();
			this.ball2.checkForPoints();
			this.ball3.checkForPoints();
			this.ball4.checkForPoints();
			this.ball5.checkForPoints();
			this.ball6.checkForPoints();
			this.ball7.checkForPoints();
			this.ball8.checkForPoints();
			this.ball9.checkForPoints();
			this.ball10.checkForPoints();
			this.ball.ballMove();
			this.ball.boardPhys();
			this.ball2.ballMove();
			this.ball2.boardPhys();
			this.ball3.ballMove();
			this.ball3.boardPhys();
			this.ball4.ballMove();
			this.ball4.boardPhys();
			this.ball5.ballMove();
			this.ball5.boardPhys();
			this.ball6.ballMove();
			this.ball6.boardPhys();
			this.ball7.ballMove();
			this.ball7.boardPhys();
			this.ball8.ballMove();
			this.ball8.boardPhys();
			this.ball9.ballMove();
			this.ball9.boardPhys();
			this.ball10.ballMove();
			this.ball10.boardPhys();
		}, 17);
	};

	stopRender = () => {
		clearInterval(renderGame);
	};



	// resetBallandQuickPause = () => {
	// 	this.ball2.resetBallPos();
	// 	this.ball2.resetBallPos();
	// 	this.ball3.resetBallPos();
	// 	this.syncSetTimeout(()=>{}, 500);
	// };

	setNames = () => {
		document.getElementById("player1").textContent = this.paddle.playername;
		document.getElementById("player2").textContent = this.paddle2.playername;
	};

	syncSetTimeout = (fn, delay) => {
		const actual = Date.now(); // number that represents ms
		while (Date.now() - actual < delay) {} // new snapshot fo the this ms - initial
		fn();
	};


}

class Ball {
	constructor(ctx, ballPos, velocity, boardDimension, paddle, paddle2, ballRadius, playerScores) {
		this.color = this.getRandomColour();
		this.ctx = ctx;
		this.ballPos = ballPos;
		this.velocity = velocity;
		this.vx = velocity;
		this.vy = velocity;
		this.boardWidth = boardDimension[0];
		this.boardHeight = boardDimension[1];
		this.paddle = paddle;
		this.paddle2 = paddle2;
		this.ballRadius = ballRadius;
		this.player1Score = playerScores[0];
		this.player2Score = playerScores[1];
	}

	renderBall = () => {
		
		this.ctx.beginPath();
		this.ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	};

	ballMove = () => {
		this.ballPos[0] += this.vx;
		this.ballPos[1] += this.vy;
	};

	resetBallPos = () => {
		this.ballPos[0] = this.boardWidth/2;
		this.ballPos[1] = this.boardHeight/2;
	};

	checkForPoints = () => {
		if (this.ballPos[0] >= this.boardWidth - this.ballRadius) {
			this.blinkRed("right");
			this.player1Score += 1;
			console.log(this.player1Score)
			document.getElementById("player1Score").textContent = this.player1Score;

		}

		if (this.ballPos[0] <= 0 + this.ballRadius) {
			this.blinkRed("left");
			this.player2Score += 1;
			console.log(this.player2Score)
			document.getElementById("player2Score").textContent = this.player2Score;


		}
	};

	getRandomColour = () => {
		return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
			Math.random() * 256
		)}, ${Math.floor(Math.random() * 256)})`;
	};

	blinkRed = (id) => {
		var f = document.getElementById(id);
		setTimeout(function () {
			f.style.display = f.style.display == "none" ? "inline" : "inline";
		}, 100);
		setTimeout(function () {
			f.style.display = f.style.display == "none" ? "" : "none";
		}, 200);
	};

	boardPhys = () => {

		// Wall Bounce Left and right
		if (this.ballPos[0] >= ( this.boardWidth - this.ballRadius) || this.ballPos[0] <= this.ballRadius) {
			this.vx = -this.vx;
		}

		// Wall Bounce Top and Bottom
		if (this.ballPos[1] >= (this.boardHeight - this.ballRadius) || this.ballPos[1] <= this.ballRadius) {
			this.vy = -this.vy;
		}


		//Paddle Left Top and Bottom collider
		if (

			// Top collider
			this.ballPos[1] >= (this.paddle.paddlePos[1] - this.ballRadius) &&

			// Bottom collider
			this.ballPos[1] <= (this.paddle.paddlePos[1] + this.paddle.height + this.ballRadius) &&

			// width of top and bottom collider
			this.ballPos[0] >= this.paddle.paddlePos[0] && this.ballPos[0] <= (this.paddle.paddlePos[0] + this.paddle.width)
		) {
			
			this.vy = -this.vy;
		}

		//Paddle Right Top and Bottom collider
		if (
			// Top collider
			this.ballPos[1] >= (this.paddle2.paddlePos[1] - this.ballRadius) && 

			// Bottom collider
			this.ballPos[1] <= (this.paddle2.paddlePos[1] + this.paddle2.height + this.ballRadius) &&

			// width of top and bottom collider
			this.ballPos[0] >= this.paddle2.paddlePos[0] && this.ballPos[0] <= (this.paddle2.paddlePos[0] + this.paddle2.width)

		) {
			this.vy = -this.vy;
		}

		//Paddle Left, paddle surface collider
		if (

			// paddle surface 
			this.ballPos[0] <=( this.paddle.paddlePos[0] + this.paddle.width + this.ballRadius) &&


			this.ballPos[0] >=( this.paddle.paddlePos[0] - this.ballRadius) &&

			// top end of surface
			this.ballPos[1] >= this.paddle.paddlePos[1] &&

			// bottom end of surface
			this.ballPos[1] <= this.paddle.paddlePos[1] + this.paddle.height
		) {
			this.vx = -this.vx;
		}

		//Paddle right, paddle surface & sub-surface collider
		if (
			// paddle surface 
			this.ballPos[0] >= (this.paddle2.paddlePos[0] - this.ballRadius) &&

			// paddle sub-surface
			this.ballPos[0] <= (this.paddle2.paddlePos[0] + this.paddle2.width + this.ballRadius) &&

			// top end of surface
			this.ballPos[1] >= this.paddle2.paddlePos[1] &&

			// bottom end of surface
			this.ballPos[1] <= (this.paddle2.paddlePos[1] + this.paddle2.height)
		) {
			this.vx = -this.vx;
		}
	};
}

class Paddle {
	constructor(ctx, moveUpBtn, moveDwnBtn, paddlePos, playername, boardWidthHeight, paddleWidth, paddleHeight) {
		this.ctx = ctx;
		this.moveUpBtn = moveUpBtn;
		this.moveDwnBtn = moveDwnBtn;
		this.paddlePos = paddlePos;
		this.playername = playername;
		this.width = paddleWidth;
		this.height = paddleHeight;
		this.color = this.getRandomColour();
		this.setPaddleEventListener();
		this.boardWidth = boardWidthHeight[0];
		this.boardHeight = boardWidthHeight[1];
	}

	renderPaddle = () => {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect( this.paddlePos[0], this.paddlePos[1], this.width, this.height );
	};

	getRandomColour = () => {
		return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
			Math.random() * 256
		)}, ${Math.floor(Math.random() * 256)})`;
	};

	setPaddleEventListener = () => {
		document.addEventListener("keypress", (event) => {
			let moveInterval = 5;
			if (event.key === this.moveDwnBtn && this.paddlePos[1] <= (this.boardHeight - this.height - moveInterval)) {
				this.paddlePos[1] += moveInterval;
			}

			if (event.key === this.moveUpBtn && this.paddlePos[1] >= moveInterval) {
				this.paddlePos[1] -= moveInterval;
			}
		});
	};
}

const game1 = new Game("Game 1");
//game1.startGame()
