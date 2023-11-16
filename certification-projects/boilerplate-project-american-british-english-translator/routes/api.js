"use strict"

const Translator = require("../components/translator.js")

module.exports = function (app) {
  const translator = new Translator()

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body
    let translation

    if (text === "") {
      return res.json({ error: "No text to translate" })
    }

    if (!text || !locale) {
      return res.json({ error: "Required field(s) missing" })
    }

    const locales = {
      "british-to-american": () => translator.britishToAmerican(text),
      "american-to-british": () => translator.americanToBritish(text),
    }

    const isValidLocale =
      locale === "british-to-american" || locale === "american-to-british"

    if (isValidLocale) {
      const localeToTranslate = locales[locale]
      translation = localeToTranslate()
    } else {
      return res.json({ error: "Invalid value for locale field" })
    }

    if (translation === text) {
      translation = "Everything looks good to me!"
    }

    res.json({ text, translation })
  })
}
