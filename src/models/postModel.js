const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    title: {
      type: String,
      required: [true, 'Post title is required!'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Post title is required!'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Posts', PostSchema);
