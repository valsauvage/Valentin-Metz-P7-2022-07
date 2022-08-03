const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    console.log('decodedToken', decodedToken)
    const userId = decodedToken.id;
    const admin = decodedToken.admin;
    req.auth = { userId, admin };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
