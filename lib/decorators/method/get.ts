import {endpointRegister} from '../../registers/endpoint.register';
import {EndpointMethod} from '../../types/endpoint-method';
import {constraintRegister} from '../../registers/constraint.register';
import {composeEndpoint} from '../helpers/compose-endpoint';


export function Get(path: string) {
  return function (target: any, methodName: string) {
    //console.log(`Get - ${methodName}`);

    /*const serviceName = target.name || target.constructor.name;
    const paramNames = getParamNames(target[methodName]);
    const parameters: Parameter[] =
      getParameters(paramNames, constraintRegister, false);

    const endpoint: Endpoint = {
      method: EndpointMethod.Get,
      name: methodName,
      serviceName: serviceName,
      path: path,
      parameters: parameters,
    };*/

    const endpoint = composeEndpoint(target, methodName,
      EndpointMethod.Get, path, false, constraintRegister);

    endpointRegister.register(endpoint);
  }
}
