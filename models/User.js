const { model, Schema } = require('mongoose');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);
module.exports = model('User', userSchema);
