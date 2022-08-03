const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/authCookie");
const multer = require("../middleware/multer-config");

// Posts
router.get("/", auth, postController.readPost);
router.post("/", auth, multer, postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.patch("/like/:id", auth, postController.likePost);
router.patch("/unlike/:id", auth, postController.unLikePost);

// commentaires
router.patch("/comment/:id", auth, postController.commentPost);
router.patch("/edit-comment/:id", auth, postController.editCommentPost);
router.patch("/delete-comment/:id", auth, postController.deleteCommentPost);

module.exports = router;
