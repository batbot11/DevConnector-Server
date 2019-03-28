import express from "express";
import passport from "passport";
import ProfileModel from "../../models/ProfileModel";
import UserModel from "../../models/UserModel";
import ProfileValidation from "../../validation/ProfileValidation";
import ExperienceValidation from "../../validation/ExperienceValidation";
import EducationValidation from "../../validation/EducationValidation";

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

//@Route       POST api/profiles/experience
//@Description Post to experience array in Profile
//@Security    Private
router.post("/experience", passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isNotValid} = ExperienceValidation(req.body);
    if (isNotValid) return res.status(400).json(errors)
    else {
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        profile.addExperience(req.body);
        profile.save()
        .then(savedProfile => res.json(savedProfile))
        .catch(err => res.status(400).json(err))
    })
}
})

//@Route       POST api/profiles/education
//@Description Post to education array in Profile
//@Security    Private

router.post("/education", passport.authenticate("jwt", {session: false}), (req, res) => {
    const {errors, isNotValid} = EducationValidation(req.body);
    if (isNotValid) return res.status(400).json(errors)
    else {
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        profile.addEducation(req.body);
        profile.save()
        .then(savedProfile => res.json(savedProfile))
        .catch(err => res.status(400).json(err))
    })
}
})

//@Route       DELETE api/profiles/experience/:experience_id
//@Description Delete an object from Experience array
//@Security    Private
router.delete("/experience/:experience_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        const deletionIndex = profile.experience.map(experiences =>
             experiences.id).indexOf(req.params.experience_id);
        profile.experience.splice(deletionIndex, 1);
        profile.save()
        .then(updatedProfile => res.json(updatedProfile))
        .catch(err => res.status(404).json(err))
    })
})

//@Route       DELETE api/profiles/education/:education_id
//@Description Delete an object from Education array
//@Security    Private
router.delete("/education/:education_id", passport.authenticate("jwt", {session: false}), (req, res) => {
    ProfileModel.findOne({user: req.user.id})
    .then(profile => {
        const deletionIndex = profile.education.map(educationObjects => 
            educationObjects.id).indexOf(req.params.education_id);
            profile.education.splice(deletionIndex, 1);
            profile.save()
            .then(updatedProfile => res.json(updatedProfile))
            .catch(err => res.status(404).json(err))
    })
})

//@Route       DELETE api/profiles/
//@Description Delete the account with his/her profile
//@Security    Private
router.delete("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    ProfileModel.findOneAndDelete({user: req.user.id})
    .then(() => UserModel.findByIdAndDelete(req.user.id))
    .then(() => res.json({Message: "Account is successfully deleted!"}))
    .catch(err => res.status(400).json(err))
})


export default router;