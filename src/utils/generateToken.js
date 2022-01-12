const jwt = require('jsonwebtoken');

const generateJwtToken = async (userId, username) => {
  return await jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateJwtToken;
