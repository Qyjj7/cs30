// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const ROWS = 15;
const COLS = 15;
let grid;
let cellSize;


function setup() {

  createCanvas(windowWidth, windowHeight);

  grid = create2dArray(ROWS, COLS);

  if (width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }

}


function draw() {

  background(220);
  displayGrid(grid);
}


function displayGrid(grid) {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {

      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}


function create2dArray(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x ++) {
      newGrid[y].push("blank");
    }
  }
  return newGrid;
}