const User = require("../models/User.js");
const Schedule = require("../models/Schedule.js");

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const schedules = await Schedule.find({ user: id });
    return res.status(200).json({ user, schedules });
  } catch (error) {
    console.log(error);
  }
};
