import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function pattern(regexp: RegExp) {

  return function (target, propertyKey, parameterIndex) {
    const constraint: Constraint = {
      type: ConstraintType.Pattern,
      parameterIndex: parameterIndex,
      options: { regexp },
    };
    constraintRegister.register(constraint);
  }
}
