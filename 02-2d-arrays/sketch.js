// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const ROWS = 21;
const COLS = 21;
const TILETYPES = 8;

let grid;
let cellSize;


function preload() {

  cornerImage = loadImage("corner.png");
  corridorImage = loadImage("corridor.png");
  fourwayImage = loadImage("fourway.png");
  startImage = loadImage("start.png");
  blankImage = loadImage("blank.png");
  deadendImage = loadImage("deadend.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  grid = create2dArray(ROWS, COLS);

  if (width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }
  generate();
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
      sprite: blankImage,
      spriteRotation: 0,
      north: "blank",
      south: "blank",
      east: "blank",
      west: "blank",
    };
    return blank;
  }

  if (desiredTile === "starting tile") {

    let startingTile = {

      identity: "starting tile",
      new: false,
      sprite: startImage,
      spriteRotation: 0,
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
      sprite: deadendImage,
      spriteRotation: 0,
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
      sprite: corridorImage,
      spriteRotation: 0,
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
      sprite: corridorImage,
      spriteRotation: PI/2,
      north: "closed",
      south: "closed",
      east: "open",
      west: "open",
    };
    return EastWestCorridor;
  }

  if (desiredTile === 3) {

    let NorthEastCorner = {

      identity: 3,
      new: true,
      sprite: cornerImage,
      spriteRotation: 0,
      north: "open",
      south: "closed",
      east: "open",
      west: "closed",
    };
    return NorthEastCorner;
  }

  if (desiredTile === 4) {

    let SouthEastCorner = {

      identity: 4,
      new: true,
      sprite: cornerImage,
      spriteRotation: PI/2,
      north: "closed",
      south: "open",
      east: "open",
      west: "closed",
    };
    return SouthEastCorner;
  }
    
    if (desiredTile === 5) {

      let SouthWestCorner = {
  
        identity: 5,
        new: true,
        sprite: cornerImage,
        spriteRotation: PI,
        north: "closed",
        south: "open",
        east: "closed",
        west: "open",
      };
      return SouthWestCorner;
    }

  if (desiredTile === 6) {

    let NorthWestCorner = {

      identity: 6,
      new: true,
      sprite: cornerImage,
      spriteRotation: 3*PI/2,
      north: "open",
      south: "closed",
      east: "closed",
      west: "open",
    };
    return NorthWestCorner;
  }

  if (desiredTile === 7) {

    let FourWay = {

      identity: 7,
      new: true,
      sprite: fourwayImage,
      spriteRotation: 0,
      north: "open",
      south: "open",
      east: "open",
      west: "open",
    };
    return FourWay;
  }
}


function displayGrid(grid) {

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x ++) {

      push();
      imageMode(CENTER);
      translate(x*cellSize, y*cellSize);
      rotate(grid[y][x].spriteRotation);
      translate(-x*cellSize, -y*cellSize);
      image(grid[y][x].sprite, x*cellSize, y*cellSize, cellSize, cellSize);
      pop();
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

  newGrid[1][10] = createTile("starting tile");
  newGrid[2][10] = createTile(7);
  return newGrid;
}


function exploreCell(y, x) {

  let validTiles = [];
  
  if (grid[y][x].identity === "blank") {

    for (let i = 1; i < TILETYPES; i++) {
      let checklist = 0;
      let tile = createTile(i);
      
      if (tile.north === grid[y-1][x].south || grid[y-1][x].identity === "blank") {
        checklist ++;
      }
      if (tile.south === grid[y+1][x].north || grid[y+1][x].identity === "blank") {
        checklist ++;
      }
      if (tile.east === grid[y][x+1].west || grid[y][x+1].identity === "blank") {
        checklist ++;
      }
      if (tile.west === grid[y][x-1].east || grid[y][x-1].identity === "blank") {
        checklist ++;
      }
      if (checklist === 4) {
        validTiles.push(i);
      }
    }

    if (validTiles.length === 0) {
      validTiles.push(0);
    }
    grid[y][x] = randomTile(validTiles);
  }
}


function randomTile(validTiles) {

  let randomIndex = Math.floor(random(validTiles.length));
  let chosenTile = createTile(validTiles[randomIndex]);

  return chosenTile;
}


function generate() {

  for (let i = 0; i < ROWS*COLS; i++) {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {

        if (grid[y][x].identity !== "blank" && ! grid[y][x].new) {

          if (grid[y][x].north === "open") {
            exploreCell(y-1, x);
          }
          if (grid[y][x].south === "open") {
            exploreCell(y+1, x);
          }
          if (grid[y][x].east === "open") {
            exploreCell(y, x+1);
          }
          if (grid[y][x].west === "open") {
            exploreCell(y, x-1);
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
}
