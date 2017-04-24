import {register} from '../registers';
import {EndpointMethod} from '../types/endpoint-method';
import {logger} from '../logger';


export function Post(route: string) {
  return function (service: any, endpointName: string) {
    const serviceName = service.name || service.constructor.name;
    //logger.log(`\tPost - ${serviceName}: ${endpointName}`);

    register.registerEndpoint(
      endpointName, service, EndpointMethod.Post, route);
  }
}
