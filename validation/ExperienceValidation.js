
const ExperienceValidation = data => {
    const errors = {};

    // Title Validation

    if (!data.title) errors.title = "Title field can't be left blank!";

    // Company Validation

    if (!data.company) errors.company = "Company field can't be left blank!";

    // From Validation

    if (!data.from) errors.from = "From field can't be left blank!";

    return {errors, isNotValid: !!Object.keys(errors).length }

}

export default ExperienceValidation;