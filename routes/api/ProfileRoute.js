import express from "express";
import passport from "passport";
import UserModel from "../../models/UserModel";
import ProfileModel from "../../models/ProfileModel";


const router = express.Router();

//@Route       GET api/profiles
//@Description Gets Profiles of current user
//@Security    Private
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        if (!profile) return res.json({Message: "There is no profile for this user!"})
        else res.json(profile)
    })
})

//@Route       POST api/profiles
//@Description Create or Update Profiles
//@Security    Private
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        if (!profile) {
             const newProfile = new ProfileModel({user: req.user.id});
             newProfile.fillProfile(req.body);
             ProfileModel.findOne({handle: newProfile.handle})
             .then(profileHandle => {
                 if (profileHandle) res.status(400).json({Message: "User handle already exists!"})
                 else newProfile.save().then(profile => res.json(profile))
             })
        } 
        else {
            
            
        }
    })
})


export default router;