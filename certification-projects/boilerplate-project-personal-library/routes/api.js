/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict"

const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.DB

mongoose
  .connect(url)

  .then((_result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const Book = require("../models/book")

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      Book.find({}).then((books) => {
        res.json(books)
      })
    })

    .post(function (req, res) {
      const { title } = req.body

      if (!title) return res.send("missing required field title")

      const newBook = new Book({
        title,
        commentcount: 0,
        comments: [],
      })

      newBook.save().then(({ title, _id }) => {
        res.json({ title, _id })
      })
    })

    .delete(function (req, res) {
      Book.deleteMany({}).then(() => {
        res.send("complete delete successful")
      })
    })

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      const { id } = req.params

      Book.findOne({ _id: id })
        .then(({ title, _id, comments }) => {
          res.json({ title, _id, comments })
        })
        .catch(() => {
          return res.send("no book exists")
        })
    })

    .post(function (req, res) {
      const { id } = req.params
      const { comment } = req.body

      if (!comment) return res.send("missing required field comment")

      Book.findOne({ _id: id }).then((bookData) => {
        if (!bookData) {
          res.send("no book exists")
        } else {
          bookData.comments.push(comment)
          bookData.commentcount += 1

          bookData.save().then(({ title, _id, comments }) => {
            res.json({ title, _id, comments })
          })
        }
      })
    })

    .delete(function (req, res) {
      const { id } = req.params

      Book.findByIdAndDelete({ _id: id })
        .then((book) => {
          if (!book) {
            res.send("no book exists")
          } else {
            res.send("delete successful")
          }
        })
        .catch(() => {
          return res.send("no book exists")
        })
    })
}
