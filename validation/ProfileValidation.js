import validator from "validator";

const ProfileValidation = data => {
    const errors = {};

    // Handle Validation
    if (!validator.isLength(data.handle, {min: 3, max: 40})) 
    errors.handle = "Handle needs to be between 3 and 40 characters";

    if (!data.handle) errors.handle = "Handle field can't be left empty!";

    // Status Validation

    if (!data.status) errors.status = "Status field can't be left empty!";


    // Skills Validation

    if (!data.skills.length) errors.skills = "Skills field can't be left empty!";

    // Website Validation
        if (data.website) {
    if (!validator.isURL(data.website)) errors.website = "Please enter a valid URL";
}

    // Youtube Validation
    if (data.youtube) {
        if (!validator.isURL(data.youtube)) errors.youtube = "Please enter a valid URL";
    }

    // Facebook Validation
    if (data.facebook) {
        if (!validator.isURL(data.facebook)) errors.facebook = "Please enter a valid URL";
    }

    // Twitter Validation
    if (data.twitter) {
        if (!validator.isURL(data.twitter)) errors.twitter = "Please enter a valid URL";
    }

    // Instagram Validation
    if (data.instagram) {
        if (!validator.isURL(data.instagram)) errors.instagram = "Please enter a valid URL";
    }

    // Linkedin Validation
    if (data.linkedin)  {
        if (!validator.isURL(data.linkedin)) errors.linkedin = "Please enter a valid URL";
    }

    return {errors, isNotValid: !!Object.keys(errors).length }

}

export default ProfileValidation;