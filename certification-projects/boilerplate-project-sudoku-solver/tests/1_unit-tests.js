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
})
