import validator from "validator";

const RegisterValidation = data => {
    const errors = {};

    // Email Validation
    if (!validator.isEmail(data.email)) errors.email = "Please provide a valid email";

    if (!data.email) errors.email = "Email field can't be left blank!";

    // Password Validation

    if (!validator.isLength(data.password, {min: 4, max: 20})) errors.password = "Password must be between 4 and 20 characters!";

    if (!data.password) errors.password = "Password field can't be left blank!";


    return {errors, isNotValid: !!Object.keys(errors).length }

}

export default RegisterValidation;