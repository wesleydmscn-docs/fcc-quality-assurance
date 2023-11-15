const chai = require("chai")
const chaiHttp = require("chai-http")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

suite("Functional Tests", () => {
  const puzzle =
    ".6.3.9..5.74.251..5..1.6.49..7..1.6.34....79....................1.....2....63..5."

  test("POST /api/solve with valid string", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: puzzle })
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(
          res.body.solution,
          "162349875974825136583176249857491362341562798296783514635214987418957623729638451"
        )
        done()
      })
  })

  test("POST /api/solve with no string", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "Required field missing")
        done()
      })
  })
})
