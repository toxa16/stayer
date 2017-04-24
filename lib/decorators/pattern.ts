import {constraintRegister} from '../registers';
import {ConstraintType} from '../types/constraint-type';
import {logger} from '../logger';


export function pattern(regexp: RegExp) {

  const options = { regexp };

  return function (target, propertyKey, parameterIndex) {
    //logger.log(`\t\tPattern(${regexp}) - ${target.constructor.name}: ${propertyKey}: ${parameterIndex}`);

    /*const constraint: Constraint = {
      type: ConstraintType.Pattern,
      options: options,
    };*/
    constraintRegister.register(
      ConstraintType.Pattern, parameterIndex, options);
  }
}
