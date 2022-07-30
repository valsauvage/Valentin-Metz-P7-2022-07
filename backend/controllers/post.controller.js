const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { post } = require("../routes/user.routes");
const ObjectId = require("mongoose").Types.ObjectId;
// const fs = require("fs");
// const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
// const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  postModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de contenu : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {

  
  // let fileName;
  // console.log(req.file);
  // if (req.file !== undefined) {
  
  //   try {
  //     if (
  //       req.file.mimetype != "image/jpg" &&
  //       req.file.mimetype != "image/png" &&
  //       req.file.mimetype != "image/jpeg"
  //     )
  //       throw Error("Invalid file");
  //     if (req.file.size > 500000) throw Error("Max size");
  //   } catch (err) {
  //     const errors = uploadErrors(err);
  //     return res.status(500).json({errors});
  //   }

  //   fileName = req.body.posterId + Date.now() + ".jpg";

  //   await pipeline(
  //     req.file.buffer,
  //     fs.createWriteStream(
  //       `${__dirname}/../client/public/uploads/posts/${fileName}`
  //     )
  //   );
  // }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== undefined ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}` : "",
    likes: [],
    // disLikes: [],
    comments: [],
  });
  console.log('newPost', newPost)
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };
  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  postModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur de suppression : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }).catch((err) => {return res.status(400).send({message1: err})});
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: {
          likes: req.params.id,
        },
      },
      { new: true }).then(
      (docs) => {
       return res.send(docs);
      }
    ).catch((err) => {return res.status(400).send({message1: err})})
  } catch (err) {
    return res.status(400).send({message2: err});
  }
};

module.exports.unLikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }.catch((err) => {return res.status(400).send(err)})
    );
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: {
          likes: req.params.id,
        },
      },
      { new: true }.then(
        (docs) => {
         return res.send(docs);
        }
      ).catch((err) => {return res.status(400).send(err)})
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// module.exports.dislikePost = async (req, res) => {
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   try {
//     await postModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $addToSet: { disLikers: req.body.id },
//       },
//       { new: true },
//       (err, docs) => {
//         if (err) return res.status(200).send(err);
//       }
//     );
//     await userModel.findByIdAndUpdate(
//       req.body.id,
//       {
//         $addToSet: {
//           disLikes: req.params.id,
//         },
//       },
//       { new: true },
//       (err, docs) => {
//         if (!err) res.send(docs);
//         else return res.status(400).send(err);
//       }
//     );
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

// module.exports.unDislikePost = async (req, res) => {
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   try {
//     await postModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $pull: { disLikers: req.body.id },
//       },
//       { new: true },
//       (err, docs) => {
//         if (err) return res.status(200).send(err);
//       }
//     );
//     await userModel.findByIdAndUpdate(
//       req.body.id,
//       {
//         $pull: {
//           disLikes: req.params.id,
//         },
//       },
//       { new: true },
//       (err, docs) => {
//         if (!err) res.send(docs);
//         else return res.status(400).send(err);
//       }
//     );
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) return res.status(404).send("Commentaire introuvable");
      theComment.text = req.body.text;
      return docs.save((err) => {
        if (!err) res.status(200).send(docs);
        // return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
