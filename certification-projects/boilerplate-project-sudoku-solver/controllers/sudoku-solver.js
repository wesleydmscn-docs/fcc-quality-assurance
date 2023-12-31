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

  isSafeManual(puzzleString, selectedRow, selectedColumn, value) {
    let grid = this.transform(puzzleString)

    const rowArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    selectedRow = selectedRow.toUpperCase()
    const row = rowArray.indexOf(selectedRow)
    const column = Number(selectedColumn) - 1

    if (grid[row][column] !== 0) {
      if (grid[row][column] === value) {
        return true
      }
      return false
    }

    let errorArray = []
    for (let x = 0; x <= 8; x++) {
      if (grid[row][x] == value) {
        errorArray.push("row")
      }
    }

    for (let x = 0; x <= 8; x++) {
      if (grid[x][column] == value) {
        errorArray.push("column")
      }
    }

    let startRow = row - (row % 3)
    let startCol = column - (column % 3)

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == value) {
          errorArray.push("region")
        }
      }
    }

    return errorArray
  }

  isSafe(grid, row, column, value) {
    for (let x = 0; x <= 8; x++) {
      if (grid[row][x] == value) {
        return false
      }
    }

    for (let x = 0; x <= 8; x++) {
      if (grid[x][column] == value) {
        return false
      }
    }

    let startRow = row - (row % 3)
    let startCol = column - (column % 3)

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == value) {
          return false
        }
      }
    }

    return true
  }

  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    let row = -1
    let column = 0

    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++
      }
      if (column % 9 == 0) {
        column = 0
      }

      grid[row][column] = puzzleString[i] === "." ? 0 : puzzleString[i]
      column++
    }

    return grid
  }

  transformBack(grid) {
    return grid.flat().join("")
  }

  solve(puzzleString) {
    let grid = this.transform(puzzleString)
    let solved = this.solveCell(grid, 0, 0)

    if (!solved) {
      return false
    }

    return this.transformBack(solved)
  }
}

module.exports = SudokuSolver
