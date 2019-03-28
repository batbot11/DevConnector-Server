import validator from "validator";

const PostValidation = data => {
    const errors = {};

    // Text Validation

    if (!validator.isLength(data.text, {min: 10, max: 300})) errors.text = 
    "Length of the text should be between 10 and 300 characters!"

    if (!data.text) errors.text = "Text field can't be left blank!";

   

    return {errors, isNotValid: !!Object.keys(errors).length }

}

export default PostValidation;