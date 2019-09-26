const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Product = require("../../models/Product");
// Profile model

// Validation

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Product Works" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No Products found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res
          .status(404)
          .json({ noproductfound: "No product found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePostInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      size: req.body.size,
      color: req.body.color,

      user: req.user.id
    });

    newProduct.save().then(product => res.json(product));
  }
);

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    let body = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      size: req.body.size,
      color: req.body.color
    };
    Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, useFindAndModify: false }
    )
      .then(products => res.status(200).json(products))
      .catch(err => res.status(404).json({ errors: err }));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(pro => res.status(200).json(pro))
      .catch(err => res.status(404).json({ errors: "product not found" }));
  }
);

module.exports = router;
