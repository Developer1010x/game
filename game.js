const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

canvas.width = 800;
canvas.height = 600;

let balls = [];
let paddle;
let score = 0;
let animationId;
let rightPressed = false;
let leftPressed = false;

function initializeGame() {
    balls = [
        { x: canvas.width / 2, y: canvas.height / 2, dx: 2, dy: 2, speed: 2 }
    ];
    paddle = {
        height: 10,
        width: 75,
        x: (canvas.width - 75) / 2
    };
    score = 0;
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 8, 20);
}

function updateBall(ball) {
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;

    if (ball.x + ball.dx > canvas.width - 10 || ball.x + ball.dx < 10) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < 10) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - 10) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            score++;
            ball.speed += 0.1;
        } else {
            initializeGame();
        }
    }
}

function updatePaddle() {
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        drawBall(ball);
        updateBall(ball);
    });

    drawPaddle();
    updatePaddle();
    drawScore();

    if (score >= 60 && balls.length === 1) {
        balls.push(
            { x: canvas.width / 2, y: canvas.height / 2, dx: -2, dy: -2, speed: 2 }
        );
    }

    animationId = requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

startButton.addEventListener('click', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    initializeGame();
    gameLoop();
});
