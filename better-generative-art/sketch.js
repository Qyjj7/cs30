// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayBox(boxes[0]);
}

function draw() {
  background(220);
  spawnBox(boxes[0]);
}

function displayBox(myBox) {
  push();
  translate(myBox.x, myBox.y);
  rotate(myBox.rotation);
  square(0,0,myBox.size);
  pop();
}

function spawnBox(theX, theY, theSize, howRotated) {
  let someBox = {
    x: theX,
    y: theY,
    size: theSize,
    rotation: howRotated,
  };
  boxes.push(someBox);
}