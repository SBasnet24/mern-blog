const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const { Category } = require("../models/categoryModel");
const APIFeatures = require("../utils/apiFeatures");
const _ = require("lodash");

// @acess private
// route POST /api/posts
exports.createPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("No user with that id", 400));
  const { title, body, description } = req.body;
  const category = await Category.findOne({ name: req.body.category }).select(
    "-__v"
  );

  const post = await Post.create({
    user: user._id,
    title,
    body,
    description,
    category: category._id,
    image: req.file.originalname,
  });
  // const posts = await Post.find().sort("-createdAt");
  res.status(201).json({
    status: "success",
    post,
  });
});

// @acess public
// route GET /api/posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query.populate({
    path: "user",
    select: "name email",
  });
  res.status(201).json({
    status: "success",
    result: posts.length,
    posts,
  });
});
// @acess public
// route GET /api/posts/:id
exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: "user",
    select: "name",
  });
  if (!post) return next(new AppError("No post with that id", 400));
  res.status(200).json({
    status: "success",
    post,
  });
});
exports.getPostBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const post = await Post.findOne({ slug }).populate({
    path: "user",
    select: "name",
  });
  if (!post) return next(new AppError("No post with that id", 400));
  res.status(200).json({
    status: "success",
    post,
  });
});

// @access private
// route PUT /api/posts/:id
exports.updatePost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("No user with that id", 400));
  let post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("No post with that id", 400));
  // jo user ho tesle matra aafno update garna paune
  if (user._id.toString() !== post.user.toString()) {
    return next(
      new AppError("You are not authorized to perform this action", 400)
    );
  }
  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: "success",
    post,
  });
});
// @access private
// route Delete /api/posts/:id
exports.deletePost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("No user with that id", 400));
  let post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("No post with that id", 400));
  if (user._id.toString() !== post.user.toString()) {
    return next(
      new AppError("You are not authorized to perform this action", 400)
    );
  }
  post = await Post.findByIdAndDelete(req.params.id);
  // sending all posts except the deleted to the users
  const posts = await Post.find().sort("-createdAt");
  res.status(201).json({
    status: "success",
    posts,
  });
});
// @access private
// route Post /api/posts/like/:post_id
exports.likePost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError("No user with that id", 400));
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("No post with that id", 400));
  // check if user has already liked the post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return next(new AppError("User has already liked the post"));
  }

  post.likes.unshift({ user: user._id });
  post.save().then((post) => res.json(post));
});
// @access private
// route post /api/posts/dislike/:post_id
exports.dislikePost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError("No user with that id", 400));
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("No post with that id", 400));
  // check if user has already liked the post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return next(new AppError("User has to like the post first", 400));
  }
  const removeIndex = post.likes
    .map((item) => item.user.toString())
    .indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);
  post.save().then((post) => res.json(post));
});
// @access private
// route post /api/posts/comment/:post_id
exports.comment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError("No user found with that id", 400));
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError("No post found with that id", 400));
  const comment = {
    text: req.body.text,
    user: req.user.id,
    name: req.user.name,
  };
  post.comments.unshift(comment);
  post.save().then((post) =>
    res.json({
      status: "success",
      post,
    })
  );
});
// @access private
// route post /api/posts/:post_id/comment/comment:id
exports.removeComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError("No user with that id", 400));
  const post = await Post.findById(req.params.post_id);
  if (!post) return next(new AppError("No post with that id", 400));

  // allowing only the user who has commented on the post to delete it
  post.comments.map((comment) => {
    if (req.params.comment_id === comment._id.toString()) {
      if (req.user.id.toString() !== comment.user.toString()) {
        return next(
          new AppError("You are not authorized to perform this action", 400)
        );
      }
    } else {
      return next(new AppError("No comment with that id", 400));
    }
  });

  //find index of comment that you want to delete
  const removeIndex = post.comments
    .map((item) => item._id.toString())
    .indexOf(req.params.comment_id);
  // remove comment if only index>=0
  if (removeIndex >= 0) {
    post.comments.splice(removeIndex, 1);
    post.save().then((post) =>
      res.json({
        status: "success",
        post,
      })
    );
  }
});
// @access private
// route //api/posts/sort/:category
exports.sortByCategory = catchAsync(async (req, res, next) => {
  const name = req.params.category;
  const category = await Category.findOne({ name });
  const posts = await Post.find({ category: category._id }).populate({
    path: "category",
    select: "name",
  });
  res.status(200).json({
    status: "success",
    result: posts.length,
    posts,
  });
});
