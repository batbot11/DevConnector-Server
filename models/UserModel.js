import mongoose from "mongoose";
import jwt from "jsonwebtoken"


const schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    avatar: {type: String, required: true},
    date: {type: Date, default: Date.now}
},
{collection: "users"}
)

schema.methods.toClientSide = function toClientSide () {
    return({
        id: this._id,
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        token: `Bearer ` + this.generateToken()
    })
}

schema.methods.generateToken = function generateToken () {
   const payload = {
       id: this._id,
        name: this.name,
        avatar: this.avatar
   }
  return jwt.sign(payload, process.env.SECRET, {expiresIn: 3600})
}

export default mongoose.model("UserModel", schema);