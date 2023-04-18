// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Spark {

  constructor(x, y, dx, dy, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.size = 5;
    this.gravity = 0.8;
    this.alpha = 255;
  }

  display() {
    noStroke();
    fill(this.r, this. g, this.b, this.alpha);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.y += this.gravity;
    this.gravity += 0.01;
    this.alpha --;
  }

  isDead() {
    return this.alpha <= 0;
  }
}


let fireworks = [];
let colorOptions = ["red", "green", "blue", "orange", "purple"];


function setup() {

  createCanvas(windowWidth, windowHeight);
}


function draw() {

  background("black");
  for (let i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();

    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
  }
}


function spawnSpark() {

  let dx = random(-4, 4);
  let dy = random(-4, 4);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let thisSpark = new Spark(mouseX, mouseY, dx, dy, r, g, b);
  fireworks.push(thisSpark);
}

function mousePressed() {

  for (let i = 0; i < 100; i++) {
    spawnSpark();
  }
}