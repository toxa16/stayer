import {ConstraintType} from './constraint-type';


export interface Constraint {
  type: ConstraintType,
  parameterIndex: number,
  options?: any
}
