// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = color(random(255), random(255), random(255));
    this.speed = 15;
    this.size = 5; 
  }

  display() {
    fill(this.colour);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y --;
    }
    else if (choice < 50) {
      this.y ++;
    }
    else if (choice < 75) {
      this.x --;
    }
    else {
      this.x ++;
    }
  }
}

let walkerArray = [];

function setup() {

  createCanvas(windowWidth, windowHeight);
}


function draw() {

  for (let i = 0; i < walkerArray.length; i ++) {
    walkerArray[i].move();
    walkerArray[i].display();
  }
}

function mousePressed() {
  let someWalker = new Walker(mouseX, mouseY);
  walkerArray.push(someWalker);
}