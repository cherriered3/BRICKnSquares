const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

const basket = { x: 175, y: 450, width: 50, height: 20, speed: 5 };
const objects = [];
let score = 0;
let missed = 0;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basket.x > 0) {
        basket.x -= basket.speed;
    } else if (event.key === "ArrowRight" && basket.x + basket.width < canvas.width) {
        basket.x += basket.speed;
    }
});

function createObject() {
    const size = 15;
    objects.push({ 
        x: Math.random() * (canvas.width - size), 
        y: 0, 
        width: size, 
        height: size, 
        speed: 2 + Math.random() * 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
}

function updateObjects() {
    for (let i = 0; i < objects.length; i++) {
        objects[i].y += objects[i].speed;

        if (
            objects[i].y + objects[i].height >= basket.y &&
            objects[i].x + objects[i].width >= basket.x &&
            objects[i].x <= basket.x + basket.width
        ) {
            score++;
            objects.splice(i, 1);
            i--;
        } else if (objects[i].y > canvas.height) {
            missed++;
            objects.splice(i, 1);
            i--;
        }
    }
}

function drawBasket() {
    ctx.fillStyle = "white";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawObjects() {
    for (let obj of objects) {
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Missed: ${missed}`, 10, 40);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawObjects();
    drawScore();
    updateObjects();

    if (missed < 5) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 50, canvas.height / 2);
    }
}

setInterval(createObject, 1000);
gameLoop();
