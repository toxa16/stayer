import {Constraint} from './constraint';


export interface Parameter {
  name: string;
  constraints: Constraint[];
}
