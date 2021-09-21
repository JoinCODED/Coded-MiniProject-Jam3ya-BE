const { model, Schema } = require('mongoose');
const saveRoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: { createdAt: 'created_at' } }
);
module.exports = model('SaveRoom', saveRoomSchema);
