import {endpointRegister} from '../../registers/endpoint.register';
import {EndpointMethod} from '../../types/endpoint-method';
import {constraintRegister} from '../../registers/constraint.register';
import {composeEndpoint} from '../helpers/compose-endpoint';


export function Post(path: string) {
  return function (target: any, methodName: string) {
    const endpoint = composeEndpoint(target, methodName,
      EndpointMethod.Post, path, true, constraintRegister);

    endpointRegister.register(endpoint);
  }
}
