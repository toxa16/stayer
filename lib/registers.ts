import {ConstraintRegister} from './types/constraint-register';
import {Register} from './types/register';


export const constraintRegister = new ConstraintRegister();
export const register = new Register(constraintRegister);
