import {constraintRegister} from '../registers';
import {ConstraintType} from '../types/constraint-type';
import {logger} from '../logger';


export function required(target, propertyKey, parameterIndex) {
  //logger.log(`\t\tRequired - ${target.constructor.name}: ${propertyKey}: ${parameterIndex}`);

  /*const constraint: Constraint = {
    type: ConstraintType.Required,
  };*/
  constraintRegister.register(ConstraintType.Required, parameterIndex);
}
