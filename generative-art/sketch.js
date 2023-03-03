// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  lotsOfLines(50,50);
}

function draw() {
  
}

function lotsOfLines(cols, rows) {
  for (let x = 0; x < cols; x ++) {
    for (let y = 0; y < rows; y++) {
      let spaceAmount = width/cols;
      diagonalLine(x*spaceAmount, y*spaceAmount, spaceAmount);
    }
  }
}

function diagonalLine(x,y,spacing){
  if (random(100) > 50) {
    line(x - spacing/2, y + spacing/2, x + spacing/2, y - spacing/2);

  }
  else {
    line(x + spacing/2, y - spacing/2, x + spacing/2, y + spacing/2);
  }
}