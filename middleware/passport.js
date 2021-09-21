const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
let User = require('../models/User');

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username }).select('+password');
    const passwordsMatch = user.password === password;
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: 'JWT_SECRET',
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findById(jwtPayload.id).select('+password');
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
