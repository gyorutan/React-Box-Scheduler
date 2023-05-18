const mongoose = require("mongoose");

const bandSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bandName: {
    type: String,
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
  createdAt: {
    type: String,
    required: true,
  },
});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;
