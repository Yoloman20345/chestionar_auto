const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("./models");
const connectDB = require("../mongo");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const connect = require("./models");
router.post("/api/login", async (req, res) => {
  await connectDB();
  //await connect();
  console.log(User);
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (error, user) => {
      if (error) {
        res.status(500).send(error);
      } else if (!user) {
        res.status(404).send("User not found");
      } else {
        // Sign a JWT with the user's ID and a secret
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Send the JWT in the response
        res.send(token);
      }
    }
  );
});
module.exports = router;
