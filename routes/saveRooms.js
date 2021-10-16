const express = require('express');
const passport = require('passport');

const {
  getSavingRooms,
  createSavingRoom,
  updateSavingRoom,
  deleteSavingRoom,
  joinSavingRoom,
  leaveSavingRoom,
  deleteSavingRoomPower,
} = require('../controllers/savingRoomsController');

const router = express.Router();

router.get('/', getSavingRooms);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createSavingRoom
);
router.delete(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  deleteSavingRoom
);
router.delete('/admin/:roomId', deleteSavingRoomPower);

router.put(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  updateSavingRoom
);
router.post(
  '/join/:roomId',
  passport.authenticate('jwt', { session: false }),
  joinSavingRoom
);
router.post(
  '/leave/:roomId',
  passport.authenticate('jwt', { session: false }),
  leaveSavingRoom
);

module.exports = router;
