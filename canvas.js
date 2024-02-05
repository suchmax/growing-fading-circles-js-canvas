const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function makeCanvasFullscreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

makeCanvasFullscreen();

window.addEventListener("resize", makeCanvasFullscreen);

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let boxes = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function handleClick(e) {
    const newBox = { x: e.pageX, y: e.pageY, opacity: 2, radius: 0 };
    boxes.push(newBox);
}

function draw() {
    clearCanvas();
    boxes.forEach((box, index) => {
        ctx.beginPath();
        ctx.arc(box.x, box.y, box.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(128, 128, 128, ${box.opacity})`;
        ctx.stroke();
        box.opacity -= 0.002;
        box.radius += 0.1;
        if (box.opacity <= 0) {
            boxes.splice(index, 1);
        }
    });
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('click', handleClick);
window.addEventListener('resize', resize);
resize();

setInterval(() => {
    handleClick({pageX: getRandomInt(window.innerWidth), pageY: getRandomInt(window.innerHeight)});
}, 500);

setInterval(draw, 10);