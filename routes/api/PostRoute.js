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

export default router;