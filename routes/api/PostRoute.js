import express from "express";
import passport from "passport";
import PostModel from "../../models/PostModel";
import PostValidation from "../../validation/PostValidation";


const router = express.Router();

//@Route       POST /api/posts
//@Description Create a post
//@Security    Private
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isNotValid} = PostValidation(req.body);
    if (isNotValid) res.status(400).json(errors)
    else {
    const newPost = new PostModel({user: req.user.id, name: req.user.name, 
        avatar: req.user.avatar, text: req.body.text});        
        newPost.save()
        .then(post => res.json(post))
        .catch(err => err.status(400).json(err))
}
})

//@Route       GET /api/posts
//@Description Get all posts
//@Security    Public
router.get("/", (req, res) => {
    PostModel.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noPosts: "No Posts found!", err}))
})

//@Route       GET /api/posts/:post_id
//@Description Get a single post
//@Security    Public
router.get("/:post_id", (req, res) => {
    PostModel.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({noPost: "Couldn't find such a post!", err}))
})

//@Route       DELETE /api/posts/:post_id
//@Description Delete a post
//@Security    Private
router.delete("/:post_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    PostModel.findById(req.params.post_id)
    .then((post) => {
        if (post.user.toString() !== req.user.id)
         res.status(401).json({noAuthority: "Not Authorized for the action!"})
         else post.delete().then(() => res.json({Message: "Your Post has been deleted!"}))
    })
    .catch(err => res.status(400).json(err))
})

//@Route       POST /api/posts/like/:post_id
//@Description Like a post
//@Security    Private
router.post("/like/:post_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    PostModel.findById(req.params.post_id)
    .then(post => {
       if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) 
       res.json({alreadyLiked: "You have already liked this post!"})
       else {
           post.likes.unshift({user: req.user.id})
           post.save()
           .then(likedPost => res.json(likedPost))
           .catch(err => res.status(404).json({noPost: "Post not found!", err}))
       }
    })
})

//@Route       POST /api/posts/unlike/:post_id
//@Description Unlike a post
//@Security    Private
router.post("/unlike/:post_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    if (!req.body.text) res.status(400).json({errors: "Comment should have some text!"})
    else {
    PostModel.findById(req.params.post_id)
    .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
        res.status(400).json({notLiked: "You have not yet liked this post!"})
        else {
            const removalIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removalIndex, 1)
            post.save()
            .then(unlikePost => res.json(unlikePost))
            .catch(err => res.status(400).json(err))
        }
    })
}
})

//@Route       POST /api/posts/comment/:post_id
//@Description Comment on a post
//@Security    Private
router.post("/comment/:post_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    PostModel.findById(req.params.post_id)
    .then(post => {
        const newComment = {name: req.user.name, avatar: req.user.avatar, user: req.user.id};
        newComment.text = req.body.text;
        post.comments.unshift(newComment);
        post.save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err))
    })
})

//@Route       DELETE /api/posts/comment/:post_id/:comment_id
//@Description Delete a comment
//@Security    Private
router.delete("/comment/:post_id/:comment_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    PostModel.findById(req.params.post_id)
    .then(post => {
        if (post.comments.filter(comment => comment.user.toString() === req.user.id).length === 0)
        res.status(404).json({noComment: "Comment does not exist!"})
        else {
          const deletionIndex =  post.comments.map(comment => comment.user.toString).indexOf(req.params.comment_id);
          post.comments.splice(deletionIndex, 1);
          post.save()
          .then(post => res.json(post))
          .catch(err => res.status(400).json(err))
        }
    })
})


export default router;