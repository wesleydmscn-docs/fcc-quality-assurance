"use strict"

const { Issue, Project } = require("../models/issueAndProject")

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      const { project } = req.params
      res.end()
    })

    .post(function (req, res) {
      const { project } = req.params
      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" })
      }

      const newIssue = new Issue({
        issue_title,
        issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by,
        assigned_to: assigned_to || "",
        open: true,
        status_text: status_text || "",
      })

      Project.findOne({ name: project })
        .then((projectData) => {
          if (projectData) {
            projectData.issues.push(newIssue)
            projectData.save().then(() => {
              res.json(newIssue)
            })
          } else {
            const newProject = new Project({ name: project })

            newProject.issues.push(newIssue)
            newProject.save().then(() => {
              res.json(newIssue)
            })
          }
        })
        .catch((error) => {
          res.status(404).json({ error })
        })
    })

    .put(function (req, res) {
      const { project } = req.params
      res.end()
    })

    .delete(function (req, res) {
      const { project } = req.params
      res.end()
    })
}
