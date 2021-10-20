let SaveRoom = require('../models/SaveRoom');
exports.getSavingRooms = async (req, res, next) => {
  try {
    const rooms = await SaveRoom.find().populate('author').populate('users');
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.createSavingRoom = async (req, res, next) => {
  try {
    if (req.user) {
      req.body.author = req.user.id;
    }
    let newRoom = req.body;
    newRoom = await SaveRoom.create(newRoom);
    const updateRoom = await SaveRoom.findOneAndUpdate(
      { _id: newRoom._id },
      { $push: { users: newRoom.author } },
      { new: true }
    )
      .populate('author')
      .populate('users');

    res.status(201).json(updateRoom);
  } catch (error) {
    next(error);
  }
};
exports.updateSavingRoom = async (req, res, next) => {
  // check if owner
  try {
    const room = await SaveRoom.findById(req.params.roomId);
    if (new Date(room.startDate) < Date.now()) {
      res.status(401).json("You can't update a room after it has started");
    } else if (room.author._id.toString() !== req.user._id.toString()) {
      res.status(401).json("You can't update a room if you are not the author");
    } else {
      const updatedRoom = await SaveRoom.findOneAndUpdate(
        { _id: req.params.roomId },
        req.body,
        { new: true }
      )
        .populate('author')
        .populate('users');
      res.status(201).json(updatedRoom);
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteSavingRoom = async (req, res, next) => {
  try {
    const room = await SaveRoom.findById(req.params.roomId);
    if (new Date(room.startDate) < Date.now()) {
      res.status(401).json("You can't delete a room after it has started");
    } else if (room.author._id.toString() !== req.user._id.toString()) {
      res.status(401).json("You can't delete a room if you are not the author");
    } else {
      await SaveRoom.findOneAndDelete({ _id: req.params.roomId });
      res.status(201).json('deleted');
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteSavingRoomPower = async (req, res, next) => {
  try {
    await SaveRoom.findOneAndDelete({ _id: req.params.roomId });
    res.status(201).json('deleted');
  } catch (error) {
    next(error);
  }
};

exports.joinSavingRoom = async (req, res, next) => {
  try {
    const room = await SaveRoom.findById(req.params.roomId);
    if (new Date(room.startDate) < Date.now()) {
      res.status(401).json("You can't join a room after it has started");
    } else {
      const updateRoom = await SaveRoom.findOneAndUpdate(
        { _id: req.params.roomId },
        { $push: { users: req.user._id } },
        { new: true }
      )
        .populate('author')
        .populate('users');
      res.status(201).json(updateRoom);
    }
  } catch (error) {
    next(error);
  }
};

exports.leaveSavingRoom = async (req, res, next) => {
  try {
    const room = await SaveRoom.findById(req.params.roomId);
    if (new Date(room.startDate) < Date.now()) {
      res.status(401).json("You can't leave a room after it has started");
    } else {
      const updateRoom = await SaveRoom.findOneAndUpdate(
        { _id: req.params.roomId },
        { $pull: { users: req.user._id } },
        { new: true }
      )
        .populate('author')
        .populate('users');
      res.status(201).json(updateRoom);
    }
  } catch (error) {
    next(error);
  }
};
