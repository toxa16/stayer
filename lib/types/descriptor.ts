import {Endpoint} from './endpoint';
import {EndpointMethod} from './endpoint-method';


export class Descriptor {

  constructor(
    private endpoints: Endpoint[],
    private services: Map<string, Object>
  ) {}

  getEndpoints(method: EndpointMethod): Endpoint[] {
    const endpoints: Endpoint[] = [];
    for (const endpoint of this.endpoints) {
      if (endpoint.method === method) {
        endpoints.push(endpoint);
      }
    }
    return endpoints;
  }

  getService(serviceName: string): Object {
    return this.services.get(serviceName);
  }
}
