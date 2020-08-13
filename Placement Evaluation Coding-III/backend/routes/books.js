var express = require("express");
var Book = require("../models/book");
var User = require("../models/user");
const jwt = require("jsonwebtoken");
var router = express.Router();

router.get("/", function (req, res) {
  console.log(req.query.sort, "SORT");
  let condition = {};
  if (req.query.sort == "quantity") {
    condition["quantity"] = 1;
  } else if (req.query.sort == "price") {
    condition["price"] = 1;
  } else {
    condition["author"] = 1;
  }
  let page = req.query.page && req.query.page > 1 ? req.query.page : 1;
  Book.find({})
    .limit(10)
    .skip((page - 1) * 10)
    .sort(condition)
    .exec(function (err, books) {
      if (err) {
        res.send("error has occured");
      } else {
        //console.log(books);
        res.json(books);
      }
    });
});

router.get("/:id", function (req, res) {
  //console.log("getting one book");
  Book.findOne({
    _id: req.params.id,
  }).exec(function (err, book) {
    if (err) {
      res.send("error has occured");
    } else {
      //console.log(book);
      res.json(book);
    }
  });
});

router.post("/add", function (req, res) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      "secret_key",
      function (err, tokenUserData) {
        if (err) {
          return res.sendStatus(403);
        }

        User.find({ email: tokenUserData.email }).exec(function (err, user) {
          if (err) {
            res
              .status(500)
              .json({ message: "error has occured", succes: false });
          } else {
            if (user.length && user[0].email) {
              var newBook = new Book();
              newBook.title = req.body.title;
              newBook.author = req.body.author;
              newBook.category = req.body.category;
              newBook.description = req.body.description;
              newBook.price = req.body.price;
              newBook.quantity = req.body.quantity;
              newBook.updatedBy = user[0]._id;

              newBook.save(function (err, book) {
                if (err) {
                  res.send("error saving book");
                } else {
                  User.findOneAndUpdate(
                    {
                      email: user[0].email,
                    },
                    {
                      $set: {
                        books: [...user[0].books, newBook._id],
                      },
                    },
                    {
                      upsert: true,
                      new: true,
                    },
                    function (err, newBook) {
                      if (err) {
                        res.send("error updating book");
                      }
                    }
                  );
                  res
                    .status(200)
                    .json({ message: "successfully added", succes: true });
                }
              });
            } else {
              res
                .status(400)
                .json({ message: "please login first", succes: false });
            }
          }
        });
      }
    );
  } else {
    res.status(400).json({ succes: false, message: "Authorization faild" });
  }
});

router.put("/:id", function (req, res) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      "secret_key",
      function (err, tokenUserData) {
        if (err) {
          return res.sendStatus(403);
        }

        User.find({ email: tokenUserData.email }).exec(function (err, user) {
          if (err) {
            res
              .status(500)
              .json({ message: "error has occured", succes: false });
          } else {
            if (user.length && user[0].email) {
              let updatedBooks = user[0].books.filter(
                (bookId) => bookId != req.params.id
              );

              User.findOneAndUpdate(
                {
                  email: user[0].email,
                },
                {
                  $set: {
                    books: updatedBooks,
                  },
                },
                {
                  upsert: true,
                  new: true,
                },
                function (err, newBook) {
                  if (err) {
                    res
                      .status(400)
                      .json({ succes: false, message: "error updating book" });
                  }
                }
              );

              Book.findOneAndUpdate(
                {
                  _id: req.params.id,
                },
                {
                  $set: {
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    description: req.body.description,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    updatedBy: user[0]._id,
                  },
                },
                {
                  upsert: true,
                  new: true,
                },
                function (err, newBook) {
                  if (err) {
                    res
                      .status(200)
                      .json({ succes: false, message: "error updating book" });
                  } else {
                    //console.log(newBook);
                    res.status(400).json({ succes: true, data: newBook });
                  }
                }
              );
            } else {
              res
                .status(400)
                .json({ message: "please login first", succes: false });
            }
          }
        });
      }
    );
  } else {
    res.status(400).json({ succes: false, message: "Authorization faild" });
  }
});

router.delete("/:id", function (req, res) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      "secret_key",
      function (err, tokenUserData) {
        if (err) {
          return res.sendStatus(403);
        }

        User.find({ email: tokenUserData.email }).exec(function (err, user) {
          if (err) {
            res
              .status(500)
              .json({ message: "error has occured", succes: false });
          } else {
            if (user.length && user[0].email) {
              let updatedBooks = user[0].books.filter(
                (bookId) => bookId != req.params.id
              );

              User.findOneAndUpdate(
                {
                  email: user[0].email,
                },
                {
                  $set: {
                    books: updatedBooks,
                  },
                },
                {
                  upsert: true,
                  new: true,
                },
                function (err, newBook) {
                  if (err) {
                    res
                      .status(400)
                      .json({ succes: false, message: "error updating book" });
                  }
                }
              );
              Book.findByIdAndRemove(
                {
                  _id: req.params.id,
                },
                function (err, book) {
                  if (err) {
                    res
                      .status(400)
                      .json({ succes: false, message: "error deleting book" });
                  } else {
                    res.status(200).json({
                      succes: true,
                      message: "successfully deleted",
                      data: book,
                    });
                  }
                }
              );
            }
          }
        });
      }
    );
  } else {
    res.status(400).json({ succes: false, message: "Authorization faild" });
  }
});

module.exports = router;
