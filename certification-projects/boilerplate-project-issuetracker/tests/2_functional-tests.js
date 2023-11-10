const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

let deleteID

suite("Functional Tests", function () {
  suite("Routing Tests", function () {
    suite("POST requests", function () {
      test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .post("/api/issues/apitest")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "Wesley Damasceno",
            assigned_to: "Octocat",
            status_text: "Not Done",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.issue_title, "Issue")
            assert.equal(res.body.issue_text, "Functional Test")
            assert.equal(res.body.created_by, "Wesley Damasceno")
            assert.equal(res.body.assigned_to, "Octocat")
            assert.equal(res.body.status_text, "Not Done")

            deleteID = res.body._id

            done()
          })
      })

      test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .post("/api/issues/apitest")
          .set("content-type", "application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "Wesley Damasceno",
          })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.issue_title, "Issue")
            assert.equal(res.body.issue_text, "Functional Test")
            assert.equal(res.body.created_by, "Wesley Damasceno")

            done()
          })
      })

      test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .post("/api/issues/projects")
          .set("content-type", "application/json")
          .send({
            issue_title: "",
            issue_text: "",
            created_by: "fCC",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "required field(s) missing")

            done()
          })
      })
    })

    suite("GET requests", function () {
      test("View issues on a project: GET request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .get("/api/issues/gnome")
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.length, 1)

            done()
          })
      })

      test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .get("/api/issues/apitest")
          .query({
            _id: "654e2e13163624938dbc1fc8",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.deepEqual(res.body[0], {
              _id: "654e2e13163624938dbc1fc8",
              issue_title: "Issue",
              issue_text: "Functional Test",
              created_on: "2023-11-10T13:20:19.792Z",
              updated_on: "2023-11-10T13:20:19.792Z",
              created_by: "Wesley Damasceno",
              assigned_to: "Octocat",
              open: true,
              status_text: "Not Done",
            })

            done()
          })
      })

      test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .get("/api/issues/gnome")
          .query({
            issue_title: "Creating another POST route",
            issue_text: "Creating another POST route to fcc-issue-tracker",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.deepEqual(res.body[0], {
              _id: "654e29f4425d4fe87b1081bf",
              issue_title: "Creating another POST route",
              issue_text: "Creating another POST route to fcc-issue-tracker",
              created_on: "2023-11-10T13:02:44.165Z",
              updated_on: "2023-11-10T13:02:44.165Z",
              created_by: "Wesley Damasceno",
              assigned_to: "",
              open: true,
              status_text: "",
            })

            done()
          })
      })
    })

    suite("PUT requests", function () {
      test("Update one field on an issue: PUT request to /api/issues/test-data-put", function (done) {
        chai
          .request(server)
          .put("/api/issues/put-tests")
          .send({
            _id: "654e2effccc7fefa3da29f54",
            issue_title: "different",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.result, "successfully updated")
            assert.equal(res.body._id, "654e2effccc7fefa3da29f54")

            done()
          })
      })

      test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/put-tests")
          .send({
            _id: "654e2f03ccc7fefa3da29f59",
            issue_title: "random",
            issue_text: "random",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.result, "successfully updated")
            assert.equal(res.body._id, "654e2f03ccc7fefa3da29f59")

            done()
          })
      })

      test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/put-tests")
          .send({
            issue_title: "update",
            issue_text: "update",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "missing _id")

            done()
          })
      })

      test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            _id: "654e2f03ccc7fefa3da29f59",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "no update field(s) sent")

            done()
          })
      })

      test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .put("/api/issues/test-data-put")
          .send({
            _id: "40028922",
            issue_title: "update",
            issue_text: "update",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "could not update")

            done()
          })
      })
    })

    suite("DELETE requests", function () {
      test("Delete an issue: DELETE request to /api/issues/projects", function (done) {
        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({
            _id: deleteID,
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.result, "successfully deleted")

            done()
          })
      })

      test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({
            _id: "helloinvalid",
          })
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "could not delete")

            done()
          })
      })

      test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({})
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "missing _id")

            done()
          })
      })
    })
  })
})
