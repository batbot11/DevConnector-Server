import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import Routes
import UserRoute from "./routes/api/UserRoute";
import ProfileRoute from "./routes/api/ProfileRoute";


const app = express();
dotenv.config();

// Connect to Mongodb Database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Successfully connected to Mongodb server!"))
.catch(err => console.log("Connection to Mongodb server failed!", err)) 

app.get("/", (req, res) => res.json({Message: "Server Works!"}));

// Establish Routes
app.use("/api/users", UserRoute);
app.use("/api/profiles", ProfileRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));