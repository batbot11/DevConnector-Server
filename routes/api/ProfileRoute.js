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



export default router;