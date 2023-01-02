const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const connectDB = require("../mongo");
const { User } = require("./models");

// POST /api/register - Register a new user
router.post("/api/register", async (req, res) => {
  // Create a new user based on the request body
  await connectDB();
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Save the user to the MongoDB database
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
