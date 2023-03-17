// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let enemies = [];
let player;
let groundLevel;
let score  = 0;
let health = 5;
let thisJump = 0;
let jumpHeight = 16;
let gravity = 0.5;
let jumping = true;
let gameRunning = true;

function setup() {

  createCanvas(windowWidth, windowHeight);

  setInterval(spawnEnemy,  1200);


  groundLevel = 3*height/4;

  player = {

    position: createVector(width/2, height/2),
    size: 20,
    speed: 6,
  };
}

function draw() {

  if (gameRunning) {
    userInput();
    jump();
    moveEnemy();
    checksAllCollisions();
  }
  checkGameOver();
  display();
  
}

function display() {

  background(220);

  rectMode(CENTER);
  noFill();
  rect(player.position.x, player.position.y, player.size, player.size);

  line(0, groundLevel, width, groundLevel);

  textSize(30);
  fill("black");
  textAlign(LEFT);
  text("Health: " + health, 30, 40);
  text("Score: " + score,  30, 80);

  if (gameRunning === false) {
    
    textSize(30);
    fill("black");
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);

    textSize(15);
    text("Press Enter to Play Again", width/2, height/2 + 20);
  }



  for (let i=0; i<enemies.length; i++) {
    fill(enemies[i].color);
    circle(enemies[i].position.x, enemies[i].position.y, enemies[i].size);
  }
}

function userInput() {
  
  if (keyIsDown(65) && player.position.x >= 0) { //a
    player.position.x -= player.speed;
  }

  if (keyIsDown(68) && player.position.x <= width) { //d
    player.position.x += player.speed;
  }
  if (keyIsDown(32) && ! jumping) { //space
    jumping = true;
    thisJump = jumpHeight;
  }
}

function spawnEnemy() {

  let x = random(0, width);

  let newEnemy = {

    position: createVector(x, 0),
    speed: 5,
    size: 20,
    color: "red",

  };

  if (gameRunning) {
    enemies.push(newEnemy);
  }
}

function moveEnemy() {

  for (let i = 0; i < enemies.length; i ++) {

    let lerpAmount = enemies[i].speed/enemies[i].position.dist(player.position)
    enemies[i].position.lerp(player.position, lerpAmount)
  }
}  

function collision(firstVector, secondVector, firstHitBox, secondHitBox) {

  return firstVector.dist(secondVector) < firstHitBox/2 + secondHitBox/2;
}

function checksAllCollisions() {
  for (let i = 0; i < enemies.length; i ++) {

    if (collision(player.position, enemies[i].position, player.size, enemies[i].size)) {

      if (player.position.y < enemies[i].position.y) {
        jumping = true;
        thisJump = 3*jumpHeight/4;
        score ++;
      }
      else {
        health --;
      }
      enemies.splice(i, 1);
    }
  }
}

function jump() {

  if (! jumping) {
    player.position.y = groundLevel - player.size/2;
  }

  else {
    
    player.position.y -= thisJump;
    thisJump -= gravity;

    if (player.position.y > groundLevel - player.size/2) {
      jumping = false;
    }
  }

}

function checkGameOver() {
  if (health < 1) {
    gameRunning = false;
  }

  if (keyIsDown(13) && ! gameRunning) { //Enter
    health = 5;
    score = 0;
    enemies = [];
    player.position.x = width/2;
    player.position.y = height/2;
    gameRunning = true;
  }
}
