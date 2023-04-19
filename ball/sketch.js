// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Ball {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(5, 20);
    this.colour = "red";
  }

  display() {
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x <= this.radius || this.x >= width-this.radius) {
      this.dx *= -1;
    }
    if (this.y <= this.radius || this.y >= height-this.radius) {
      this.dy *= -1;
    }
  }
  collisions(otherBall) {
    if (dist(this.x, this.y, otherBall.x, otherBall.y) < this.radius + otherBall.radius) {
      let tempX = this.dx;
      let tempY = this.dy;
      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}


let balls = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let someBall of balls) {
    for (let otherBall of balls) {
      if (otherBall !== someBall) {
        someBall.collisions(otherBall);
      }
    }
    someBall.move();
    someBall.display();
  }
}

function mousePressed() {
  let theBall = new Ball(mouseX, mouseY);
  balls.push(theBall);
}