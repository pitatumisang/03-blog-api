const { StatusCodes } = require('http-status-codes');
const CustomError = require('../utils/customError.js');
const User = require('../models/userModel.js');

//* @DESC    Register a new user
//* @ROUTE   POST /api/v1/user/register
//* @ACCESS  PUBLIC

const registerUser = async (req, res) => {
  const { names, email, password } = req.body;

  const user = await User.create({ names, email, password });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: 'User created', user });
};

//* @DESC    Login  user
//* @ROUTE   POST /api/v1/user/login
//* @ACCESS  PUBLIC
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email.trim() === '' || password.trim() === '') {
    throw new CustomError(
      'Email and password required',
      StatusCodes.UNAUTHORIZED
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(
      'Email or password incorrect',
      StatusCodes.UNAUTHORIZED
    );
  }

  if (!(await user.comparePasswords(password))) {
    throw new CustomError(
      'Email or password incorrect',
      StatusCodes.UNAUTHORIZED
    );
  }

  //Login is successful
  const token = await user.generateJwtToken();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'Login successful', token });
};

module.exports = { registerUser, loginUser };
