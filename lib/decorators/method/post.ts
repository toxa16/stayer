import {endpointRegister} from '../../registers/endpoint.register';
import {EndpointMethod} from '../../types/endpoint-method';
import {constraintRegister} from '../../registers/constraint.register';
import {composeEndpoint} from '../helpers/compose-endpoint';


export function Post(path: string) {
  return function (target: any, methodName: string) {
    //console.log(`Post - ${methodName}`);

    /*const serviceName = target.name || target.constructor.name;
    const paramNames = getParamNames(target[methodName]);
    const parameters: Parameter[] =
      getParameters(paramNames, constraintRegister, true);

    const endpoint: Endpoint = {
      method: EndpointMethod.Post,
      name: methodName,
      serviceName: serviceName,
      path: path,
      parameters: parameters,
    };*/

    const endpoint = composeEndpoint(target, methodName,
      EndpointMethod.Post, path, true, constraintRegister);

    endpointRegister.register(endpoint);
  }
}
