// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const DARTSIZE = 20;
const DARTSPEED = 0.03
let targetSize;
let radius;
let score = 0;
let darts = [];


function setup() {

  createCanvas(windowWidth, windowHeight);

  targetSize = height;
  radius = targetSize/2;
  angleMode = degrees;
  textAlign(CENTER);
  spawnDart();
}

function draw() {

  background(220);
  translate(width/2, height/2)
  display();
  moveDart();
}


function display() {

  fill("red");
  circle(0, 0, targetSize);

  fill("white");
  circle(0, 0, targetSize*4/5);

  fill("red");
  circle(0, 0, targetSize*3/5);

  fill("white");
  circle(0, 0, targetSize*2/5);

  fill("red");
  circle(0, 0, targetSize*1/5);

  fill("white");
  circle(0, 0, targetSize*1/15);

  fill("black");
  for (let i = 0; i < darts.length; i++) {
    circle(convert(darts[i].distance*radius, darts[i].angle, "x"), convert(darts[i].distance*radius, darts[i].angle, "y"), DARTSIZE)
  }

  text("Score:" + score, 0, -height/2+15)
}

function convert(distance, angle, toReturn) {

  let x = distance*cos(angle);
  let y = distance*sin(angle);

  if (toReturn === "x") {
    return x;
  }
  if (toReturn === "y") {
    return y;
  }
}

function spawnDart() {

  let dart = {
    angle: random(360),
    distance: 1,
    state: "active",
    direction: -1,
  }
  darts.push(dart); 
}

function moveDart() {

  for (let i = 0; i < darts.length; i++) {

    if (darts[i].state === "active") {
      darts[i].distance += DARTSPEED*darts[i].direction;
    }
    if (darts[i].distance > 1 || darts[i].distance < -1) {
      darts[i].direction = darts[i].direction*(-1);
    }
  }
}

function keyTyped() {

  for (let i = 0; i < darts.length; i++) {
    if (darts[i].state === "active") {
      darts[i].state = "inactive";

      if (abs(darts[i].distance) <= 1) {
        gain = 1;
      }
      if (abs(darts[i].distance) <= 4/5) {
        gain = 5;
      }
      if (abs(darts[i].distance) <= 3/5) {
        gain = 10;
      }
      if (abs(darts[i].distance) <= 2/5) {
        gain = 20;
      }
      if (abs(darts[i].distance) <= 1/15) {
        gain = 50;
      }
    }
  }
  score += gain;
  spawnDart();
}
