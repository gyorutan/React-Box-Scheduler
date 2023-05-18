const mongoose = require("mongoose");

const individualSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Object,
  },
  time1: {
    type: Object,
  },
  time2: {
    type: Object,
  },
  time3: {
    type: Object,
  },
  time4: {
    type: Object,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const Individual = mongoose.model("Individual", individualSchema);
module.exports = Individual;
