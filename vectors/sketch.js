// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let vec;
let basePos;
let modMouseX;
let modMouseY;
let reach = 50;
let vel = 3;
let angle = 0;
let swingSpeed = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);

  vec = createVector(0,1);
  basePos = createVector(0,0);
}

function draw() {

  modifyMouse();
  userInput();
  display();
}

function userInput() {
  
  vec.x = modMouseX;
  vec.y = -modMouseY;
  vec.normalize();
  vec.mult(reach);

  //vec.setHeading(-angle);

  if (keyIsDown(87)) { //w
    basePos.y -= vel;
  }
  if (keyIsDown(65)) { //a
    basePos.x -= vel;
  }
  if (keyIsDown(83)) { //s
    basePos.y += vel;
  }
  if (keyIsDown(68)) { //d
    basePos.x += vel;
  }
  if (keyIsDown(37)) { //left
    angle += (PI/swingSpeed);
  }
  if (keyIsDown(39)) { //right
    angle -= (PI/swingSpeed);
  }
 
}

function display() {
  background(220);
  translate(width/2, height/2)
  rectMode(CENTER);
  rect(basePos.x, basePos.y, 20, 20);
  line(basePos.x, basePos.y, vec.x+basePos.x, vec.y+basePos.y);
}


function within(px, py, x, y, w, h) {
  return ((px <= x+w/2 && px >= x-w/2) && (py <= y+h/2 && py >= y-h/2));
}
function modifyMouse() {
  modMouseX = mouseX - width/2 - basePos.x;
  modMouseY = -(mouseY - height/2 - basePos.y);
}

function mouseClicked() {
  console.log(vec.x);
  console.log(vec.y);
}