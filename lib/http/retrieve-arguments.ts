import {Parameter} from '../types/parameter';
import {ConstraintType} from '../types/constraint-type';
import {findConstraintOfType} from './find-constraint-of-type';
import {validateArgument} from './validate-argument';
import {RequestPayload} from '../types/request-payload';


/**
 * Returns an array of endpoint arguments for corresponding
 * parameter, retrieving them from URL query and request body.
 *
 * @param parameters parameters of target endpoint
 * @param payload HTTP request payload (transitive parameter)
 * @param argumentValidator argument validator function; this
 * parameter implements dependency injection for test purposes
 *
 * @return {Array} array of arguments for endpoint function
 *
 * @throws {BadRequest} when some argument doesn't pass any
 * validator constraint of corresponding parameter, the
 * BadRequest error from the argumentValidator is rethrown.
 */
export function retrieveArguments(
  parameters: Parameter[],
  payload: RequestPayload,
  argumentValidator: (a: any, p: Parameter) => void = validateArgument,
): any[] {

  const args = [];
  for (const param of parameters) {

    const cns = param.constraints;

    const auth = findConstraintOfType(cns, ConstraintType.Auth);
    if (auth) {
      // TODO: authorization
      args.push(undefined);
    } else {
      let arg;

      // determining argument source (query or body)
      const queryC = findConstraintOfType(cns, ConstraintType.Query);
      if (queryC) {
        // query is always an object, at least blank {}
        arg = payload.query[param.name];
      } else {
        // body might be "undefined"
        const body = payload.body;
        arg = (body) ? body[param.name] : undefined;
      }

      // checking validator constraints
      argumentValidator(arg, param);

      args.push(arg);
    }
  }
  return args;

}
