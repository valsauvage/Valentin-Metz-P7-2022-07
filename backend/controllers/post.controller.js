const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utils/errors.utils");

module.exports.readPost = (req, res) => {
  PostModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de contenu : " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  if (req.error) {
    const errors = uploadErrors(req.error);
    return res.status(201).json({ errors });
   }
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture:
      req.file !== undefined
        ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`
        : "",
    likers: [],
    comments: [],
  });
  console.log("newPost", newPost);
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
  PostModel.findByIdAndUpdate(
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

  PostModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur de suppression : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true }
      )
      .catch((err) => {
        return res.status(400).send(err);
      });
    await UserModel
      .findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: {
            likes: req.params.id,
          },
        },
        { new: true }
      )
      .then((docs) => {
        res.send(docs);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ message2: err });
  }
};

module.exports.unLikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.id },
        },
        { new: true }
      )
      .catch((err) => {
        return res.status(400).send(err);
      });
    await UserModel
      .findByIdAndUpdate(
        req.body.id,
        {
          $pull: {
            likes: req.params.id,
          },
        },
        { new: true }
      )
      .then((docs) => {
        res.send(docs);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send({ message2: err });
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
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
    return PostModel.findById(req.params.id, (err, docs) => {
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
    return PostModel.findByIdAndUpdate(
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
