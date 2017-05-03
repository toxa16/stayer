import {EndpointMethod} from './endpoint-method';
import {Parameter} from './parameter';


export interface Endpoint {
  method: EndpointMethod;
  name: string;
  parameters: Parameter[];
  path: string;
  serviceName: string;
}
