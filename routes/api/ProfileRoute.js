import express from "express";
import passport from "passport";
import ProfileModel from "../../models/ProfileModel";
import ProfileValidation from "../../validation/ProfileValidation";
import UserModel from "../../models/UserModel";

const router = express.Router();

//@Route       GET api/profiles
//@Description Gets Profiles of current user
//@Security    Private
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    ProfileModel.findOne({user: req.user.id})
    .populate('users', 'name')
    .then(profile => {
        if (!profile) return res.json({Message: "There is no profile for this user!"})
        else res.json(profile)
    })
})

//@Route       POST api/profiles
//@Description Create or Update Profiles
//@Security    Private
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isNotValid} = ProfileValidation(req.body);
    if (isNotValid) return res.status(400).json(errors)
    else {
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        if (!profile) {
             const newProfile = new ProfileModel({user: req.user.id});
             newProfile.fillProfile(req.body);
             newProfile.addName(req.user);
             ProfileModel.findOne({handle: newProfile.handle})
             .then(profileHandle => {
                 if (profileHandle) {
                    errors.handle = "User handle already exists!";
                     res.status(400).json(errors)
                 }
                 else newProfile.save().then(profile => res.json(profile))
                 .catch(err => res.status(400).json(err))
             })
        } 
        else {
             profile.fillProfile(req.body);
             profile.save()
             .then(updatedProfile => res.json(updatedProfile))
        }
    })
}
})


export default router;