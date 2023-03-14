// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let enemies = [];
let player;
let jumpHeight = 5;
let gravity = 0.5;
let groundLevel;

function setup() {

  createCanvas(windowWidth, windowHeight);
  groundLevel = 3*height/4;

  player = {

    position: createVector(width/2, height/2),
    size: 20,
    width: 20,
    height: 20,
    speed: 3,
    health: 5,
  };
}

function draw() {

  userInput();
  moveEnemy();
  display();
  jump();
}

function mousePressed() {

  spawnEnemy(mouseX, mouseY);
}

function display() {

  background(220);

  rectMode(CENTER);
  noFill();
  rect(player.position.x, player.position.y, player.width, player.height);
  line(0, groundLevel, width, groundLevel);


  for (let i=0; i<enemies.length; i++) {
    fill(enemies[i].color);
    circle(enemies[i].position.x, enemies[i].position.y, enemies[i].size);
  }
}

function userInput() {
  
  if (keyIsDown(87)) { //w
    player.position.y -= player.speed;
  }
  if (keyIsDown(65)) { //a
    player.position.x -= player.speed;
  }
  if (keyIsDown(83)) { //s
    player.position.y += player.speed;
  }
  if (keyIsDown(68)) { //d
    player.position.x += player.speed;
  }
  if (keyIsDown(32)) { //space
    player.position.y -= jumpHeight;
  }
}

function spawnEnemy(x, y) {

  let newEnemy = {

    position: createVector(x, y),
    speed: 0.03,
    size: 20,
    color: "red",

    hi: function () {
      return "hi";
    }

  };
  enemies.push(newEnemy);
}

function moveEnemy() {

  for (let i = 0; i < enemies.length; i ++) {

    enemies[i].position.x = lerp(enemies[i].position.x, player.position.x, enemies[i].speed);
    enemies[i].position.y = lerp(enemies[i].position.y, player.position.y, enemies[i].speed);

    if (collision(player.position, enemies[i].position, player.size, enemies[i].size)) {
      enemies.splice(i, 1);
    }
  }
}  

function collision(firstVector, secondVector, firstHitBox, secondHitBox) {

  return firstVector.dist(secondVector) < firstHitBox/2 + secondHitBox/2;
}

function jump() {
  if (player.position.y < groundLevel) {
    jumpHeight -= gravity;
    player.position.y -= jumpHeight;
  }
  else {
    jumpHeight = 10;
  }
}