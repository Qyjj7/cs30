// 2D Arrays Project
// Riley Morrissey
// April 17 2023
//
// Extra for Experts:
// Used untaught p5 functions involving the DOM
// Invented a clever way to create a procedurally generated game environment
// Inspired by the Wave Function Collapse algorithm, but is unique and entirely my design
// look for the functions generate() and exploreTile() on lines 449 and 410


const TILETYPES = 8;
const PLAYERCOLOR = "red";

let cornerImage;
let corridorImage;
let fourwayImage;
let startImage;
let blankImage;
let deadendImage;
let exitImage;

let rows = 17;
let cols = 17;
let tempRows = rows;
let tempCols = cols;
let playerSize;
let grid;
let cellSize;
let exitY;
let exitX;
let startY = 1;
let startX = (cols-1)/2;
let playerY = 1;
let playerX = (cols-1)/2;


function preload() {

  // each object on grid uses one of these images
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

  grid = create2dArray(rows, cols);

  if (width < height) {
    cellSize = width/cols;
  }
  else {
    cellSize = height/rows;
  }
  playerSize = cellSize/3;

  generate();

  // creates DOM dropdown to select maze size
  let mazeSize = createSelect();
  mazeSize.position(0, 25);
  mazeSize.option("default", 17);
  mazeSize.option("tiny", 7);
  mazeSize.option("small", 11);
  mazeSize.option("large", 21);
  mazeSize.option("huge", 31);
  mazeSize.changed(function () {
    tempCols = mazeSize.value(); tempRows = mazeSize.value() });

  // creates DOM button to generate a new maze
  let resetButton = createButton("Reset");
  resetButton.position(0, 0);
  resetButton.mousePressed(function () { playerY = exitY; playerX = exitX });
}


function draw() {

  background(220);
  display(grid);
  checkReset();
}


function createTile(desiredTile) {

  // each tile in the grid (element of 2D array) can be one of these objects
  // if a tile's NSEW attribute is "open", it must be adjacent to a tile with a matching "open" attribute
  // identity attribute is useful for determining which tile type belongs to a specific position on grid
  // new attribute is used for determining how a tile behaves during maze generation
  // sprite and spriteRotation affect how tile is displayed on screen

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


function display(grid) {

  // runs through 2D array and displays a tile's appropriate image
  translate(cellSize/2, cellSize/2);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x ++) {
      // moves origin to current grid position to rotate sprite without changing its position
      push();
      imageMode(CENTER);
      translate(x*cellSize, y*cellSize);
      rotate(grid[y][x].spriteRotation);
      translate(-x*cellSize, -y*cellSize);
      image(grid[y][x].sprite, x*cellSize, y*cellSize, cellSize, cellSize);
      pop();
    }
  }

  fill(PLAYERCOLOR);
  circle(playerX*cellSize, playerY*cellSize, playerSize);
}


function checkReset() {
  
  // creates a new maze if player reaches the exit
  if (playerY === exitY && playerX === exitX) {
    console.log("reset");

    rows = tempRows;
    cols = tempCols;
    startY = 1;
    startX = (cols-1)/2;
    playerY = 1;
    playerX = (cols-1)/2;

    if (width < height) {
      cellSize = width/cols;
    }
    else {
      cellSize = height/rows;
    }
    playerSize = cellSize/3;

    grid = create2dArray(rows, cols);
    generate();
  }
}


function keyTyped() {

  // moves player in direction of key pressed if the tile player stands on is open in that direction
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


function mouseMoved() {

  // alternate option for movement
  // moves player to adjacent tile that mouse is touching if the tile player stands on is open in that direction
  let x = floor(mouseX/cellSize);
  let y = floor(mouseY/cellSize);

  if (y === playerY-1 && x === playerX) { //North
    if (grid[y+1][x].north === "open" && grid[y][x].identity !== "dead end") {
      playerY = playerY-1;
    }
  }
  if (y === playerY+1 && x === playerX) { //South
    if (grid[y-1][x].south === "open" && grid[y][x].identity !== "dead end") {
      playerY = playerY+1;
    }
  }
  if (x === playerX+1 && y === playerY) { //East
    if (grid[y][x-1].east === "open" && grid[y][x].identity !== "dead end") {
      playerX = playerX+1;
    }
  }
  if (x === playerX-1 && y === playerY) { //West
    if (grid[y][x+1].west === "open" && grid[y][x].identity !== "dead end") {
      playerX = playerX-1;
    }
  }
}


function create2dArray(rows, cols) {

  // makes a 2D array of blank tiles
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x ++) {
      newGrid[y].push(createTile("blank"));
    }
  }
  
  // fills the edges of the array with dead ends so that edge cases are not a recurring problem
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (y === 0 || y === rows-1 || x === 0 || x === cols-1) {
        newGrid[y][x] = createTile("dead end");
      }
    }
  }

  // creates the two starting tiles that are the same on any maze generated
  newGrid[startY][startX] = createTile("starting tile");
  newGrid[startY+1][startX] = createTile(7);
  return newGrid;
}


function exploreCell(y, x) {

  let validTiles = [];
  
  // only unexplored "blank" tiles can be replaced
  if (grid[y][x].identity === "blank") {

    for (let i = 1; i < TILETYPES; i++) {
      let checklist = 0;
      let tile = createTile(i);
      
      // tiles are valid if they have an opening to match every opening around them
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
 
    let randomIndex = Math.floor(random(validTiles.length));
    grid[y][x] = createTile(validTiles[randomIndex]);
  }
}


function generate() {

  // repeating rows*cols times is arbitrary but will be more than enough to finish generating maze
  for (let i = 0; i < rows*cols; i++) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {

        // unexplored "blank" tiles that are touching "open" sides of explored tiles will be replaced
        // new tiles cannot sprout from new tiles, or the generation would not grow evenly
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

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid[y][x].new = false;
      }
    }
  }

  makeExitPoint();

  // sometimes the generation will curl in on itself to create dead ends and not fill out the maze
  // this resets the generation process if the maze has too many unexplored tiles
  let blanks = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].identity === "blank") {
        blanks ++;
      } 
    }
  }
  if (rows*cols/5 < blanks) {
    playerY = exitY;
    playerX = exitX;
  }
}


function makeExitPoint() {

  exitY = 0;
  exitX = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      // picks the lowest dead end to become the exit
      if (y !== 0 && y !== rows-1 && x !== 0 && x !== cols-1) {
        if (grid[y][x].identity === "dead end" && y > exitY) {
          exitY = y;
          exitX = x;
        }
      }
    }
  }

  grid[exitY][exitX] = createTile("exit", exitY, exitX);
}