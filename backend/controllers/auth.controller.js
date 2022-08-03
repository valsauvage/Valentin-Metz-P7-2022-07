const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new UserModel({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(201).json({ message: "utilisateur créé" }))
      .catch((err) => {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
      });
  });
};

module.exports.signIn = async (req, res) => {
  UserModel.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .json({ errors: { email: "Utilisateur inconnu", password: "" } });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(200).json({
                errors: { email: "", password: "Mot de pass incorrect" },
              });
            } else {
              const token = createToken(user._id, user.admin);
              res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: true,
                maxAge: maxAge,
              });
              res.status(200).json("Token créé");
            }
          })
          .catch((err) =>
            res.status(500).json({ message: "erreur de cryptage " + err })
          );
      }
    })
    .catch((err) => res.status(500).json({ message: "erreur d'email " + err }));
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
