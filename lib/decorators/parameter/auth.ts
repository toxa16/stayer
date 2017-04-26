import {constraintRegister} from '../../registers/constraint.register';
import {ConstraintType} from '../../types/constraint-type';


export function required(target, propertyKey, parameterIndex) {
  constraintRegister.register(ConstraintType.Auth, parameterIndex);
}
