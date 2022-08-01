const multer = require("multer");

const maxSize = 1000000;

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
      return Error("invalid file");
    // if (req.file.size > 500000) return Error("max size");
    else callback(null, file.originalname);
  },
});

module.exports = multer({ storage: storage, limits: { fileSize: maxSize }}).single("file");
