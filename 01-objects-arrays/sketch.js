// Objects and Arrays
// Riley Morrissey
// March 20, 2023
//
// Description:
// A and D for left and right, SPACE to jump
// Jump on top of enemies to destroy them
//
// Extra for Experts:
// 


let enemies = [];
let player;
let groundLevel;
let score = 0;
let highScore = 0;
let health = 5;
let thisJump = 0;
let jumping = true;
let gameRunning = true;

const JUMPHEIGHT = 14;
const GRAVITY = 0.5;


function setup() {

  createCanvas(windowWidth, windowHeight);

  setInterval(spawnEnemy,  1200);

  //gets the highscore saved in browser
  highScore = getItem("high score");

  groundLevel = 3*height/4;

  //creates player object
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
  //functions that must always run
  checkGameOver();
  display();
  
}


function display() {

  background(220);

  //draw player
  rectMode(CENTER);
  noFill();
  rect(player.position.x, player.position.y, player.size, player.size);

  //draw ground
  line(0, groundLevel, width, groundLevel);

  //draw health, score
  textSize(30);
  fill("black");
  textAlign(LEFT);
  text("Health: " + health, 30, 40);
  text("Score: " + score,  30, 80);
  text("High Score: " + highScore,  30, 120);
  
  //draw game over text
  if (gameRunning === false) {
    textSize(30);
    fill("black");
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);

    textSize(15);
    text("Press Enter to Play Again", width/2, height/2 + 20);
  }

  //draw enemies
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
    thisJump = JUMPHEIGHT;
  }
}


function spawnEnemy() {

  //creates enemy object and pushes to list
  let newEnemy = {
    position: createVector(random(0, width), 0),
    speed: 6,
    size: 20,
    color: "red",
  };

  if (gameRunning) {
    enemies.push(newEnemy);
  }
}


function moveEnemy() {

  //lerpAmount is the fraction of distance to travel by
  //ensures that enemy always travels by its constant speed
  for (let i = 0; i < enemies.length; i ++) {

    let lerpAmount = enemies[i].speed/enemies[i].position.dist(player.position);
    enemies[i].position.lerp(player.position, lerpAmount);
  }
}  


function checksAllCollisions() {

  for (let i = 0; i < enemies.length; i ++) {

    //hitboxes are circles for simplicity, even player
    if (player.position.dist(enemies[i].position) < player.size/2 + enemies[i].size/2) {

      //reset the jump to stay airborne
      if (player.position.y < enemies[i].position.y) {
        jumping = true;
        thisJump = 3*JUMPHEIGHT/4;
        score ++;
      }

      else {
        health --;
      }

      //deletes enemy
      enemies.splice(i, 1);
    }
  }
}


function jump() {

  if (! jumping) {
    //ensures player does not fall through ground
    player.position.y = groundLevel - player.size/2;
  }

  else {
    //fall faster and faster each frame
    player.position.y -= thisJump;
    thisJump -= GRAVITY;

    if (player.position.y > groundLevel - player.size/2) {
      jumping = false;
    }
  }

}


function checkGameOver() {
  
  if (health <= 0 && score > highScore) {
    gameRunning = false;
    highScore = score;
    //stores the new high score in browser storage
    clearStorage();
    storeItem("high score", highScore);
  }

  else if (health <= 0) {
    gameRunning = false;
  }

  if (keyIsDown(13) && ! gameRunning) { //Enter
    //resets game
    health = 5;
    score = 0;
    enemies = [];
    player.position.x = width/2;
    player.position.y = height/2;
    gameRunning = true;
    highScore = getItem("high score");
  }
}
