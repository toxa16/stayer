import {constraintRegister} from '../registers';
import {ConstraintType} from '../types/constraint-type';
import {logger} from '../logger';


export function minlength(minChars: number) {

  const options = { minChars };

  return function (target: Object, methodName: string | symbol, parameterIndex: number) {
    //logger.log(`\t\tMinlength(${minChars}) - ${target.constructor.name}: ${methodName}: ${parameterIndex}`);

    /*const constraint: Constraint = {
      type: ConstraintType.MinLength,
      options: options,
    };*/
    constraintRegister.register(
      ConstraintType.MinLength, parameterIndex, options);
  }
}
