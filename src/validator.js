
const fastestValidator = require('fastest-validator');
const ValidatorError = require('./error');

/**
 *
 * @typedef {import('fastest-validator').ValidationRuleObject} ValidationRuleObject
 * @typedef {import('fastest-validator').CheckerFunction} CheckerFunction
 *
 * @class Validator
 * @extends {fastestValidator} - fastest-validator
 * @param {Array<ValidationRuleObject>|Object.<Number, ValidationRuleObject>} props
 * @returns {CheckerFunction} - builded validator function
 *
 * @example
 * const schema = {
 *     '0': [
 *       {
 *         type: 'array',
 *         items: {
 *           type: "string",
 *           empty: false,
 *           convert: true
 *         }
 *       },
 *       {
 *         type: 'string',
 *         empty: false,
 *         convert: true
 *       }
 *     ],
 *     '1': {
 *       type: 'number',
 *       integer: true,
 *       positive: true,
 *       default: 1,
 *       convert: true
 *     },
 * }
 * const validator = new Validator(schema)
 *
 * console.log(validator({'0': 'a' '1': 1}))
 * // console ->
 * true
 *
 * console.log(validator({'0': 'a' '1': -1}))
 * // console ->
 * `
 * ValidatorError: invalid args -
 *    The argument in position '1' field must be a positive number.
 *          at Validator.validateHandle (/home/jefferson/codes/projects/javascript/fn-handler-validator/src/validator.js:90:13)
 *          at Object.<anonymous> (/home/jefferson/codes/projects/javascript/fn-handler-validator/src/validator.js:124:1)
 *          at Module._compile (node:internal/modules/cjs/loader:1092:14)
 *          at Object.Module._extensions..js (node:internal/modules/cjs/loader:1121:10)
 *          at Module.load (node:internal/modules/cjs/loader:972:32)
 *          at Function.Module._load (node:internal/modules/cjs/loader:813:14)
 *          at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
 *          at node:internal/main/run_main_module:17:47 {
 *     data: [
 *       {
 *         type: 'numberPositive',
 *         message: "The argument in position '1' field must be a positive number.",
 *         field: '1',
 *         actual: -1
 *       }
 *     ]
 * }
 * `
 */
class Validator extends fastestValidator {
  constructor (props) {
    super();
    if (!props) { props = { 0: { type: 'any', optional: true } }; }

    if (props instanceof Object) { this.checkObj(props); }

    Object.keys(this.messages).forEach(key => {
      this.messages[key] = this.messages[key].replace('The ', 'The argument in position ');
    });

    const checker = this.compile({
      $$root: true,
      type: 'object',
      props: { ...props }
    });
    return this.validateHandle.bind(this, checker);
  }

  checkObj (props) {
    const schema = {
      $$root: true,
      type: 'array',
      items: {
        type: 'number', convert: true, integer: true
      }
    };

    const keys = Object.keys(props);
    const check = this.validate(keys, schema);

    if (check.length) { throw new ValidatorError('The object must have an enumerated key', check); }

    const keyLength = keys.length;
    const max = Math.max(...keys);

    if (max > keyLength) {
      for (let i = 0; i < max; i++) {
        if (!props[i]) { props[i] = { type: 'any', optional: true, nullable: true }; }
      }
    }
  }

  validateHandle (checker, ...argArr) {
    const isValid = checker(...argArr);
    if (isValid.length) { throw new ValidatorError('invalid args', isValid); }
    return isValid;
  }
}

module.exports = Validator;
