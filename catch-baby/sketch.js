// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let bkg;
let bb;
let crying;
let plop;
let grab;
let vel = 5;
let bbvel = 3;
let bkgPosX = 0;
let bkgPosY = 0;
let bbPosX = 0;
let bbPosY = 0;
let bkgWidth = 1500;
let bkgHeight = 1500;
let bbWidth  = 50;
let bbHeight = 50;
let distanceX = 0;
let distanceY = 0;
let counter = 0;
let turnTime = 180;
let direction = -2;
let wall = false;
let caught = false;

function preload() {
  
  // sets up image and sound assets
  soundFormats('mp3');
  bkg = loadImage('bathroom.jpg');
  bb = loadImage('beb.png');
  crying = loadSound('Crying.mp3');
  plop = loadSound('Drop.mp3');
  grab = loadSound('Pick_up.mp3');
}

function setup() {
  createCanvas(500, 500);
}

function draw() {
  display();
  moving();
  babyMove();
}

function display() { 
  
  //moves origin to centre
  translate(width/2, height/2);
  
  //draws images of background and baby
  image(bkg, bkgPosX, bkgPosY, bkgWidth, bkgHeight);
  imageMode(CENTER);
  image(bb, bbPosX, bbPosY, bbWidth, bbHeight);
  imageMode(CENTER);
}

function moving() {
  
  //detects wasd input and moves background to change field of view
  //only if background image is within boundary
  if (keyIsDown(87) && (-vel >= bkgPosY-bkgHeight/2+height/2)) { //w
    bkgPosY += vel;
  }
  if (keyIsDown(65) && (-vel >= bkgPosX-bkgWidth/2+width/2)) { //a
    bkgPosX += vel;
  }
  if (keyIsDown(83) && (vel <= bkgPosY+bkgHeight/2-height/2)) { //s
    bkgPosY -= vel;
  }
  if (keyIsDown(68) && (vel <= bkgPosX+bkgWidth/2-width/2)) { //d
    bkgPosX -= vel;
  }
}

function babyMove() {
  
  //baby position must be tied to background position
  //prevents baby from being affected by wasd
  bbPosX = bkgPosX + distanceX;
  bbPosY = bkgPosY + distanceY;
  
  //moves baby while caught
  if (caught) {
    bbPosX = mouseX-width/2;
    bbPosY = mouseY-height/2;
  }
  
  //randomly change direction after certain amount of function calls 
  if (counter === turnTime && wall === false) {
    
    //rerolls random so that direction cannot equal 0
    //makes a direction's opposite counterpart negative
    while (true) {
      direction = Math.round(random(4)) - 2;
      counter = 0;
      if (direction !== 0) {
        crying.play();
        break;
      }
    }
  }
  wall = false;
  
  //moves baby in designated direction
  //false if distance is beyond baackground border
  if (direction === -2 && distanceY > -bkgHeight/2 + bbHeight) {  //North
    distanceY -= bbvel;
  }
  else if (direction === -1 && distanceX > -bkgWidth/2 + bbWidth) { //East
    distanceX -= bbvel;
  }
  else if (direction === 2 && distanceY < bkgHeight/2 - bbHeight) { //South
    distanceY += bbvel;
  }
  else if (direction === 1 && distanceX < bkgHeight/2 - bbWidth) { //West
    distanceX += bbvel;
  }
  
  //baby bounces off wall
  else {
    wall = true;
    direction = -direction;
  }

  counter += 1;
}

function mousePressed() {
  
  //checks if mouse is on baby when clicked
  //used 2 if statements because && would take up too much space on one line
  if (bbPosX+bbWidth/2+width/2 > mouseX && mouseX > bbPosX-bbWidth/2+width/2) {
    if (bbPosY+bbHeight/2+height/2 > mouseY && mouseY > bbPosY-bbHeight/2+height/2) {
      caught = true;
      grab.play();
    }
  }
}
  
function mouseReleased() {
  
  //baby no longer follows mouse and puts baby on track to move normally
  if (caught) {
    distanceX = mouseX-width/2-bkgPosX;
    distanceY = mouseY-height/2-bkgPosY;
    caught = false;
    plop.play();
  }
}
