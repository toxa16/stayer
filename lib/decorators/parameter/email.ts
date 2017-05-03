import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function email(target, propertyKey, parameterIndex) {
  const constraint: Constraint = {
    type: ConstraintType.Email,
    parameterIndex: parameterIndex,
  };
  constraintRegister.register(constraint);
}
