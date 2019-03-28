import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    text: {type: String, required: true},
    name: {type: String},
    avatar: {type: String},
    likes: [{
        user: {type: Schema.Types.ObjectId, ref: "UserModel"}
    }],
    comments: [{
        user: {type: Schema.Types.ObjectId, ref: "UserModel"},
        text: {type: String, required: true},
        name: {type: String},
        avatar: {type: String},
        date: {type: Date, default: Date.now}
    }],
    date: {type: Date, default: Date.now}
},
{collection: "posts"}
)


export default mongoose.model("PostModel", schema)