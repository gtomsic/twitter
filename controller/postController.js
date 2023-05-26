const Post = require("../models/PostSchema");

module.exports.getPostController = async (req, res) => {
  Post.find()
    .populate("postedBy")
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

module.exports.postPostController = async (req, res) => {
  if (!req.body.content) {
    console.log("There is not content".red);
    return res.sendStatus(400);
  }

  let postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await Post.populate(newPost, { path: "postedBy" });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};
