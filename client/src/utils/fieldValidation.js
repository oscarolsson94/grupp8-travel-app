const patterns = {
    validEmail: "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
};

const explanations = {
    validEmail: "E-post adressen kan ej innehålla svenska tecken, måste börja med en bokstav (A-Z), måste innehålla ett snabel-a ('@'), samt tecken innan och efter snabel-a:et.",
}

export const validateEmail = (email) => new RegExp(patterns.validEmail, "u").test(email);

export default {
    patterns: patterns,
    explanations: explanations,
    validateEmail: validateEmail
};
