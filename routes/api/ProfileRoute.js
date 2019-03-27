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

//@Route       GET api/profiles/handle/:handle
//@Description Get profile by handle (SEO friendly)
//@Security    Private
router.get("/handle/:handle", passport.authenticate("jwt", {session: false}), (req, res) => {
    const errors = {};
    ProfileModel.findOne({handle: req.params.handle})
    .then(profile => {
        if (!profile) {
            errors.noProfile = "There is no profile with this handle";
            res.status(404).json(errors)
        }
        else res.json(profile)
    })
})

//@Route       GET api/profiles/user/:user_id
//@Description Get profile by User's Id
//@Security    Private
router.get("/user/:user_id", passport.authenticate("jwt", {session: false}), (req, res) => {
   const errors = {};
    ProfileModel.findOne({user: req.params.user_id})
    .then(profile => {
        if (!profile) {
            errors.noProfile = "There is no profile with this UserId";
            res.status(404).json(errors)
        }
        else res.json(profile)
   })
})

//@Route       GET api/profiles/all
//@Description Get all profiles present in the database
//@Security    Public
router.get("/all", (req, res) => {
    const errors = {};
    ProfileModel.find()
    .then(profiles => {
        if (!profiles) {
            errors.noProfiles = "Profiles are not currently accessible";
            res.status(404).json(errors)
        }
        else res.json(profiles)
    })
})

export default router;