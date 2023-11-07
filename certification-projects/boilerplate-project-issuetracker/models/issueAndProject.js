const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose
  .connect(url)

  .then((_result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const IssueSchema = new mongoose.Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_on: Date,
  updated_on: Date,
  created_by: { type: String, required: true },
  assigned_to: String,
  open: Boolean,
  status_text: String,
})

const Issue = mongoose.model("Issue", IssueSchema)

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issues: [IssueSchema],
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = {
  Issue,
  Project,
}
