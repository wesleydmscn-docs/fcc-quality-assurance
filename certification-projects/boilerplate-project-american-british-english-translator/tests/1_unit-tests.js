const chai = require("chai")
const assert = chai.assert

const Translator = require("../components/translator.js")
const translator = new Translator()

suite("Unit Tests", () => {
  suite("American English To British English", () => {
    test("Translate Mangoes are my favorite fruit. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("Mangoes are my favorite fruit."),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      )

      done()
    })
  })

  suite("British English To American English", () => { })

  suite("Highlight Translations", () => { })
})
