const chai = require("chai")
const chaiHttp = require("chai-http")
const assert = chai.assert
const server = require("../server.js")

chai.use(chaiHttp)

let Translator = require("../components/translator.js")

suite("Functional Tests", () => {
  test("Translation with text and locale fields: POST request to /api/translate", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send({
        text: "I ate yogurt for breakfast.",
        locale: "american-to-british",
      })
      .end((err, response) => {
        assert.equal(response.body.text, "I ate yogurt for breakfast.")
        assert.equal(
          response.body.translation,
          'I ate <span class="highlight">yoghurt</span> for breakfast.'
        )

        done()
      })
  })
})
