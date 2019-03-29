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
//@Security    Public
router.delete("/:post_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    console.log(req.user)
    PostModel.findById(req.params.post_id)
    .then((post) => {
        if (post.user.toString() !== req.user.id)
         res.status(401).json({noAuthority: "Not Authorized for the action!"})
         else post.delete().then(() => res.json({Message: "Your Post has been deleted!"}))
    })
    .catch(err => res.status(400).json(err))
})


export default router;