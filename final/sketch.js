// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let vec;
let playerPos;
let path;
let reach = 50;
let vel = 3;
let angle = 0;
let swingSpeed = 40;
let groundLevel;
let enemies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  vec = createVector(0,1);

  playerPos = createVector(0,0);

  groundLevel = height/4;
}

function draw() {
  userInput();
  moveEnemy();
  display();
}

function userInput() {
  
  vec.normalize();
  vec.mult(reach);
  vec.setHeading(-angle);

  if (keyIsDown(87)) { //w
    playerPos.y -= vel;
  }
  if (keyIsDown(65)) { //a
    playerPos.x -= vel;
  }
  if (keyIsDown(83)) { //s
    playerPos.y += vel;
  }
  if (keyIsDown(68)) { //d
    playerPos.x += vel;
  }
  if (keyIsDown(37) && angle <= 4*PI/3) { //left
    angle += PI/swingSpeed;
  }
  if (keyIsDown(39) && angle >= -PI/3) { //right
    angle -= PI/swingSpeed;
  }

}

function mousePressed() {
  spawnEnemy(mouseX-width/2, mouseY-height/2);

}

function display() {
  background(220);
  translate(width/2, height/2);

  rectMode(CENTER);
  noFill();
  rect(playerPos.x, playerPos.y, 20, 20);

  line(playerPos.x, playerPos.y, vec.x+playerPos.x, vec.y+playerPos.y);

  line(-width, groundLevel, width, groundLevel);

  circle(playerPos.x, playerPos.y, 600);


  for (let i=0; i<enemies.length; i++) {
    fill("red");
    circle(enemies[i].x, enemies[i].y, enemies[i].diameter);
  }
}

function spawnEnemy(tempX, tempY) {
  let newEnemy = {
    x: tempX,
    y: tempY,
    pos: createVector(tempX, tempX),
    speed: 3,
    diameter: 20,
  };
  enemies.push(newEnemy);
}

function moveEnemy() {

  for (let i = 0; i<enemies.length; i++) {
    let slope = getSlope(playerPos.x, playerPos.y, enemies[i].x, enemies[i].y);

    if (enemies[i].x >= playerPos.x && slope >= 1) {
      enemies[i].x -= enemies[i].speed/slope;
    }
    else if (enemies[i].x > playerPos.x && slope < 1 &&  slope > -1) {
      enemies[i].x -= enemies[i].speed;
    }
    else if (enemies[i].x >= playerPos.x && slope <= -1) {
      enemies[i].x += enemies[i].speed/slope;
    }
    else if (enemies[i].x < playerPos.x && slope > 1) {
      enemies[i].x += enemies[i].speed/slope;
    }
    else if (enemies[i].x < playerPos.x && slope < 1 &&  slope > -1) {
      enemies[i].x += enemies[i].speed;
    }
    else if (enemies[i].x < playerPos.x && slope < -1) {
      enemies[i].x -= enemies[i].speed/slope;
    }

    //enemies -= enemies[i].speed;

    enemies[i].y = getY(playerPos.x, enemies[i].x, slope);

    console.log(slope);

  }
}

function getSlope(xInitial, yInitial, xFinal, yFinal) {
  return (-yFinal-yInitial)/(xFinal-xInitial);
}
function getY(xInitial, xFinal, mySlope) {
  return -mySlope*(xFinal-xInitial);
}