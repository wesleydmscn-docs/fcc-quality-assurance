function ConvertHandler() {
  this.getNum = function (input) {
    let result = input.split(/[^\d+(?:\.\d+)?/\d+$]/g).join("")

    if (result.includes("/") && result.split("/").length === 2) {
      const [number1, number2] = result.split("/")

      result = Number(number1) / Number(number2)

      return result
    }

    if (result.includes("/") && result.split("/").length > 2) {
      return null
    }

    if (Number(result) && !isNaN(result)) {
      return Number(result)
    }

    return 1
  }

  this.getUnit = function (input) {
    let result = input.split(/[\d+(?:\.\d+)?/\d+]/g).join("")

    if (this.getReturnUnit(result) && ["L", "l"].includes(result)) {
      return result.toUpperCase()
    }

    if (this.getReturnUnit(result)) {
      return result.toLowerCase()
    }

    return null
  }

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase()

    const units = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    }

    return units[unit] || null
  }

  this.spellOutUnit = function (unit) {
    const units = {
      gal: "Gallons",
      l: "Liters",
      mi: "Miles",
      km: "Kilometers",
      lbs: "Pounds",
      kg: "Kilograms",
    }

    return units[unit]
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.785410
    const lToGal = 0.264172

    const lbsToKg = 0.453592
    const kgToLbs = 2.204624

    const miToKm = 1.60934
    const kmToMi = 0.621373

    const conversions = {
      gal: initNum * galToL,
      l: initNum * lToGal,
      mi: initNum * miToKm,
      km: initNum * kmToMi,
      lbs: initNum * lbsToKg,
      kg: initNum * kgToLbs,
    }

    const unit = initUnit.toLowerCase()

    return Number(conversions[unit].toFixed(5))
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`.toLowerCase()
  }
}

module.exports = ConvertHandler
