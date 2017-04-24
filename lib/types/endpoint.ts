import {EndpointMethod} from './endpoint-method';
import {Parameter} from './parameter';

export interface Endpoint {
  name: string;
  method: EndpointMethod;
  route: string;
  serviceName: string;
  parameters: Parameter[];
}
