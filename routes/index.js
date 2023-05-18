const express = require("express");
const { Login, Register, ServerHome } = require("../controllers/auth.js");
const {
  createIndividualSchedule,
  createBandSchedule,
  getIndividualSchedules,
  getBandSchedules,
  deleteSchedule,
} = require("../controllers/post.js");
const { getUserProfile } = require("../controllers/user.js");
const router = express.Router();

// Server Home
router.get("/", ServerHome);

// Get Individual Schedules
router.get("/individual", getIndividualSchedules);

// Get Band Schedules
router.get("/band", getBandSchedules);

// Get UserProfile
router.get("/user/:id", getUserProfile);

// Login
router.post("/login", Login);

// Register
router.post("/register", Register);

// Create Individual Schedule
router.post("/individual", createIndividualSchedule);

// Create Band Schedule
router.post("/band", createBandSchedule);

// Delete Schedule
router.delete("/delete/:id", deleteSchedule);

// // Get Posts
// router.get("/market", getPosts);

// // Get Post Detail
// router.get("/:id", getDetail);

// // Get Cart
// router.get("/cart/:id", getCart);

// // Duplication
// router.post("/checkusername", CheckUsername);

// // Create Post
// router.post("/create", Create);

// // Write Comment
// router.post("/comment/:id", writeComment);

// // Save Cart
// router.post("/cart/:id", saveCart);

// // Update Hits
// router.put("/hits/:id", updatePostHits);

// // Update Post
// router.put("/:id", updatePost);

// // Delete Post
// router.delete("/:id", deletePost);

// // Delete Comment
// router.delete("/comment/:id", deleteComment);

// // Delete Cart
// router.delete("/cart/:id", deleteCart);

module.exports = router;
