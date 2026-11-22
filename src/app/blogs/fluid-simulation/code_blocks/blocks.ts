export const first = `class Cell {
  constructor(i, j, d, vx = 0.1, vy = 0.1, dt = 0.1) {
    this.i = i;
    this.j = j;
    this.pos = createVector(i, j);
    this.vel = createVector(vx, vy);
    this.d = d;
    this.p = 0;
    this.dt = dt;
  }
}`;

export const second = `let n = 64;
let cellSize;
let cells = [];
let nextCells = []`
;

export const third = `function setup() {
  createCanvas(400, 400);
  cellSize = width / n;
  
  for (let i = 0; i < n; i++) {
    cells[i] = [];
    nextCells[i] = [];
    for (let j = 0; j < n; j++) {
      // blob of density near the center (i and j go upto n-1) 
      // => shifts center near (n/2, n/2)
      let dx = i - n / 2; 
      let dy = j - n / 2;
      
      /* density calculated using a Gaussian function 
      dx * dx + dy * dy is the squared distance from the center of the grid
      the denominator 6.0 is a scaling factor that controls the spread of
      the density distribution */
      let d = exp(-(dx * dx + dy * dy) / 6.0);

      /* Multiplying by 0.08 scales down the speed so the dye advects 
      gradually across cells per step instead of leaping across the 
      whole grid in one frame. */
      let vx = -dy * .08;
      let vy = dx * .08;

      cells[i][j] = new Cell(i, j, d, vx, vy, 0.1);
      nextCells[i][j] = new Cell(i, j, d, vx, vy, 0.1);
    }
  }
}`;

export const fourth = `
function swapGrids() {
  let temp = cells;
  cells = nextCells;
  nextCells = temp;
}`;

export const fifth = `  
  // method of the cell class
  diffuse(s, k) {
    return (this.d + k * s) / (1 + k);
  }`;

export const sixth = ` 
// inside draw function
// 1. diffuse density using previous-frame values
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      let s =
        (cells[i - 1][j].d +
          cells[i + 1][j].d +
          cells[i][j + 1].d +
          cells[i][j - 1].d) / 4;
      let k = 0.25;
      nextCells[i][j].d = cells[i][j].diffuse(s, k);
    }
  }
  swapGrids();`;

export const seventh = `
// method of cell class
advect(grid) {
    // we constrain the backtracked position to be within the grid boundaries
    let backX = constrain(this.i - this.vel.x * this.dt, 0, n - 1.001);
    let backY = constrain(this.j - this.vel.y * this.dt, 0, n - 1.001);

    let i0 = floor(backX);
    let j0 = floor(backY);
    let i1 = i0 + 1;
    let j1 = j0 + 1;

    // weights based on closeness to the backtracked position
    let tx = backX - i0;
    let ty = backY - j0;

    // horizontal interpolation across top pair
    let z1 = this.lerpVal(grid[i0][j0].d, grid[i1][j0].d, tx);

    // horizontal interpolation across bottom pair
    let z2 = this.lerpVal(grid[i0][j1].d, grid[i1][j1].d, tx);

    // vertical interpolation along z1, z2
    return this.lerpVal(z1, z2, ty);
}`;

export const eighth = `
// method of cell class
  lerpVal(a, b, t) {
    return a + t * (b - a);
  }
`;

export const ninth = `  // advect density along velocity field
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      nextCells[i][j].d = cells[i][j].advect(cells);
    }
  }
  swapGrids()`;

export const tenth = ` 
// cell class method
clear_divergence(grid) {
    let i = this.i;
    let j = this.j;

    // Velocity divergence: (du/dx + dv/dy) / 2
    let div =
      0.5 *
      (grid[i + 1][j].vel.x -
        grid[i - 1][j].vel.x +
        grid[i][j + 1].vel.y -
        grid[i][j - 1].vel.y);

    // Jacobi pressure update
    this.p =
      (grid[i - 1][j].p +
        grid[i + 1][j].p +
        grid[i][j - 1].p +
        grid[i][j + 1].p -
        div) / 4;

    // Subtract pressure gradient to make velocity divergence-free
    this.vel.x -= 0.5 * (grid[i + 1][j].p - grid[i - 1][j].p);
    this.vel.y -= 0.5 * (grid[i][j + 1].p - grid[i][j - 1].p);
  }`;

export const eleventh = `
  // inside draw function
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      cells[i][j].clear_divergence(cells);
    }
  }`;

export const twelfth = `
  if (mouseIsPressed) {
    // mi and mj are the indices of the cell that the mouse is currently on
    let mi = floor(mouseX / cellSize);
    let mj = floor(mouseY / cellSize);
    if (mi > 0 && mi < n - 1 && mj > 0 && mj < n - 1) {
    // density is capped at 1 to prevent it from exceeding the maximum value
    // 0.4 is added to the density to create a visible effect of the dye being added to the fluid
      cells[mi][mj].d = min(1, cells[mi][mj].d + 0.4);
      cells[mi][mj].vel.add((mouseX - pmouseX) * 0.05, (mouseY - pmouseY) * 0.05);
    }
  }
  `;

export const thirteenth = `
  noStroke();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let d = constrain(cells[i][j].d, 0, 1);
      let alph = pow(d, 0.75) * 255;
      fill(16, 36, 110, alph);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
  }
  }`;