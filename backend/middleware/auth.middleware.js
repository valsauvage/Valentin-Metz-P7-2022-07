const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("Pas de token");
  }
};
