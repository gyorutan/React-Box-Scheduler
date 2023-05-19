// const User = require("../models/User.js");
const Band = require("../models/Band.js");
const Individual = require("../models/Individual.js");

exports.getIndividualSchedules = async (req, res) => {
  try {
    const individualSchedules = await Individual.find()
      .sort({ date: 1 })
      .populate({
        path: "user",
        select: "username",
      });
    return res.status(200).json(individualSchedules);
  } catch (error) {
    console.log(error);
  }
};

exports.getBandSchedules = async (req, res) => {
  try {
    const bandSchedules = await Band.find().sort({ date: 1 }).populate({
      path: "user",
      select: "username",
    });
    return res.status(200).json(bandSchedules);
  } catch (error) {
    console.log(error);
  }
};

exports.createIndividualSchedule = async (req, res) => {
  try {
    const { currentUser, date, time, createdAt } = req.body;

    console.log(time);

    const modifiedTime = time.map(({ value }) => value);
    console.log(modifiedTime);

    const existingSchedules = await Individual.find({
      date: date.value,
      time: { $in: modifiedTime },
    });

    if (existingSchedules.length > 0) {
      return res.status(400).json({ error: "error" });
    }

    const individualSchedule = await Individual.create({
      user: currentUser,
      date: date.value,
      time: modifiedTime,
      createdAt,
    });
    await individualSchedule.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// exports.createIndividualSchedule = async (req, res) => {
//   try {
//     const { currentUser, date, time1, time2, time3, time4, createdAt } =
//       req.body;
//     const individualSchedule = await Individual.create({
//       user: currentUser,
//       date,
//       time1,
//       time2,
//       time3,
//       time4,
//       createdAt,
//     });
//     await individualSchedule.save();
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.createBandSchedule = async (req, res) => {
  try {
    const { currentUser, bandName, date, time, createdAt } = req.body;

    console.log(time);

    const modifiedTime = time.map(({ value }) => value);
    console.log(modifiedTime);

    const existingSchedules = await Band.find({
      date: date.value,
      time: { $in: modifiedTime },
    });

    if (existingSchedules.length > 0) {
      return res.status(400).json({ error: "error" });
    }

    const bandSchedule = await Band.create({
      user: currentUser,
      bandName,
      date: date,
      time: modifiedTime,
      createdAt,
    });
    await bandSchedule.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
// exports.getSchedule = async (req, res) => {
//   try {
//     const schedules = await Schedule.find().populate({
//       path: "user",
//       select: "username",
//     });
//     const ArrayData = await Arrays.find();
//     const responseData = {
//       schedules: schedules,
//       arrayData: ArrayData,
//     };
//     return res.status(200).json(responseData);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.createSchedule = async (req, res) => {
//   try {
//     const {
//       user,
//       kozinDate,
//       kozinTime,
//       dantaiDate,
//       dantaiTime,
//       bandName,
//       createdAt,
//     } = req.body;
//     const schedule = await Schedule.create({
//       user,
//       kozinDate,
//       dantaiDate,
//       bandName,
//       createdAt,
//     });
//     schedule.save();
//     const array = await Arrays.create({
//       kozinTime,
//       dantaiTime,
//     });
//     array.save();
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;
  await Individual.findByIdAndRemove(id);
  await Band.findByIdAndRemove(id);
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
