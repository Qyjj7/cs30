// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let enemies = [];
let player;
let groundLevel;
let thisJump = 0;
let jumpHeight = 16;
let gravity = 0.5;
let jumping = true;

function setup() {

  createCanvas(windowWidth, windowHeight);

  groundLevel = 3*height/4;

  player = {

    position: createVector(width/2, height/2),
    size: 20,
    speed: 6,
    health: 5,
  };
}

function draw() {

  userInput();
  jump();
  moveEnemy();
  checksAllCollisions();
  display();
}

function mousePressed() {

  spawnEnemy(mouseX, mouseY);
}

function display() {

  background(220);

  rectMode(CENTER);
  noFill();
  rect(player.position.x, player.position.y, player.size, player.size);

  line(0, groundLevel, width, groundLevel);

  textSize(30);
  fill("black");
  text("Health: " + player.health, 30, 40);


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

function spawnEnemy(x, y) {

  let newEnemy = {

    position: createVector(x, y),
    speed: 0.03,
    size: 20,
    color: "red",

  };
  enemies.push(newEnemy);
}

function moveEnemy() {

  for (let i = 0; i < enemies.length; i ++) {

    enemies[i].position.x = lerp(enemies[i].position.x, player.position.x, enemies[i].speed);
    enemies[i].position.y = lerp(enemies[i].position.y, player.position.y, enemies[i].speed);

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
      }
      else {
        player.health -= 1;
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
