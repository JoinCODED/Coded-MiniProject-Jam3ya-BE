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
  '/wallet/:userId',
  passport.authenticate('local', { session: false }),
  wallet
);
router.post(
  '/update/:userId',
  passport.authenticate('local', { session: false }),
  userUpdate
);

module.exports = router;
