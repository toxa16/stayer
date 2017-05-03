import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function query(target, propertyKey, parameterIndex) {
  const constraint: Constraint = {
    type: ConstraintType.Query,
    parameterIndex: parameterIndex,
  };
  constraintRegister.register(constraint);
}
