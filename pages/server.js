const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { User } = require("../pages/api/models");
const connectDB = require("./mongo");
const app = express();

app.use(bodyParser.json());

// Connect to the MongoDB database
connectDB();

// Create a Mongoose schema for the user model

// Create a middleware function to verify the JWT

const router = express.Router();
// POST /api/register - Register a new user

// POST /api/login - Login a user

// GET /api/dashboard - Access a protected route

// Use the router for the API endpoints
app.use("/api", router);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
