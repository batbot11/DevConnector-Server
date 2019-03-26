import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import {Strategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";

// Import Routes
import UserRoute from "./routes/api/UserRoute";
import ProfileRoute from "./routes/api/ProfileRoute";
import UserModel from "./models/UserModel";


const app = express();
dotenv.config();

// Body Parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${process.env.SECRET}`;
passport.use(new Strategy(opts, (jwt_payload, done) => {
    UserModel.findById(jwt_payload.id)
    .then(user => {
        if (user) return done(null, user)
        else return done(null, false)
    })
    .catch(err => res.status(404).json(err))
}))


// Connect to Mongodb Database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(() => console.log("Successfully connected to Mongodb server!"))
.catch(err => console.log("Connection to Mongodb server failed!", err)) 

app.get("/", (req, res) => res.json({Message: "Server Works!"}));

// Establish Routes
app.use("/api/users", UserRoute);
app.use("/api/profiles", ProfileRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));