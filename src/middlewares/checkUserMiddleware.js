const jwt = require('jsonwebtoken');

const checkUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    req.user = null;
    next();
    return;
  }

  if (!req.headers.authorization.startsWith('Bearer ')) {
    req.user = null;
    next();
    return;
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

module.exports = checkUser;
