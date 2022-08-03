const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const auth = require('../middleware/authCookie');
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("../middleware/multer-config");

// authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user.db
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.userInfo);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

// upload
router.post("/upload", auth, multer, uploadController.uploadProfile);

module.exports = router;
