const mongoose = require("mongoose");

const StackOverflowQuestion = new mongoose.Schema({
  tag: {
    type: String,
    trim: true,
    required: [true, "Add some name - required"],
  },
  count: {
    type: Number,
    required: [true, "Add some number"],
  },
  date: {
    type: Date,
    required: [true, "Add some date"],
  },
});

module.exports = mongoose.model("so_question", StackOverflowQuestion);