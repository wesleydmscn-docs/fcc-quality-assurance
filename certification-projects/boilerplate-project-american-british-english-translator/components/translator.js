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

  translate(text, wordDiffAndSpelling, titles) {
    let translated = this.replaceTitles(text, titles)

    translated = this.replaceTimeFormat(translated)
    translated = this.replaceWords(text, translated, wordDiffAndSpelling)

    return translated
  }

  replaceTitles(text, titles) {
    const textLowerCase = text.toLowerCase()
    let translated = text

    Object.entries(titles).forEach(([key, value]) => {
      if (textLowerCase.includes(key)) {
        translated =
          translated.replace(
            new RegExp(key, "gi"),
            `<span class="highlight">${this.capitalizeFirstLetter(
              value
            )}</span>`
          ) || translated
      }
    })

    return translated
  }

  replaceTimeFormat(text) {
    const timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g
    const changeTime = text.match(timeRegex)

    if (changeTime) {
      changeTime.forEach((time) => {
        text =
          text.replace(
            time,
            `<span class="highlight">${time.replace(":", ".")}</span>`
          ) || text
      })
    }

    return text
  }

  replaceWords(originalText, translatedText, wordDiffAndSpelling) {
    const textLowerCase = originalText.toLowerCase()

    let translated = translatedText

    Object.entries(wordDiffAndSpelling).forEach(([key, value]) => {
      if (
        new RegExp(`${key} `, "gi").test(textLowerCase) ||
        new RegExp(`${key}[^A-Za-z]`, "gi").test(textLowerCase) ||
        new RegExp(`${key}$`, "gi").test(textLowerCase)
      ) {
        translated =
          translated.replace(
            new RegExp(key, "gi"),
            `<span class="highlight">${value}</span>`
          ) || translated
      }
    })

    return translated
  }

  capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1)
  }
}

module.exports = Translator
