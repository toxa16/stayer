import {logger} from './logger';
import {Constraint, ConstraintType} from './constraint';
import {constraintRegister} from './registers';


export function minlength(minChars: number) {

  const options = { minChars };

  return function (target: Object, methodName: string | symbol, parameterIndex: number) {
    //logger.log(`\t\tMinlength(${minChars}) - ${target.constructor.name}: ${methodName}: ${parameterIndex}`);

    const constraint: Constraint = {
      type: ConstraintType.MinLength,
      options: options,
    };
    constraintRegister.set(parameterIndex, constraint);
  }
}
