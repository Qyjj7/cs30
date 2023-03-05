// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let campfireX = 50;
let campfireY = -50;
let playerX;
let playerY;
let rectPosX;
let rectPosY;
let modMouseX;
let modMouseY;
let facing;
let reach = 40;
let vel = 2;
let campfireState = 'red';
let campfireW = 20;
let campfireH = 20;

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(220);
  
  playerX = width/2;
  playerY = height/2;
  facing = createVector(winMouseX - playerX, winMouseY - playerY)
}

function draw() {

  scene();
  player();
  interact();
}

function scene() {

  background(220);
  translate(playerX, playerY)
  rectMode(CENTER);
  fill(campfireState);
  rect(campfireX, campfireY , campfireW, campfireH);
}

function player() {

  rectPosX = -playerX + width/2;
  rectPosY = -playerY + height/2;
  facing.x = winMouseX - playerX;
  facing.y = winMouseY - playerY;
  facing.normalize();
  facing.mult(reach);
  facing.setHeading(3.14);

  rectMode(CENTER);
  fill('red');
  rect(rectPosX, rectPosY, 15, 15);
  line(rectPosX, rectPosY, facing.x+rectPosX, facing.y+rectPosY);
  
  if (keyIsDown(87)) { //w
    playerY += vel;
  }
  if (keyIsDown(65)) { //a
    playerX += vel;
  }
  if (keyIsDown(83)) { //s
    playerY -= vel;
  }
  if (keyIsDown(68)) { //d
    playerX -= vel;
  }

}

function interact() {
  if (mouseIsPressed) {
    if (within(campfireX, campfireY , campfireW, campfireH)) {
      campfireState = 'white';
      
    }
  }
}

function within(x, y, w, h) {
  if ((facing.x <= x+w/2 && facing.x >= x-w/2) && (facing.x <= y+h/2 && facing.y >= y-h/2)){
    return true;
  }
}