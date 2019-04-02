import express from "express";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import passport from "passport";
import RegisterValidation from "../../validation/RegisterValidtion";
import LoginValidation from "../../validation/LoginValidation";

import UserModel from "../../models/UserModel";

const router = express.Router();

router.get("/test", (req, res) => res.json({Message: "Test route works!!!"}));

//@Route       POST api/users/register
//@Description User Registration route
//@Security    Public  
router.post("/register", (req, res) => {
   const {errors, isNotValid} = RegisterValidation(req.body);

   if (isNotValid) return res.status(400).json(errors)
    else {
    UserModel.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            errors.email = "Email already exists! If its yours please login.";
            return res.status(400).json(errors)
        }
        else {
            const newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                passwordHash: bcrypt.hashSync(req.body.password, 10),
                avatar: gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
            })
        newUser.save()
        .then(newUser => res.json(newUser.toClientSide()))
        .catch(err => res.status(400).json(err))
        }
    })
}
})

//@Route       POST api/users/login
//@Description User Login route
//@Security    Public
router.post("/login", (req, res) => {
    const {errors, isNotValid} = LoginValidation(req.body);
    if (isNotValid) return res.status(400).json(errors)
    else {
    const {email, password} = req.body;
    UserModel.findOne({email})
    .then(user => {
        if (!user) return res.status(404).json({email: "User not found!"})
        else {
            bcrypt.compare(password, user.passwordHash)
            .then(() => res.json(user.toClientSide()))
            .catch(err => res.status(400).json(err))
        }
    })
}
})

//@Route       GET api/users/current
//@Description Get Current user details from token
//@Security    Private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => 
    res.json(req.user.toClientSide())
)


export default router;