const americanOnly = require("./american-only.js")
const americanToBritishSpelling = require("./american-to-british-spelling.js")
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require("./british-only.js")

class Translator {
  constructor() {
    this.wordDiffAndSpelling = {
      ...americanOnly,
      ...americanToBritishSpelling,
    }
    this.titles = americanToBritishTitles
  }

  americanToBritish(text) {
    return this.translate(text, this.wordDiffAndSpelling, this.titles)
  }

  britishToAmerican(text) {
    const britishToAmericanSpelling = this.objectFlip(americanToBritishSpelling)
    const britishToAmericanTitles = this.objectFlip(americanToBritishTitles)

    return this.translate(
      text,
      {
        ...britishOnly,
        ...britishToAmericanSpelling,
      },
      britishToAmericanTitles
    )
  }
}

module.exports = Translator
