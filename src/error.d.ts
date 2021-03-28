export = ValidatorError;
/**
 * @typedef {Object} ValidatorError
 * @property {String} name Name of Error Object,
 * @property {String} message Message Of Error Object,
 * @property {String} stack Optional Stack,
 * @property {Object} data Complementary Date of Error
 *
 * @class ValidatorError
 * @extends Error
 * @param {String} message Message to show in throw error
 * @param {Array<Object>} data Complementary data Array
 * @return Parsed error object
 *
 * @example
 * const newError = new ValidatorError(
 *          'Invalid type in position "X"',
 *          [{
 *            message: 'Item must "a" be a Number',
 *            ype: 'Number',
 *            etc: true
 *           }])
 * throw newError
 *
 * // Show in terminal =>
 * `
 * ValidatorError: Invalid type in position "X" -
 *          Item must "a" be a Number
 *              at Object.<anonymous> (/home/jefferson/codes/projects/javascript/fn-handler-validator/src/error.js:28:13)
 *              at Module._compile (node:internal/modules/cjs/loader:1092:14)
 *              at Object.Module._extensions..js (node:internal/modules/cjs/loader:1121:10)
 *              at Module.load (node:internal/modules/cjs/loader:972:32)
 *              at Function.Module._load (node:internal/modules/cjs/loader:813:14)
 *              at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
 *              at node:internal/main/run_main_module:17:47 {
 *           data: [
 *               { message: 'Item must "a" be a Number', type: 'Number', etc: true }
 *           ]
 * }
 * `
 */
declare class ValidatorError extends Error {
    constructor(message: any, data: any);
    data: any;
}
declare namespace ValidatorError {
    export { ValidatorError };
}
type ValidatorError = {
    /**
     * Name of Error Object,
     */
    name: string;
    /**
     * Message Of Error Object,
     */
    message: string;
    /**
     * Optional Stack,
     */
    stack: string;
    /**
     * Complementary Date of Error
     */
    data: any;
};
