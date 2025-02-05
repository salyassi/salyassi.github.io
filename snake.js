// Automated Snake Game

const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 300;
canvas.style.position = "absolute";
canvas.style.bottom = "20px";
canvas.style.left = "150px";
canvas.style.backgroundColor = "black";
canvas.style.border = "3px solid white"; // Add a white border
canvas.style.borderRadius = "5px"; // Optional: Rounded corners

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
const box = 10;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

// AI-controlled movement
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "RIGHT") head.x += box;
    else if (direction === "LEFT") head.x -= box;
    else if (direction === "UP") head.y -= box;
    else if (direction === "DOWN") head.y += box;

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

// Basic AI to follow food
function updateDirection() {
    let head = snake[0];
    if (head.x < food.x) direction = "RIGHT";
    else if (head.x > food.x) direction = "LEFT";
    else if (head.y < food.y) direction = "DOWN";
    else if (head.y > food.y) direction = "UP";
}

// Draw snake and food
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    ctx.fillStyle = "green";
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, box, box));
}

function gameLoop() {
    updateDirection();
    moveSnake();
    draw();
}

setInterval(gameLoop, 150);
