import {constraintRegister} from '../registers';
import {ConstraintType} from '../types/constraint-type';


export function email(target, propertyKey, parameterIndex) {
  constraintRegister.register(ConstraintType.Email, parameterIndex);
}
