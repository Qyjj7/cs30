// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  spawnBubble();
}

function draw() {
  background(220);
}

function spawnBubble() {
  let bubble = {
    x: random(width),
    y: random(height),
    size: random (5, 50),
    color: color(random(255), random(255), random(255)),
    time: 0,
  };
  bubbles.push(bubble);
}