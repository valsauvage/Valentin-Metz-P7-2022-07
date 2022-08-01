const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userId = UserModel.findById(decodedToken.id);
    req.auth = { userId };  
    if (req.body._id && req.body._id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};