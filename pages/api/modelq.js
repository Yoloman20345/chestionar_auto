const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  correct: {
    type: Array,
    required: true,
  },
  questionId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
if (mongoose.models.questions) {
  module.exports = mongoose.model("questions");
} else {
  module.exports = mongoose.model("questions", QuestionSchema);
}
