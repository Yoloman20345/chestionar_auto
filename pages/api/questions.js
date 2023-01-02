const connectDB = require("../mongo");
const Question = require("./modelq");

const handler = async (req, res) => {
  await connectDB();
  const questions = await Question.find();
  res.json(questions);
};

module.exports = handler;
