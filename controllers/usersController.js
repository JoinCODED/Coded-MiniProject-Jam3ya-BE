let User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};
exports.wallet = async (req, res, next) => {
  // check if owner
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(201).json('user not found');
    }
    const updatedUser = await User.findOneAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.userUpdate = async (req, res, next) => {
  // check if owner
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(201).json('user not found');
    }
    const updatedUser = await User.findOneAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    wallet: user.wallet,
    exp: Date.now() + 4320000000000, // the token will expire after 2 hours
  };
  const token = jwt.sign(payload, 'JWT_SECRET');
  return token;
};
