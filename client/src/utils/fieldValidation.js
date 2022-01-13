const patterns = {
    // eslint-disable-next-line
    validName: /^.+/, // simplified, something like '^[\p{L}'][ \p{L}'-]*[\p{L}]$' should probably be used, but unclear on browser-support for '\p{L}'.
    // eslint-disable-next-line
    validEmail: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    // eslint-disable-next-line
    validPassword: /(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)(?=.*[@$!%*#?&_.,]).{8,}/,
};

const rules = {
    validName: "Minst en bokstav",
    validEmail: "E-post adressen kan ej innehålla svenska tecken, måste börja med en bokstav (A-Z), måste innehålla ett snabel-a ('@'), samt tecken innan och efter snabel-a:et.",
    validPassword: "Minst 8 tecken, minst en liten bokstav, minst en stor bokstav, minst en siffra, samt minst en av följande tecken '@$!%*#?&_.,'",
};

const messagesInvalid = {
    firstName: `Det angivna förnamnet är ej giltigt.`,
    lastName: `Det angivna efternamnet är ej giltigt.`,
    email: `Den angivna e-post adressen är ej giltigt. ${rules.validEmail ?? ""}`,
    password: `Det angivna namnet är ej giltigt. ${rules.validPassword ?? ""}`,
    confirmPassword: `De angivna lösenorden matchar ej.`,
};

export const validateName = (name) => new RegExp(patterns.validName, "ui").test(name);
export const validateEmail = (email) => new RegExp(patterns.validEmail, "ui").test(email);
export const validatePassword = (password) => new RegExp(patterns.validPassword, "g").test(password);

const fieldValidation = {
    patterns,
    rules,
    messagesInvalid,
    validateName,
    validateEmail,
    validatePassword,
};

export default fieldValidation;
