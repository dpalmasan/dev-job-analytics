const mongoose = require("mongoose");

const StackOverflowQuestion = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Add some name - required"],
  },
  count: {
    type: Number,
    required: [true, "Add some number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    required: [true, "Add some date"],
  },
});

module.exports = mongoose.model("question", StackOverflowQuestion);