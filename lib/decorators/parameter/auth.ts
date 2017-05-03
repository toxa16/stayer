import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function auth(target, propertyKey, parameterIndex) {
  const constraint: Constraint = {
    type: ConstraintType.Auth,
    parameterIndex: parameterIndex,
  };
  constraintRegister.register(constraint);
}
