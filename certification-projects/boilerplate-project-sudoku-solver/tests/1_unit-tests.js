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

  test("Handles valid row placement", () => {
    const row = "a"
    const column = "1"
    const value = "1"
    assert.isArray(
      solver.isSafeManual(input, row, column, value),
      "array should be returned"
    )
    assert.notInclude(
      solver.isSafeManual(input, row, column, value),
      "row",
      "row should not be added to the array"
    )
  })

  test("Handles invalid row placement", () => {
    const row = "d"
    const column = "1"
    const value = "1"

    assert.isArray(
      solver.isSafeManual(input, row, column, value),
      "array should be returned"
    )
    assert.include(
      solver.isSafeManual(input, row, column, value),
      "row",
      "row should be added to the array"
    )
  })

  test("Handles valid column placement", () => {
    const row = "a"
    const column = "3"
    const value = "2"

    assert.isArray(
      solver.isSafeManual(input, row, column, value),
      "array should be returned"
    )
    assert.notInclude(
      solver.isSafeManual(input, row, column, value),
      "column",
      "column should not be added to the array"
    )
  })

  test("Handles invalid column placement", () => {
    const row = "a"
    const column = "7"
    const value = "7"
    assert.isArray(
      solver.isSafeManual(input, row, column, value),
      "array should be returned"
    )
    assert.include(
      solver.isSafeManual(input, row, column, value),
      "column",
      "column should be added to the array"
    )
  })

  test("Handles valid 3x3 region placement", () => {
    const row = "a"
    const column = "3"
    const value = "8"

    assert.isArray(
      solver.isSafeManual(input, row, column, value),
      "array should be returned"
    )
    assert.notInclude(
      solver.isSafeManual(input, row, column, value),
      "region",
      "region should not be added to the array"
    )
  })

  test("Handles invalid 3x3 region placement", () => {
    const row = "a"
    const column = "1"
    const value = "7"

    assert.isArray(
      solver.isSafeManual(input, row, column, value),
      "array should be returned"
    )
    assert.include(
      solver.isSafeManual(input, row, column, value),
      "region",
      "region should be added to the array"
    )
  })
})
