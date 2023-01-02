import cookie from "cookie";
const connectDB = require("./mongo");

const mongoose = require("mongoose");
import Quiz from "./Quiz";
const { User } = require("./api/models");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const stringify = require("json-stringify-safe");

const verifyJWT = (req, res, next) => {
  // Get the JWT from the request header
  const token = req.headers.authorization;

  // If there is no token, return an error
  if (!token) {
    return res.status(401).send("Access denied");
  }

  // Verify the JWT and set the user's ID to the request object
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
export async function getServerSideProps(context) {
  // Parse the cookies from the request header
  await connectDB();
  const cookies = cookie.parse(context.req.headers.cookie || "");
  console.log(cookies);
  console.log(cookies.jwt);
  console.log(cookies.jwt[1]);
  console.log(cookies.userId);
  // Get the user ID from the cookie
  const decoded = jwt.verify(cookies.jwt, process.env.JWT_SECRET);
  context.req.user = decoded.id;
  console.log(decoded);
  const userId = decoded.id;
  console.log(userId);

  // Find the user in the MongoDB database
  const user = await User.findById(userId);
  console.log(user);
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

const Dashboard = ({ user }) => {
  if (!user) {
    return <p>You are not authenticated</p>;
  }

  return (
    <div>
      <p
        style={{
          left: "600px",
        }}
      >
        Welcome, {user.name}!
      </p>
      <Quiz></Quiz>
    </div>
  );
};

export default Dashboard;
