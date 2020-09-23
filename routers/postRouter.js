const express = require("express");
const passport = require("passport");
const validatePostInput = require("../validation/validatePostInput");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  comment,
  removeComment,
  sortByCategory,
  getPostBySlug,
} = require("../controllers/postController");
const upload = require("../utils/multer");
const router = express.Router();

router
  .route("/")
  .get(getAllPosts)
  .post(
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    validatePostInput,
    createPost
  );

router
  .route("/:id")
  .get(getPost)
  .patch(passport.authenticate("jwt", { session: false }), updatePost)
  .delete(passport.authenticate("jwt", { session: false }), deletePost);

router.get("/slug/:slug", getPostBySlug);
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);
router.post(
  "/dislike/:id",
  passport.authenticate("jwt", { session: false }),
  dislikePost
);
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  comment
);
router.post(
  "/:post_id/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  removeComment
);
router.get(
  "/sort/:category",
  passport.authenticate("jwt", { session: false }),
  sortByCategory
);

module.exports = router;
