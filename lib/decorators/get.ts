import {register} from '../registers';
import {EndpointMethod} from '../types/endpoint-method';
import {logger} from '../logger';



export function Get(route: string) {
  return function (service: any, endpointName: string) {
    const serviceName = service.name || service.constructor.name;
    //logger.log(`\tGet - ${serviceName}: ${endpointName}`);

    register.registerEndpoint(
      endpointName, service, EndpointMethod.Get, route);
  }
}
