const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    if (
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/jpeg" &&
      file.mimetype != "image/png"
    )
      req.error = Error("invalid file");
    if (file.size > 5000000) req.error = Error("max size");
     callback(null, file.originalname);
  },
});

module.exports = multer({ storage: storage }).single("file");
