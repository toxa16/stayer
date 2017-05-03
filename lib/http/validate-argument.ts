import {Parameter} from '../types/parameter';
import {ConstraintType} from '../types/constraint-type';
import {BadRequest} from './errors';
import {findConstraintOfType} from './find-constraint-of-type';


/**
 * Validates given argument according to validator constraints
 * of given parameter. Throws BadRequest with corresponding
 * message if any validator fails.
 *
 * @param argument argument to validate
 * @param parameter corresponding endpoint parameter
 *
 * @throws {BadRequest} when any validator fails
 */
export function validateArgument(
  argument: any,
  parameter: Parameter,
): void {
  const cns = parameter.constraints;

  // checking required
  const required = findConstraintOfType(cns, ConstraintType.Required);
  if (required && (argument === undefined || argument == null)) {
    throw new BadRequest(`'${parameter.name}' is required.`);
  }

  // checking email
  const email = findConstraintOfType(cns, ConstraintType.Email);
  const emailRegExp = /.+@.+\..+/;
  if (email && !emailRegExp.test(argument)) {
    throw new BadRequest(
      `'${parameter.name}' is not a valid email address.`);
  }

  // checking pattern
  const pattern = findConstraintOfType(cns, ConstraintType.Pattern);
  if (pattern) {
    const regexp = pattern.options.regexp;
    if (!regexp.test(argument)) {
      throw new BadRequest(`'${parameter.name}' doesn't match ` +
        `format ${regexp.toString()}.`);
    }
  }

  // checking minlength
  const minlength = findConstraintOfType(
    cns, ConstraintType.MinLength);
  if (minlength) {
    const minChars = minlength.options.minChars;
    if (argument.length < minChars) {
      throw new BadRequest(`'${parameter.name}' must be ` +
        `at least ${minChars} characters long.`);
    }
  }

  // checking maxlength
  const maxlength = findConstraintOfType(
    cns, ConstraintType.MaxLength);
  if (maxlength) {
    const maxChars = maxlength.options.maxChars;
    if (argument.length > maxChars) {
      throw new BadRequest(`'${parameter.name}' must not be ` +
        `longer than ${maxChars} characters.`);
    }
  }
}
