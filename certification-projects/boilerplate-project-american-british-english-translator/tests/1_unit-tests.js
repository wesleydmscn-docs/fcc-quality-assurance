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

    test("Translate To play hooky means to skip class or work. to British English", (done) => {
      assert.equal(
        translator.americanToBritish(
          "To play hooky means to skip class or work."
        ),
        'To <span class="highlight">bunk off</span> means to skip class or work.'
      )

      done()
    })

    test("Translate No Mr. Bond, I expect you to die. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("No Mr. Bond, I expect you to die."),
        'No <span class="highlight">Mr</span> Bond, I expect you to die.'
      )

      done()
    })

    test("Translate Dr. Grosh will see you now. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("Dr. Grosh will see you now."),
        '<span class="highlight">Dr</span> Grosh will see you now.'
      )

      done()
    })

    test("Translate Lunch is at 12:15 today. to British English", (done) => {
      assert.equal(
        translator.americanToBritish("Lunch is at 12:15 today."),
        'Lunch is at <span class="highlight">12.15</span> today.'
      )

      done()
    })
  })

  suite("British English To American English", () => { })

  suite("Highlight Translations", () => { })
})
