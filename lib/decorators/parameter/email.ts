import {constraintRegister} from '../../registers/constraint.register';
import {ConstraintType} from '../../types/constraint-type';


export function email(target, propertyKey, parameterIndex) {
  constraintRegister.register(ConstraintType.Email, parameterIndex);
}
