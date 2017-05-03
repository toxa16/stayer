import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function maxlength(maxChars: number) {

  return function (target, propertyKey, parameterIndex) {
    const constraint: Constraint = {
      type: ConstraintType.MaxLength,
      parameterIndex: parameterIndex,
      options: { maxChars },
    };
    constraintRegister.register(constraint);
  }
}
