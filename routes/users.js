const express = require('express');
const passport = require('passport');

const {
  signup,
  signin,
  wallet,
  userUpdate,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', signup);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signin
);
router.post(
  '/wallet',
  passport.authenticate('jwt', { session: false }),
  wallet
);
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  userUpdate
);

module.exports = router;
