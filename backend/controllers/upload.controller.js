const UserModel = require("../models/user.model");
// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
// const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfile = async (req, res) => {
  UserModel.findOne({ _id: req.body.userId }).then((user) => {
    user.picture = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
    user.save();
    res.status(200).json({message: 'Image mise à jour'})
  });


  // try {
  //   await UserModel.findByIdAndUpdate(
  //     req.body.userId,
  //     { $set: { picture: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` } },
  //     { new: true, upsert: true, setDefaultsOnInsert: true },
  //     (err, docs) => {
  //       if (!err) return res.send(docs);
  //       else return res.status(500).send({ message: err });
  //     }
  //   );
  // } catch (err) {
  //   return res.status(500).send({ message: err });
  // }
};
