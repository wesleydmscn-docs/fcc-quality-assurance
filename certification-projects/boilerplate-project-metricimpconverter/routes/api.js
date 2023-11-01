"use strict"

const expect = require("chai").expect
const ConvertHandler = require("../controllers/convertHandler.js")

module.exports = function (app) {
  let convertHandler = new ConvertHandler()

  app.get("/api/convert", (req, res) => {
    const { input } = req.query

    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (!initUnit && !initNum) return res.send("invalid number and unit")
    if (!initUnit) return res.send("invalid unit")
    if (!initNum) return res.send("invalid number")

    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnNum = convertHandler.convert(initNum, initUnit)

    const string = convertHandler.getString(
      initNum,
      convertHandler.spellOutUnit(initUnit),
      returnNum,
      convertHandler.spellOutUnit(returnUnit)
    )

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    })
  })
}
