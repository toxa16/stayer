import {Parameter} from './parameter';
export interface Endpoint {
  name: string;
  service: string;
  parameters: Parameter[];
}