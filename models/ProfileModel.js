import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
    user: {type: Schema.Types.Object, ref: "users"},
    handle: {type: String, required: true, max: 40},
    company: {type: String},
    website: {type: String},
    location: {type: String},
    status: {type: String, required: true},
    skills: {type: [String], required: true},
    bio: {type: String},
    githubusername: {type: String},
    experience: {type: [{
        title: {type: String, required: true},
        company: {type: String, required: true},
        location: {type: String},
        from: {type: Date, required: true},
        to: {type: Date},
        current: {type: Boolean, Default: false},
        description: {type: String},
    }]},
    education: {type: [{
        school: {type: String, required: true},
        degree: {type: String, required: true},
        fieldofstudy: {type: String, required: true},
        from: {type: Date, required: true},
        to: {type: Date},
        current: {type: Boolean, Default: false},
        description: {type: String},
    }]},
    social: {
        youtube: {type: String},
        twitter: {type: String},
        facebook: {type: String},
        linkedin: {type: String},
        instagram: {type: String}
    },
    date: {type: Date, default: Date.now},
    profileData: {
        name: {type: String, required: true},
        avatar: {type: String, required: true}
    }
},
{collection: "profiles"}
)

schema.methods.fillProfile = function fillProfile (data) {
    
    if (data.handle) this.handle = data.handle;
    if (data.company) this.company = data.company;
    if (data.website) this.website = data.website;
    if (data.location) this.location = data.location;
    if (data.bio) this.bio = data.bio;
    if (data.status) this.status = data.status;
    if (data.githubusername) this.githubusername = data.githubusername;
    if (typeof data.skills !== "undefined") this.skills = data.skills.split(",");
    if (data.youtube) this.social.youtube = data.youtube;
    if (data.facebook) this.social.facebook = data.facebook;
    if (data.twitter) this.social.twitter = data.twitter;
    if (data.linkedin) this.social.linkedin = data.linkedin;
    if (data.instagram) this.social.instagram = data.instagram;

}

schema.methods.addName = function addName (data) {
     this.profileData.name = data.name;
    this.profileData.avatar = data.avatar;
}

export default mongoose.model("ProfileModel", schema);