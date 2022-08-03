const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: `${process.env.SERVER_URL}/upload/profil/random-user.png`
    },
    bio: {
      type: String,
      max: 1024,
    },
    likes: {
      type: [String]
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;