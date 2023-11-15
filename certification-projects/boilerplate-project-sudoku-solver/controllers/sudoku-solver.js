class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) {
      return { error: "Required field missing" }
    }

    if (puzzleString.length !== 81) {
      return { error: "Expected puzzle to be 81 characters long" }
    }

    for (let i = 0; i < puzzleString.length; i++) {
      if (puzzleString[i] !== "." && !puzzleString[i].match(/\d/)) {
        return { error: "Invalid characters in puzzle" }
      }
    }
  }

  solveCell(grid, row, column) {
    if (row === 9 - 1 && column === 9) {
      return grid
    }

    if (column === 9) {
      row++
      column = 0
    }

    if (grid[row][column] !== 0) {
      return this.solveCell(grid, row, column + 1)
    }

    for (let value = 1; value < 10; value++) {
      if (this.isSafe(grid, row, column, value)) {
        grid[row][column] = value

        if (this.solveCell(grid, row, column + 1)) {
          return grid
        }
      }

      grid[row][column] = 0
    }
    return false
  }

  checkRowPlacement(puzzleString, row, column, value) { }

  checkColPlacement(puzzleString, row, column, value) { }

  checkRegionPlacement(puzzleString, row, column, value) { }

  solve(puzzleString) { }
}

module.exports = SudokuSolver
