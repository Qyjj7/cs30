// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const ROWS = 15;
const COLS = 15;
const TILETYPES = 3;

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


function createTile(desiredTile) {

  if (desiredTile === "blank") {

    let blank = {

      identity: "blank",
      new: false,
      color: 220,
      north: "none",
      south: "none",
      east: "none",
      west: "none",
    };
    return blank;
  }

  if (desiredTile === "starting tile") {

    let startingTile = {

      identity: "starting tile",
      new: false,
      color: "white",
      north: "closed",
      south: "open",
      east: "closed",
      west: "closed",
    };
    return startingTile;
  }

  if (desiredTile === 0) {

    let deadEnd = {

      identity: 0,
      new: true,
      color: "black",
      north: "closed",
      south: "closed",
      east: "closed",
      west: "closed",
    };
    return deadEnd;
  }
  
  if (desiredTile === 1) {

    let NorthSouthCorridor = {

      identity: 1,
      new: true,
      color: "blue",
      north: "open",
      south: "open",
      east: "closed",
      west: "closed",
    };
    return NorthSouthCorridor;
  }

  if (desiredTile === 2) {

    let EastWestCorridor = {

      identity: 2,
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


function displayGrid(grid) {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {

      if (grid[y][x].identity !== "blank") {
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
      newGrid[y].push(createTile("blank"));
    }
  }
  
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (y === 0 || y === ROWS-1 || x === 0 || x === COLS-1) {
        newGrid[y][x] = createTile(0);
      }
    }
  }

  newGrid[1][7] = createTile("starting tile");
  return newGrid;
}


function exploreCell(y, x) {

  let validTiles = [];
  
  if (grid[y][x].identity === "blank") {

    for (let i = 0; i < TILETYPES; i++) {
      let checklist = 0;
      let tile = createTile(i);
      
      if (tile.north === grid[y-1][x].south) {
        checklist ++;
      }
      if (tile.south === grid[y+1][x].north) {
        checklist ++;
      }
      if (tile.east === grid[y][x+1].west) {
        checklist ++;
      }
      if (tile.west === grid[y][x-1].east) {
        checklist ++;
      }
      if (checklist === 4) {
        validTiles.push(i);
      }
    }
    grid[y][x] = randomTile(validTiles);
  }

/*   let rules = [];
  let validTiles = [];

  if (grid[y-1][x].south !== "closed") {
    rules.push(grid[y-1][x].south)
  }
  if (grid[y+1][x].north !== "closed") {
    rules.push(grid[y+1][x].north)
  }
  if (grid[y][x+1].west !== "closed") {
    rules.push(grid[y][x+1].west)
  }
  if (grid[y][x-1].east !== "closed") {
    rules.push(grid[y][x-1].east)
  }

  for (let i = 2; i < TILETYPES; i++) {
    let tile = createTile(i);
    let directionTile = [tile.north, tile.south, tile.east, tile.west];
    for (let j = 0; j < rules.length; j++){
      for (let k = 0; k < directionTile.length; k++) {
        if (rules[j] === directionTile[k]) {
          console.log(rules[j]);
          console.log(directionTile[k]);
          validTiles.push(i);
        }
      }  
    }
  }

  console.log(validTiles);
  grid[y][x] = randomTile(validTiles); 
   */
}


function randomTile(options) {

  let randomIndex = Math.floor(random(options.length));
  let chosenTile = createTile(options[randomIndex]);

  if (options === []) {
    chosenTile = createTile(1);
  }

  return chosenTile;
}


function mousePressed() {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      console.log(grid[y][x]);
      if (grid[y][x].identity !== "blank" && ! grid[y][x].new) {

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
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      grid[y][x].new = false;
    }
  }
}
