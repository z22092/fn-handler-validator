const Validator = require('./src/validator');


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

class HandlerValidator extends Validator {
  constructor(fn, schema) {
    if (typeof fn !== 'function')
      throw new TypeError(`The argument in position '0' must be a function, received type of ${typeof fn}`);

    const validator = super(schema);

    function apply(fn, thisArg, argArr) {
      const argObj = { ...argArr };

      validator(argObj);

      const parsedArg = new Array(fn.length);

      Object.entries(argObj).forEach(([index, value]) => {
        parsedArg[index] = value;
      });

      return fn(...parsedArg);
    };

    return new Proxy(fn, { apply });
  }
};

module.exports = HandlerValidator;
