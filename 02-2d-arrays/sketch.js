// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const ROWS = 15;
const COLS = 15;
const TILETYPES = 4;
let grid;
let cellSize;
let tilesList = [];



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


function createTile(desiredTile) {

  if (desiredTile === 0) {

    let startingTile = {

      identity: 0,
      new: false,
      color: "white",
      north: "closed",
      south: "open",
      east: "closed",
      west: "closed",
    };
    return startingTile;
  }

  if (desiredTile === 1) {

    let deadEnd = {

      identity: 1,
      new: true,
      color: "black",
      north: "closed",
      south: "closed",
      east: "closed",
      west: "closed",
    };
    return deadEnd;
  }
  
  if (desiredTile === 2) {

    let NorthSouthCorridor = {

      identity: 2,
      new: true,
      color: "blue",
      north: "open",
      south: "open",
      east: "closed",
      west: "closed",
    };
    return NorthSouthCorridor;
  }

  if (desiredTile === 3) {

    let EastWestCorridor = {

      identity: 3,
      new: true,
      color: "red",
      north: "closed",
      south: "closed",
      east: "open",
      west: "open",
    };
    return EastWestCorridor;
  }
}


function randomTile(options) {

  let randomIndex = Math.floor(random(options.length));
  let chosenTile = createTile(options[randomIndex]);

  if (options === []) {
    chosenTile = createTile(1);
  }

  return chosenTile;
}


function displayGrid(grid) {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {

      if (grid[y][x] !== "blank") {
        fill(grid[y][x].color);
      }
      else {
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
  newGrid[0][7] = createTile(0);
  return newGrid;
}


function exploreCell(thisY, thisX) {

  let validTiles = [];

  for (let i = 2; i < TILETYPES; i++) {
    let thisTile = createTile(i);

    validTiles.push(i);
    
  }

  console.log(validTiles);
  grid[thisY][thisX] = randomTile(validTiles); 
  
}


function mousePressed() {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {

      if (grid[y][x] !== "blank" && ! grid[y][x].new) {

        if (grid[y][x].north === "open") {
          exploreCell(y-1, x);
          grid[y][x].north = "explored";
        }
        if (grid[y][x].south === "open") {
          exploreCell(y+1, x);
          grid[y][x].south = "explored";
        }
        if (grid[y][x].east === "open") {
          exploreCell(y, x+1);
          grid[y][x].east = "explored";
        }
        if (grid[y][x].west === "open") {
          exploreCell(y, x-1);
          grid[y][x].west = "explored";
        }
      }
      grid[y][x].new = false;
    }
  }
}
