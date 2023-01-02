const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("./models");
router.get("/dashboard", verifyJWT, (req, res) => {
  User.findById(req.user, (error, user) => {
    if (error) {
      res.status(500).send(error);
    } else if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  });
});
