const mongoose = require('mongoose');

const Country = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Add some name - required'],
  },
  jobs: {
    type: Number,
    required: [true, 'Add some number'],
  },
});

const JobserverRecord = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Add some name - required'],
  },
  jobs_total: {
    type: Number,
    required: [true, 'Add some number'],
  },
  date: {
    type: Date,
    required: [true, 'Date is empty'],
  },
  countries: [Country],
});

module.exports = mongoose.model('jobserver_record', JobserverRecord);
