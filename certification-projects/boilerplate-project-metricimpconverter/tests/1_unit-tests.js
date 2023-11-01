const chai = require("chai")
let assert = chai.assert
const ConvertHandler = require("../controllers/convertHandler.js")

let convertHandler = new ConvertHandler()

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L"

      assert.equal(convertHandler.getNum(input), 32)

      done()
    })

    test("Decimal Input", function (done) {
      let input = "32.5L"

      assert.equal(convertHandler.getNum(input), 32.5)

      done()
    })

    test("Fractional Input", function (done) {
      let input = "32/2L"

      assert.equal(convertHandler.getNum(input), 16)

      done()
    })

    test("Fractional Input w/ Decimal", function (done) {
      let input = "32.5/2.5L"

      assert.equal(convertHandler.getNum(input), 13)

      done()
    })

    test("Invalid Input (double fraction)", function (done) {
      let input = "3/2/3"

      assert.equal(convertHandler.getNum(input), null)

      done()
    })

    test("No Numerical Input", function (done) {
      let input = "L"

      assert.equal(convertHandler.getNum(input), 1)

      done()
    })
  })

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ]

      for (const ele of input) {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
      }

      done()
    })

    test("Unknown Unit Input", function (done) {
      let input = [
        "32gal",
        "3l",
        "23mi",
        "4km",
        "35.4lbs",
        "80kg",
        "12GAL",
        "20L",
        "20MI",
        "50KM",
        "123LBS",
        "55.5KG",
      ]

      for (const ele of input) {
        const expect = ele.split(/[\d+(?:\.\d+)?/\d+]/g).join("").toLowerCase()
        assert.equal(convertHandler.getUnit(ele), expect)
      }

      done()
    })
  })

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"]
      let expect = ["l", "gal", "km", "mi", "kg", "lbs"]

      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i])
      })

      done()
    })
  })

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"]
      let expect = ["Gallons", "Liters", "Miles", "Kilometers", "Pounds", "Kilos"]

      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i])
      })

      done()
    })
  })

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"]
      let expected = 18.9271

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        18
      )

      done()
    })

    test("L to Gal", function (done) {
      let input = [5, "l"]
      let expected = 1.3208

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        1
      )

      done()
    })

    test("Mi to Km", function (done) {
      let input = [5, "mi"]
      let expected = 8.0467

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        8
      )

      done()
    })

    test("Km to Mi", function (done) {
      let input = [5, "km"]
      let expected = 3.1068

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        3
      )

      done()
    })

    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"]
      let expected = 2.2679

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        2
      )

      done()
    })

    test("Kg to Lbs", function (done) {
      let input = [5, "kg"]
      let expected = 11.0231

      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        11
      )

      done()
    })
  })
})
