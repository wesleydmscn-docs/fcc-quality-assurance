const chai = require("chai")
const assert = chai.assert

const Solver = require("../controllers/sudoku-solver.js")
let solver

suite("Unit Tests", () => {
  const input =
    ".6.3.9..5.74.251..5..1.6.49..7..1.6.34....79....................1.....2....63..5."

  test("Handles valid string", () => {
    assert.isUndefined(solver.validate(input), "no error object should return")
  })

  test("Handles invalid characters in string", () => {
    const invalidInput =
      ":6}3|9<>5@74%251&^5~~1%6$49%&7=+1_6-34^__^79sudoku$!@#puzzles><>1are#@2fun!63//5{"
    assert.propertyVal(
      solver.validate(invalidInput),
      "error",
      "Invalid characters in puzzle"
    )
  })

  test("Handles string with invalid length", () => {
    const invalidInput =
      ".6.3.9..5.74.251..5..1.6.49..7..1.6.34....79...................1.....2....63..5."
    assert.propertyVal(
      solver.validate(invalidInput),
      "error",
      "Expected puzzle to be 81 characters long"
    )
  })
})
