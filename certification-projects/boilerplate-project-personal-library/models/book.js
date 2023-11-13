const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  commentcount: { type: Number, required: true },
  comments: [String]
})

module.exports = new mongoose.model("Book", BookSchema)