
const EducationValidation = data => {
    const errors = {};

    // School Validation

    if (!data.school) errors.school = "School field can't be left blank!";

    // Degree Validation

    if (!data.degree) errors.degree = "Degree field can't be left blank!";

    // Field of Study Validation

    if (!data.fieldofstudy) errors.fieldofstudy = "Field of Study can't be left blank!";
   
    // From Validation

    if (!data.from) errors.from = "From can't be left blank!";
   

    return {errors, isNotValid: !!Object.keys(errors).length }

}

export default EducationValidation;