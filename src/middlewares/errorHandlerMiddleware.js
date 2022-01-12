const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Something went wrong, try again';
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({ success: false, msg: message });
};

module.exports = errorHandler;
