import {getParamNames} from './get-param-names';
import {Parameter} from '../../types/parameter';
import {getParameters} from './get-parameters';
import {Endpoint} from '../../types/endpoint';
import {ConstraintRegister} from '../../registers/constraint.register';
import {EndpointMethod} from '../../types/endpoint-method';


/**
 * Composes and returns endpoint object for given parameters.
 *
 * @param service the service class or its prototype
 * @param endpointName name of endpoint function
 * @param method HTTP method of endpoint
 * @param path endpoint path
 * @param hasBody whether corresponding HTTP method has response body
 * @param constraintRegister the constraint register instance
 * @return {Endpoint} composed endpoint object
 */
export function composeEndpoint(
  service: any,
  endpointName: string,
  method: EndpointMethod,
  path: string,
  hasBody: boolean,
  constraintRegister: ConstraintRegister,
): Endpoint {

  const serviceName = service.name || service.constructor.name;
  const paramNames = getParamNames(service[endpointName]);
  const parameters: Parameter[] =
    getParameters(paramNames, constraintRegister, hasBody);

  return {
    method: method,
    name: endpointName,
    parameters: parameters,
    path: path,
    serviceName: serviceName,
  };

}