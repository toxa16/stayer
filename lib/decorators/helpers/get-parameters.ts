import {ConstraintRegister} from '../../registers/constraint.register';
import {Parameter} from '../../types/parameter';
import {ConstraintType} from '../../types/constraint-type';


/**
 * Composes array of parameters according to given parameter
 * names and constraints from given constraint register.
 * Throws SyntaxError when trying to register a parameter
 * without @auth or @query constraints for endpoints of HTTP
 * methods that don't have request body (e.g. GET or DELETE).
 *
 * @param paramNames array of parameter names
 * @param constraintRegister the constraint register instance
 * @param hasBody whether corresponding HTTP method has response body
 *
 * @return {Parameter[]} array of parameters
 *
 * @throws SyntaxError when trying to register parameter w/out @auth
 * or @query for non-bodied HTTP method
 */
export function getParameters(
  paramNames: string[],
  constraintRegister: ConstraintRegister,
  hasBody: boolean,
): Parameter[] {

  const constraints = constraintRegister.get();
  const parameters: Parameter[] = [];
  paramNames.forEach(((paramName, index) => {
    const paramConstraints = constraints.filter(
      constraint => constraint.parameterIndex === index);

    if (!hasBody) {
      let error = true;
      for (const constraint of paramConstraints) {
        if (constraint.type === ConstraintType.Auth ||
          constraint.type === ConstraintType.Query) {
          error = false;
        }
      }
      if (error) {
        throw new SyntaxError(
          `Unable to register parameter without @auth or @query ` +
          `constraints for endpoints of GET or DELETE methods.`
        );
      }
    }

    const parameter: Parameter = {
      name: paramName,
      constraints: paramConstraints,
    };
    parameters.push(parameter);
  }));
  return parameters;
  //return [];

}
