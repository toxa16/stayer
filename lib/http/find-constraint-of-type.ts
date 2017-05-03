import {Constraint} from '../types/constraint';
import {ConstraintType} from '../types/constraint-type';


export function findConstraintOfType(
  constraints: Constraint[],
  type: ConstraintType
): Constraint {

  return constraints.find(c => c.type === type);
}
