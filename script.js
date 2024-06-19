// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables
let score = 0;
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10 };
let ballSpeedX = 5;
let ballSpeedY = 5;
let teleported = false;
let isMouseDown = false;

// Function to increase speed as score increases
function increaseSpeed() {
    if (score % 10 === 0 && score > 0) {
        ballSpeedX += 1;
        ballSpeedY += 1;
    }
}

// Function to teleport ball after score 100
function teleportBall() {
    if (score >= 100 && !teleported) {
        ball.x = Math.random() * canvas.width;
        ball.y = Math.random() * canvas.height;
        teleported = true;
    }
}

// Function to update game state
function updateGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    // Update ball position
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Check for wall collisions
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Update score
    score++;

    // Increase speed as score increases
    increaseSpeed();

    // Teleport ball after score 100
    teleportBall();

    // Display score
    ctx.font = '20px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText('Score: ' + score, 10, 30);

    // Request animation frame
    requestAnimationFrame(updateGame);
}

// Event listeners for mouse and touch events
canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        ball.x = event.clientX - canvas.getBoundingClientRect().left;
        ball.y = event.clientY - canvas.getBoundingClientRect().top;
    }
});

canvas.addEventListener('touchstart', (event) => {
    isMouseDown = true;
    const touch = event.touches[0];
    ball.x = touch.clientX - canvas.getBoundingClientRect().left;
    ball.y = touch.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    if (isMouseDown) {
        const touch = event.touches[0];
        ball.x = touch.clientX - canvas.getBoundingClientRect().left;
        ball.y = touch.clientY - canvas.getBoundingClientRect().top;
    }
});

canvas.addEventListener('touchend', () => {
    isMouseDown = false;
});

// Start game loop
updateGame();
