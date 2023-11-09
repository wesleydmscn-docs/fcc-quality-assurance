"use strict"

const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const { Issue, Project } = require("../models/issueAndProject")

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      const { project } = req.params
      const criteriaFields = req.query
      const matchCriteria = []

      for (const [key, value] of Object.entries(criteriaFields)) {
        if (value !== undefined) {
          if (key === "_id") {
            matchCriteria.push({ $match: { "issues._id": ObjectId(value) } })
          } else if (key === "open") {
            matchCriteria.push({
              $match: { "issues.open": /true/.test(value) },
            })
          } else {
            matchCriteria.push({ $match: { [`issues.${key}`]: value } })
          }
        }
      }

      const pipeline = [
        { $match: { name: project } },
        { $unwind: "$issues" },
        ...matchCriteria,
      ]

      Project.aggregate(pipeline)
        .exec()
        .then((projectData) => {
          if (projectData.length === 0) {
            res.status(404).json({ error: "No matching data found" })
          } else {
            const issues = projectData.map((data) => data.issues)
            res.json(issues)
          }
        })
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
      const { _id } = req.body

      if (!_id) {
        return res.json({ error: "missing _id" })
      }

      Project.findOne({ name: project }).then((projectData) => {
        if (!projectData) {
          return res.json({ error: "could not delete", _id: _id })
        } else {
          const targetIssue = projectData.issues.id(_id)

          if (!targetIssue) {
            return res.json({ error: "could not delete", _id: _id })
          }

          targetIssue.deleteOne()

          projectData
            .save()
            .then(() => {
              res.json({ result: "successfully deleted", _id: _id })
            })
            .catch(() => {
              res.json({ error: "could not delete", _id: _id })
            })
        }
      })
    })
}
