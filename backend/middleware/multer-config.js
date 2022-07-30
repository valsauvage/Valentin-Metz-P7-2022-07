const multer = require("multer");

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    if (
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/jpeg" &&
      file.mimetype != "image/png"
    ) {
      throw err;
    } else {
      // const name = file.originalname.split(' ').join('_');
      // const extension = MIME_TYPES[file.mimetype];
      callback(null, file.originalname);
    }
  },
});

module.exports = multer({ storage: storage }).single("file");
