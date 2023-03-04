// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let campfireX = 0;
let campfireY = -50;
let playerX;
let playerY;
let facing;
let vel = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  playerX = width/2;
  playerY = height/2;
  facing = createVector(0,0)
}

function draw() {
  scene();
  player();
}

function scene(){
  background(220);
  translate(playerX, playerY)
  rectMode(CENTER);
  rect(campfireX, campfireY , 20, 20);
}

function player(){
  rectMode(CENTER)
  rect(-playerX + width/2, -playerY + height/2, 15, 15);
  
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
  
  line(-playerX + width/2, -playerY + height/2, mouseX-width/2, mouseY-height/2);

}