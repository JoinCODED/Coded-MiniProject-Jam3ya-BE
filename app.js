const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true }).then(() => {
  console.log(`mongo connected`);
});

const express = require('express');
const passport = require('passport');
const { localStrategy } = require('./middleware/passport');
const { jwtStrategy } = require('./middleware/passport');

const port = 8000;
const cors = require('cors');

const app = express();
const saveRoomRoutes = require('./routes/saveRooms');
const usersRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use('/jam3ya', saveRoomRoutes);
app.use('/', usersRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json(err.message ?? { message: 'Internal Server Error.!' });
});
app.listen(process.env.PORT || 5000);
