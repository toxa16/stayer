import {logger} from './logger';
import {Constraint, ConstraintType} from './constraint';
import {constraintRegister} from './registers';


export function required(target, propertyKey, parameterIndex) {
  //logger.log(`\t\tRequired - ${target.constructor.name}: ${propertyKey}: ${parameterIndex}`);

  const constraint: Constraint = {
    type: ConstraintType.Required,
  };
  constraintRegister.set(parameterIndex, constraint);
}
