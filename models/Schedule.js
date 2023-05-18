const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  memo: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
