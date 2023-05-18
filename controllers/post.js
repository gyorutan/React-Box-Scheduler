const Schedule = require("../models/Schedule.js");
const User = require("../models/User.js");

exports.getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .sort({ date: 1, startTime: 1 })
      .populate({
        path: "user",
        select: "username",
      });
    return res.status(200).json(schedules);
  } catch (error) {
    console.log(error);
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { user, date, startTime, endTime, memo, createdAt } = req.body;
    const schedule = await Schedule.create({
      user,
      date,
      startTime,
      endTime,
      memo,
      createdAt,
    });
    schedule.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;
  await Schedule.findByIdAndRemove(id);
  return res.status(200).json({ success: true });
};


// exports.ServerHome = async (req, res) => {
//   try {
//     res.status(200).send(" Welcome to Server at Node.js ");
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.Create = async (req, res) => {
//   try {
//     const { genre, price, server, tier, title, content, imageUrl, userId, createdAt } = req.body;
//     const postCount = await Counter.findOneAndUpdate(
//       {},
//       { $inc: { count: 1 } },
//       { new : true }
//     );
//     const postNumber = postCount.count;
//     const findUser = await User.findOne({ _id : userId }).exec();
//     const post = new Post({
//       genre,
//       server,
//       tier,
//       price,
//       title,
//       content,
//       imageUrl,
//       writer : findUser._id,
//       createdAt,
//       postNumber,
//     })
//     await post.save();
//     return res.status(200).json({ success : true });
//   } catch (error) {
//     console.log(error);
//   };
// };

// exports.writeComment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { comment, commentBy, commentAt } = req.body;
//     const post = await Post.findById(id);
//     const newComment = {
//       comment : comment,
//       commentBy : commentBy,
//       commentAt : commentAt,
//     };

//     post.comments.push(newComment);
//     await post.save();
//     return res.status(200).json({ success : true });
//   } catch (error) {
//     console.log(error);
//   };
// };

// exports.getDetail = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id).populate({
//       path: "writer",
//       select: "username",
//     });
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.updatePostHits = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id);
//     post.postHits = (post.postHits || 0) + 1;
//     await post.save();
//     return res.status(200).json(post.postHits);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.updatePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { genre, price, server, title, content, imageUrl, createdAt } = req.body;
//     const post = {
//       genre,
//       server,
//       price,
//       title,
//       content,
//       imageUrl,
//       createdAt,
//     }
//     await Post.findByIdAndUpdate(id, post, { new: true });
//     return res.status(200).json({ success : true });
//   } catch (error) {
//     console.log(error);
//   };
// };

// exports.deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Post.findByIdAndRemove(id);
//     res.status(200).json({ success : true });
//   } catch (error) {
//     console.log(error);
//   }
// }

// exports.deleteComment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { postId } = req.body;
//     const post = await Post.findById(postId);
//     post.comments = post.comments.filter((comment) => comment._id != id);
//     await post.save();
//     return res.status(200).json({ success : true });
//   } catch (error) {
//     console.log(error);
//   };
// };
