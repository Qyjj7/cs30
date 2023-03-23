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
let tilesList = [];

let NorthSouthCorridor;
let EastWestCorridor;


function setup() {

  createCanvas(windowWidth, windowHeight);

  createTileTypes();

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


function createTileTypes() {

  NorthSouthCorridor = {
    color: "blue",
  };
  tilesList.push(NorthSouthCorridor);

  EastWestCorridor = {
    color: "red",
  };
  tilesList.push(EastWestCorridor);
}

function randomTile() {
  return tilesList[random(tilesList.length-1)];
}

function displayGrid(grid) {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {

      if (grid[y][x] !== "blank") {
        fill(grid[y][x].color);
      }
      if (grid[y][x] === "blank") {
        noFill();
      }
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


function exploreCell(x, y) {

  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {

    if (grid[y][x] === "blank"){
      grid[y][x] = randomTile(); 
    }
  }
}


function mousePressed() {

  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  exploreCell(x, y);
}
