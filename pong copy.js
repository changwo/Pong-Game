console.log("pong");
const canvas = document.querySelector("canvas")
console.log(canvas);
const ctx = canvas.getContext("2d");
const canvasWidth = 700
const canvasHeight = 500
const paddleMaxHeight = 5
const paddleMinHeight = 435
// rectangle
function renderBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
// circle
function renderBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
}


// paddle
function renderPaddle(posX, posY) {
    const width = 20;
    const height = 60;  // this represent px
    ctx.fillStyle = "blue";
    ctx.fillRect(posX, posY, width, height);
}


let goRight = true;
let posX = 60;
let posY = 10;
let vx = +2;
let vy = +2;
let paddleX = 10;
let paddleY = 10;

document.addEventListener("keypress", (event) => {
    console.log(event);
    if (event.key === "s" && paddleY <= paddleMinHeight ) {
      paddleY += 5
    }

    if (event.key === "w" && paddleY >= paddleMaxHeight) {
      paddleY -= 5
    }

})

setInterval(() => {
    renderBoard();
    renderBall(posX, posY)
    renderPaddle(paddleX, paddleY);
    // 0 + +1 = 1
    // 1 + +1 = 2
    // 699 + +1 = 700
    // 700 + -1 = 699
    posX += vx;
    posY += vy;
    if (posX >= canvasWidth || posX <= 0) {
        // 700 -> vx = +1 => vx = - (+1) = -1
        vx = -vx;
    }

    if (posY >= canvasHeight || posY <= 0) {
        vy = -vy;
    }

    
    if(posX <= paddleX+30 && posY > paddleY && posY < paddleY+60) {
      vx = -vx;
      
    }



  }, 17)