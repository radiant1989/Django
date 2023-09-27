import { helpers } from "@vuelidate/validators";
export const checkNumberandSymbol = helpers.regex(/^(?=.*\d)(?=.*[!$@?#]).*$/);
export const checkLetters = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/);
export const checkNameLetters = helpers.regex(/^[a-zA-Z0-9]+$/);
export const checkAtLetter = helpers.regex(/@/);
export const checkDotLetter = helpers.regex(/\./);
