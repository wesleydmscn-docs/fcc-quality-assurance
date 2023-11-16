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

    test("Translate I ate yogurt for breakfast. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("I ate yogurt for breakfast."),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      )

      done()
    })

    test("Translate We had a party at my friend's condo. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("We had a party at my friend's condo."),
        'We had a party at my friend\'s <span class="highlight">flat</span>.'
      )

      done()
    })

    test("Translate Can you toss this in the trashcan for me? to British English", (done) => {
      assert.equal(
        translator.americanToBritish(
          "Can you toss this in the trashcan for me?"
        ),
        'Can you toss this in the <span class="highlight">bin</span> for me?'
      )

      done()
    })

    test("Translate The parking lot was full. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("The parking lot was full."),
        'The <span class="highlight">car park</span> was full.'
      )

      done()
    })

    test("Translate Like a high tech Rube Goldberg machine. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("Like a high tech Rube Goldberg machine."),
        'Like a high tech <span class="highlight">Heath Robinson device</span>.'
      )

      done()
    })
  })

  suite("British English To American English", () => { })

  suite("Highlight Translations", () => { })
})
