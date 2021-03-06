const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfile = async (req, res) => {
  await UserModel.findOne({ _id: req.body.userId })
    .then((user) => {
      if (req.error) {
       throw req.error;
      }
      user.picture = `${req.protocol}://${req.get("host")}/upload/${
        req.file.filename
      }`;
      user.save();
      res.status(200).json({ message: "Image mise à jour" });
    })
    .catch((err) => {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    });
};
