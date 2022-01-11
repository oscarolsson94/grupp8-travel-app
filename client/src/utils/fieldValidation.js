const patterns = {
    validEmail: "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    validPassword: "(?=.*\w)(?=.*\w)(?=.*\d)(?=.*[@$!%*#?&_.,]).{8,}",
};

const rules = {
    validEmail: "E-post adressen kan ej innehålla svenska tecken, måste börja med en bokstav (A-Z), måste innehålla ett snabel-a ('@'), samt tecken innan och efter snabel-a:et.",
    validPassword: "Minst 8 tecken, minst en liten bokstav, minst en stor bokstav, minst en siffra, samt minst en av följande tecken '@$!%*#?&_-'",
};

const messagesInvalid = {
    firstName: `Det angivna namnet är ej giltigt.`,
    lastName: `Det angivna namnet är ej giltigt.`,
    email: `Den angivna e-post adressen är ej giltigt. ${rules.validEmail ?? ""}`,
    password: `Det angivna namnet är ej giltigt. ${rules.validPassword ?? ""}`,
    confirmPassword: `De angivna lösenorden matchar ej.`,
};

export const validateEmail = (email) => new RegExp(patterns.validEmail, "u").test(email);

export default {
    patterns: patterns,
    explanations: rules,
    validateEmail: validateEmail
};
