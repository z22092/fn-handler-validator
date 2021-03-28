import Validator = require("./src/validator");

/**
 * @typedef {import('fastest-validator').ValidationRuleObject} ValidationRuleObject
 *
 * @class HandlerValidator
 * @extends {Validator}
 * @param {Function} fn - Function to be handled
 * @param {Array<ValidationRuleObject>|Object.<Number, ValidationRuleObject>} schema - array or object Schema
 * @return {Proxy} a Handled function
 * @example
 *
 * function test(a, b, c) {
 *     return a + b + c;
 * };
 *
 * const schema = [
 *     { type: 'number', integer: true, positive: true, convert: true },
 *     { type: 'number', integer: true, positive: true, default: 10 },
 *     { type: 'any', optional: true },
 * ];
 * const handledFunction = new HandlerValidator(test, schema);
 * console.log(handledFunction("10")); // {0: 10, 1: 10} result = 20
 *
 * const schema = {
 *     '1': { type: 'number', integer: true, positive: true },
 *     '2': { type: 'number', integer: true, positive: true, default: 10 }
 * };
 * const handledFunction = new HandlerValidator(test, schema);
 * console.log(handledFunction(10, 50)); // {0: 10, 1: 50, 2: 10} result = 70
 */

declare class HandlerValidator extends Validator {
    constructor(fn: Function, schema: Array<Object | String> | Object);
}

declare namespace HandlerValidator {
    export { HandlerValidator };
}

export = HandlerValidator;
