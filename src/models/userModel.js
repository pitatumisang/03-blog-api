const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Names must be at least 3 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email required'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [4, 'Password must be at least 4 charaters'],
      trim: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving to database
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password for login
UserSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
UserSchema.methods.generateJwtToken = async function () {
  return await jwt.sign(
    { userId: this._id.toString(), username: this.names },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

module.exports = mongoose.model('Users', UserSchema);
