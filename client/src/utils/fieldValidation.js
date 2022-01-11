const patterns = {
    validName: "^.+", // simplified, something like '^[\p{L}'][ \p{L}'-]*[\p{L}]$' should probably be used, but unclear on browser-support for '\p{L}'.
    validEmail: "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    validPassword: "(?=.*\w)(?=.*\w)(?=.*\d)(?=.*[@$!%*#?&_.,]).{8,}",
};

const rules = {
    validName: "Minst en bokstav",
    validEmail: "E-post adressen kan ej innehålla svenska tecken, måste börja med en bokstav (A-Z), måste innehålla ett snabel-a ('@'), samt tecken innan och efter snabel-a:et.",
    validPassword: "Minst 8 tecken, minst en liten bokstav, minst en stor bokstav, minst en siffra, samt minst en av följande tecken '@$!%*#?&_-'",
};

const messagesInvalid = {
    name: `Det angivna namnet är ej giltigt.`,
    email: `Den angivna e-post adressen är ej giltigt. ${rules.validEmail ?? ""}`,
    password: `Det angivna namnet är ej giltigt. ${rules.validPassword ?? ""}`,
    confirmPassword: `De angivna lösenorden matchar ej.`,
};

export const validateName = (name) => new RegExp(patterns.validName, "ui").test(name);
export const validateEmail = (email) => new RegExp(patterns.validEmail, "ui").test(email);
export const validatePassword = (password) => new RegExp(patterns.validPassword, "u").test(password);
export const validateConfirmPassword = (confirmPassword) => new RegExp(patterns.validConfirmPassword, "u").test(confirmPassword);

export default {
    patterns: patterns,
    explanations: rules,
    validateEmail: validateEmail
};
