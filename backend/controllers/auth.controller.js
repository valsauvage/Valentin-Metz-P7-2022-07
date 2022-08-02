const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
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

  // try {
  //   const user = await UserModel.create({ pseudo, email, password });
  //   res.status(201).json({ user: user._id });
  // } catch (err) {
  //   const errors = signUpErrors(err);
  //   res.status(400).send({ errors });
  // }
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
              const token = createToken(user._id);
              res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
              res.status(200).json({
                user: user._id,
                token: token,
              });
            }
          })
          .catch((err) =>
            res.status(500).json({ message: "erreur de cryptage " + error })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "erreur d'email " + error })
    );

  // const { email, password } = req.body;

  // try {
  //   const user = await UserModel.login(email, password);
  //   const token = createToken(user._id);
  //   res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
  //   res.status(200).json({ user: user._id });
  // } catch (err) {
  //   const errors = signInErrors(err);
  //   res.status(400).json({ errors });
  // }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
