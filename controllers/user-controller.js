const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
};

const getUsers = async (req, res, next) => {
  const id = req.params.id;
  try {
    const isUser = await User.findOne({ _id: id });
    if (!isUser) {
      return res.json({ message: "No user found.", status: false });
    }
    res.status(200).json({
      user: isUser,
      status: true,
    });
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
    if (hasUser) {
      return res.json({
        message: "User already exists with the same mail Id.",
        status: false,
      });
    }
  } catch (err) {
    return next(err);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(err);
  }
  const token = createToken(newUser._id);
  res.status(200).json({ name, token, status: true });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.json({
        message: "No user found with the entered email address.",
        status: false,
      });
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.json({
        message: "Invalid credentials entered.",
        status: false,
      });
    }
  } catch (err) {
    return next(err);
  }
  const name = existingUser.name;
  const token = createToken(existingUser._id);
  res.status(200).json({
    name,
    token,
    status: true,
  });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
