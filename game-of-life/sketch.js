// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const ROWS = 10;
const COLS = 10;
let grid;
let cellSize;
let autoUpdate = false;

function setup() {

  createCanvas(windowWidth, windowHeight);

  grid = createRandom2dArray(ROWS, COLS);

  setInterval(auto, 600);

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

function auto() {

  if (autoUpdate) {
    grid = updateGrid();
  }
}

function keyTyped() {

  if (key === "r") {
    grid = createRandom2dArray(ROWS, COLS);
  }
  else if (key === "e") {
    grid = createEmpty2dArray(ROWS, COLS);
  }
  else if (key === " ") {
    grid = updateGrid();
  }
  else if (key === "a") {
    autoUpdate = !autoUpdate;
  }
}

function displayGrid(grid) {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {
      if (grid[y][x] === 0){
        fill("orange");
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {

  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {

    if (grid[y][x] === 0){
      grid[y][x] = 1; 
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0; 
    }
  }
}

function updateGrid() {

  let nextTurn = createEmpty2dArray(ROWS, COLS);

  for (let y = 0; y < ROWS; y ++) {
    for (let x = 0; x < COLS; x ++) {

      let neighbors = 0;

      for (let i = -1; i <= 1; i ++) {
        for (let j = -1; j <= 1; j ++) {

          if (y+i >= 0 && y+i < ROWS && x+j >= 0 && x+j < COLS) {
            neighbors += grid[y+i][x+j];
          }
        }
      }

      neighbors -= grid[y][x];

      if (grid[y][x] === 1) {
        if (neighbors === 2 || neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) {
        if (neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }

  return nextTurn;
}

function createEmpty2dArray(ROWS, COLS) {

  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x ++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function createRandom2dArray(ROWS, COLS) {

  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x ++) {
      if (random(100) > 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }

    }
  }
  return newGrid;
}