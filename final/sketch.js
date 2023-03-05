// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let vec;
let pos;
let reach = 50;
let vel = 3;
let angle = 0;
let swingSpeed = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);

  vec = createVector(0,1);

  pos = createVector(0,0);
}

function draw() {
  background(220);

  userInput();
  display();
}

function userInput() {
  
  vec.normalize();
  vec.mult(reach);
  vec.setHeading(-angle);

  if (keyIsDown(87)) { //w
    pos.y -= vel;
  }
  if (keyIsDown(65)) { //a
    pos.x -= vel;
  }
  if (keyIsDown(83)) { //s
    pos.y += vel;
  }
  if (keyIsDown(68)) { //d
    pos.x += vel;
  }
  if (keyIsDown(37) && angle <= 4*PI/3) { //left
    angle += (PI/swingSpeed);
    console.log(angle);
  }
  if (keyIsDown(39) && angle >= -PI/3) { //right
    angle -= (PI/swingSpeed);
    console.log(angle);
  }

}

function display() {
  background(220);
  translate(width/2, height/2)
  rectMode(CENTER);
  rect(pos.x, pos.y, 20, 20);
  line(pos.x, pos.y, vec.x+pos.x, vec.y+pos.y);
}