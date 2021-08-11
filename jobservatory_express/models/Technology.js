const mongoose = require("mongoose");

const JobserverRecord = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Add some name - required"],
  },
  jobs_open: {
    type: Number,
    required: [true, "Add some number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("jobserver_record", JobserverRecord);
