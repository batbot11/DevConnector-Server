import validator from "validator";

const RegisterValidation = data => {
    const errors = {};

    // Name Validation
    if (!validator.isLength(data.name, {min: 3, max: 30}))  
    errors.name =  "The name should be between 3 to 30 characters!";

    if (!data.name) errors.name = "Name data can't be left empty!";
  
    // Email Validation
    if (!validator.isEmail(data.email)) errors.email = "Please provide a valid email";

    if (!data.email) errors.email = "Email field can't be left blank!";

    // Password Validation

    if (!validator.isLength(data.password, {min: 4, max: 20})) errors.password = "Password must be between 4 and 20 characters!";

    if (!data.password) errors.password = "Password field can't be left blank!";

    // Second Password Validation

    if (!validator.equals(data.password2, data.password)) errors.password2 = "The two passwords don't match!";

    if (!data.password2) errors.password2 = "Password2 field can't be left blank!";


    return {errors, isNotValid: !!Object.keys(errors).length }

}

export default RegisterValidation;