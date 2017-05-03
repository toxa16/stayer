import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function required(target, propertyKey, parameterIndex) {
  const constraint: Constraint = {
    type: ConstraintType.Required,
    parameterIndex: parameterIndex,
  };
  constraintRegister.register(constraint);
}
