const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.ServerHome = async (req, res) => {
  try {
    res.status(200).send(" Connected to Node Js PORT 5000 Successfully ");
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const { loginId, loginPw } = req.body;
    const currentUser = await User.findOne({ loginId }).exec();
    if (!currentUser) {
      return res.status(401).json({
        success: false,
      });
    }
    const comparePassword = await bcrypt.compare(loginPw, currentUser.loginPw);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
      });
    }
    const token = jwt.sign(
      {
        _id: currentUser.id,
        username: currentUser.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7h",
      }
    );
    return res.status(200).json({ success: true, currentUser, token });
  } catch (error) {
    console.log(error);
  }
};

exports.Register = async (req, res) => {
  try {
    const { username, loginId, loginPw, createdAt } = req.body;
    const hashedPassword = await bcrypt.hash(loginPw, 10);
    await User.create({
      username,
      loginId,
      loginPw: hashedPassword,
      createdAt,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

// exports.CheckUsername = async (req, res) => {
//   try {
//     const { username } = req.body;
//     const usernameExists = await User.exists({ username }).exec();
//     if (usernameExists) {
//       return res.status(409).json({ success : false });
//     } else {
//       return res.status(200).json({ success : true , username: username  });
//     };
//   } catch (error) {
//     console.log(error);
//   };
// };
