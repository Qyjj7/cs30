// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const ROWS = 7;
const COLS = 7;
const TILETYPES = 8;
const PLAYERSIZE = 20;
const PLAYERCOLOR = "red";

let cornerImage;
let corridorImage;
let fourwayImage;
let startImage;
let blankImage;
let deadendImage;
let exitImage;

let grid;
let cellSize;
let startY = 1;
let startX = (COLS-1)/2;
let playerY = 1;
let playerX = (COLS-1)/2;
let zombieX;
let zombieY;
let path = [];


function preload() {

  cornerImage = loadImage("assets/corner.png");
  corridorImage = loadImage("assets/corridor.png");
  fourwayImage = loadImage("assets/fourway.png");
  startImage = loadImage("assets/start.png");
  blankImage = loadImage("assets/blank.png");
  deadendImage = loadImage("assets/deadend.png");
  exitImage = loadImage("assets/exit.png");
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
  
  setInterval(moveZombie, 400);
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
      sprite: deadendImage,
      spriteRotation: 0,
      north: "blank",
      south: "blank",
      east: "blank",
      west: "blank",
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
    };
    return startingTile;
  }

  if (desiredTile === "exit") {

    let exit = {

      identity: "exit",
      new: true,
      sprite: exitImage,
      spriteRotation: 0,
      north: "open",
      south: "open",
      east: "open",
      west: "open",
      parentY: "none",
      parentX: "none",
    };
    return exit;
  }

  if (desiredTile === "dead end") {

    let deadEnd = {

      identity: "dead end",
      new: true,
      sprite: deadendImage,
      spriteRotation: 0,
      north: "closed",
      south: "closed",
      east: "closed",
      west: "closed",
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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
      parentY: "none",
      parentX: "none",
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

      if (x === playerX && y === playerY) {
        fill(PLAYERCOLOR);
        circle(x*cellSize, y*cellSize, PLAYERSIZE);
      }
      if (x === zombieX && y === zombieY) {
        fill("green");
        circle(x*cellSize, y*cellSize, PLAYERSIZE);
      }
    }
  }
  //for (let i = 0; i < path.length; i++) {
  //circle(path[i][1]*cellSize, path[i][0]*cellSize, PLAYERSIZE/2);
  //}
}


function keyTyped() {

  if (key === "w") {
    if (grid[playerY][playerX].north === "open" && grid[playerY-1][playerX].identity !== "dead end") {
      playerY --;
    }
  }

  if (key === "a") {
    if (grid[playerY][playerX].west === "open" && grid[playerY][playerX-1].identity !== "dead end") {
      playerX --;
    }
  }

  if (key === "s") {
    if (grid[playerY][playerX].south === "open" && grid[playerY+1][playerX].identity !== "dead end") {
      playerY ++;
    }
  }

  if (key === "d") {
    if (grid[playerY][playerX].east === "open" && grid[playerY][playerX+1].identity !== "dead end") {
      playerX ++;
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
        newGrid[y][x] = createTile("dead end");
      }
    }
  }
  newGrid[startY][startX] = createTile("starting tile");
  newGrid[startY][startX].parentY = startY-1;
  newGrid[startY][startX].parentX = startX;
  
  newGrid[startY+1][startX] = createTile(7);
  newGrid[startY+1][startX].parentY = startY;
  newGrid[startY+1][startX].parentX = startX;
  return newGrid;
}


function exploreCell(y, x, parentY, parentX) {

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
      validTiles.push("dead end");
    }
    grid[y][x] = randomTile(validTiles);
    grid[y][x].parentY = parentY;
    grid[y][x].parentX = parentX;
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
            exploreCell(y-1, x, y, x);
          }
          if (grid[y][x].south === "open") {
            exploreCell(y+1, x, y, x);
          }
          if (grid[y][x].east === "open") {
            exploreCell(y, x+1, y, x);
          }
          if (grid[y][x].west === "open") {
            exploreCell(y, x-1, y, x);
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
  makeExitPoint();
}

function makeExitPoint() {

  let exitY = 0;
  let exitX = 0;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      if (y !== 0 && y !== ROWS-1 && x !== 0 && x !== COLS-1) {
        if (grid[y][x].identity === "dead end" && y > exitY) {
          exitY = y;
          exitX = x;
        }
      }
    }
  }

  grid[exitY][exitX] = createTile("exit");

  zombieY = exitY;
  zombieX = exitX;
}


function moveZombie() {

  zombieY = path[0][0];
  zombieX = path[0][1];
  path.shift();
}


function updatePathfinder() {
  
  let explored = [[zombieY, zombieX, fCost(zombieY, zombieX)]];
  let reachable = [getReachables(zombieY, zombieX)];
  let counter = 0;

  while (counter < 4) {
    counter++;

    let lowestFCost = getLowestFCost(reachable);
    let current = lowestFCost;

  }
}


function fCost(y, x) {

  let gCost = abs(y - zombieY) + abs(x - zombieX);
  let hCost = abs(y - playerY) + abs(x - playerY);

  return hCost+gCost;
}


function getLowestFCost(array) {

  if (array === []) {
    return "none";
  }

  let lowest = array[0];

  for (let i = 0; i < array.length; i++) {
    if (array[i] < lowest) {
      lowest = array[i];
    }
  }
  return lowest;
}


function getReachables(y, x) {

  let reachables = [];
    
  
  
}
