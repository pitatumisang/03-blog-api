const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
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
