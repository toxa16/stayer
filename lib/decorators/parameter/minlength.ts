import {constraintRegister} from '../../registers/constraint.register';
import {Constraint} from '../../types/constraint';
import {ConstraintType} from '../../types/constraint-type';


export function minlength(minChars: number) {

  return function (target, propertyKey, parameterIndex) {
    const constraint: Constraint = {
      type: ConstraintType.MinLength,
      parameterIndex: parameterIndex,
      options: { minChars },
    };
    constraintRegister.register(constraint);
  }
}
