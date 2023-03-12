// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let enemies = []
let playerPosition;
let playerWidth = 20;
let playerHeight = 20;
let playerVelocity = 3;


function setup() {

  createCanvas(windowWidth, windowHeight);

  playerPosition = createVector(width/2, height/2)
}

function draw() {

  userInput();
  moveEnemy();
  display();
}

function mousePressed() {

  spawnEnemy(mouseX, mouseY);
}

function display() {

  background(220);

  rectMode(CENTER);
  noFill();
  rect(playerPosition.x, playerPosition.y, playerHeight, playerWidth);


  for (let i=0; i<enemies.length; i++) {
    fill(enemies[i].color);
    circle(enemies[i].position.x, enemies[i].position.y, enemies[i].diameter);
  }
}

function userInput() {
  
  if (keyIsDown(87)) { //w
    playerPosition.y -= playerVelocity;
  }
  if (keyIsDown(65)) { //a
    playerPosition.x -= playerVelocity;
  }
  if (keyIsDown(83)) { //s
    playerPosition.y += playerVelocity;
  }
  if (keyIsDown(68)) { //d
    playerPosition.x += playerVelocity;
  }
}

function spawnEnemy(x, y) {

  let newEnemy = {

    position: createVector(x, y),
    speed: 0.03,
    diameter: 20,
    color: "red",

    hi: function () {
      return 'hi';
    }

  };
  enemies.push(newEnemy);
}

function moveEnemy() {

  for (let i = 0; i < enemies.length; i ++) {

    distance = playerPosition.dist(enemies[i].position)
    enemies[i].position.x = lerp(enemies[i].position.x, playerPosition.x, enemies[i].speed);
    enemies[i].position.y = lerp(enemies[i].position.y, playerPosition.y, enemies[i].speed);
  }
}  