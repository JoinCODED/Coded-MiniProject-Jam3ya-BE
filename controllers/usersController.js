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
  console.log(req.user);
  const token = generateToken(req.user);
  res.json({ token });
};
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    exp: Date.now() + 4320000000, // the token will expire after 2 hours
  };
  const token = jwt.sign(payload, 'JWT_SECRET');
  return token;
};
