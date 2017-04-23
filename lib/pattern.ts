import {logger} from './logger';
import {Constraint, ConstraintType} from './constraint';
import {constraintRegister} from './registers';


export function pattern(regexp: RegExp) {

  const options = { regexp };

  return function (target, propertyKey, parameterIndex) {
    //logger.log(`\t\tPattern(${regexp}) - ${target.constructor.name}: ${propertyKey}: ${parameterIndex}`);

    const constraint: Constraint = {
      type: ConstraintType.Pattern,
      options: options,
    };
    constraintRegister.set(parameterIndex, constraint);
  }
}
