// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRect();
}

function draw() {
  background(220);


  for (let i = xOffset; i < xOffset + width; i++){
    rect(terrain[i].x - xOffset, height - terrain[i].height, 50, terrain[i].height);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    xOffset += 3;
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (xOffset > 3) {
      xOffset -= 3;
    }
    
  }

}

function spawnRect() {
  let time = 0;
  for (let x = 0; x < 20000; x++) {
    let h = noise(time)*height;
    let thisRect = {
      x: x,
      height: h,
    };
    terrain.push(thisRect);
    time += 0.004;
  }
  
 
}