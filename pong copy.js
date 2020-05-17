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
		this.width = width;
		this.height = height;
		this.canvas = document.querySelector("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.paddle = new Paddle(this.ctx, "w", "s", [0, 230], "Habib");
		this.paddle2 = new Paddle(this.ctx, "o", "l", [680, 230], "Hugo");
		this.ball = new Ball(this.ctx, [width / 2, height / 2], 2, [this.width, this.height], this.paddle, this.paddle2);
		this.player1Score = 0;
		this.player2Score = 0;
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
		this.paddle.renderPaddle();
		this.paddle2.renderPaddle();
	};



	boardPlay = () => {
		const renderGame = setInterval(() => {
			this.render();
			this.checkForPoints();
			this.ball.ballMove();
			this.ball.boardPhys();
		}, 17);
	};

	stopRender = () => {
		clearInterval(renderGame);
	};

	resetBallPos = () => {
		this.ball.ballPos[0] = 350;
		this.ball.ballPos[1] = 250;
	};

	checkForPoints = () => {
		if (this.ball.ballPos[0] >= this.width) {
			this.blinkRed("right");
			this.player1Score += 1;
			document.getElementById("player1Score").textContent = this.player1Score;

			//this.resetBallPos()
			//this.syncSetTimeout(()=>{}, 500)
		}

		if (this.ball.ballPos[0] <= 0) {
			this.blinkRed("left");
			this.player2Score += 1;
			document.getElementById("player2Score").textContent = this.player2Score;

			//this.resetBallPos()
			//this.syncSetTimeout(()=>{}, 500)
		}
	};

	setNames = () => {
		document.getElementById("player1").textContent = this.paddle.playername;
		document.getElementById("player2").textContent = this.paddle2.playername;
	};

	syncSetTimeout = (fn, delay) => {
		const actual = Date.now(); // number that represents ms
		while (Date.now() - actual < delay) {} // new snapshot fo the this ms - initial
		fn();
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
}

class Ball {
	constructor(ctx, ballPos, velocity, boardDimension, paddle, paddle2) {
		this.ctx = ctx;
		this.ballPos = ballPos;
		this.velocity = velocity;
		this.vx = velocity;
		this.vy = velocity;
		this.boardWidth = boardDimension[0];
		this.boardHeight = boardDimension[1];
		this.paddle = paddle;
		this.paddle2 = paddle2;
	}

	renderBall = () => {
		this.ctx.beginPath();
		this.ctx.arc(this.ballPos[0], this.ballPos[1], 10, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = "#fff";
		this.ctx.fill();
	};

	ballMove = () => {
		this.ballPos[0] += this.vx;
		this.ballPos[1] += this.vy;
	};

	boardPhys = () => {
		if (this.ballPos[0] >= this.boardWidth || this.ballPos[0] <= 0) {
			this.vx = -this.vx;
		}

		if (this.ballPos[1] >= this.boardHeight || this.ballPos[1] <= 0) {
			this.vy = -this.vy;
		}

		if (
			this.ballPos[1] >= this.paddle.paddlePos[1] &&
			this.ballPos[1] <= this.paddle.paddlePos[1] + 60 &&
			this.ballPos[0] <= this.paddle.paddlePos[0] + 20
		) {
			//&& this.ball.ballPos[1] <= this.paddle.paddlePos[1]+60
			this.vy = -this.vy;
		}

		if (
			this.ballPos[1] >= this.paddle2.paddlePos[1] &&
			this.ballPos[1] <= this.paddle2.paddlePos[1] + 60 &&
			this.ballPos[0] >= this.paddle2.paddlePos[0]
		) {
			//&& this.ball.ballPos[1] <= this.paddle.paddlePos[1]+60
			this.vy = -this.vy;
		}

		if (
			this.ballPos[0] <= this.paddle.paddlePos[0] + 30 &&
			this.ballPos[1] >= this.paddle.paddlePos[1] &&
			this.ballPos[1] <= this.paddle.paddlePos[1] + 60
		) {
			this.vx = -this.vx;
		}

		if (
			this.ballPos[0] >= this.paddle2.paddlePos[0] - 10 &&
			this.ballPos[1] >= this.paddle2.paddlePos[1] &&
			this.ballPos[1] <= this.paddle2.paddlePos[1] + 60
		) {
			this.vx = -this.vx;
		}
	};
}

class Paddle {
	constructor(ctx, moveUpBtn, moveDwnBtn, paddlePos, playername) {
		this.ctx = ctx;
		this.moveUpBtn = moveUpBtn;
		this.moveDwnBtn = moveDwnBtn;
		this.paddlePos = paddlePos;
		this.playername = playername;
		this.height = 60;
		this.width = 20;
		this.color = this.getRandomColour();
		this.setPaddleEventListener();
	}

	renderPaddle = () => {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(
			this.paddlePos[0],
			this.paddlePos[1],
			this.width,
			this.height
		);
	};

	getRandomColour = () => {
		return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
			Math.random() * 256
		)}, ${Math.floor(Math.random() * 256)})`;
	};

	setPaddleEventListener = () => {
		document.addEventListener("keypress", (event) => {
			//console.log(event);
			if (event.key === this.moveDwnBtn && this.paddlePos[1] <= 435) {
				this.paddlePos[1] += 5;
			}

			if (event.key === this.moveUpBtn && this.paddlePos[1] >= 5) {
				this.paddlePos[1] -= 5;
			}
		});
	};
}

const game1 = new Game("Game 1");
//game1.startGame()
