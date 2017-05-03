import {Constraint} from '../types/constraint';
import {ConstraintType} from '../types/constraint-type';


const constraintStorage: Constraint[] = [];


export class ConstraintRegister {

  constructor(private storage: Constraint[]) {}


  register(constraint: Constraint): void {
    // getting previously registered constraints
    // for current parameter
    const currentIndexed = this.storage.filter(
      c => c.parameterIndex === constraint.parameterIndex);

    // checking constraint rules
    this.checkDuplicateRule(constraint, currentIndexed);
    this.checkAuthRule(constraint, currentIndexed);
    this.checkEmailPatternRule(constraint, currentIndexed);
    this.checkEPMinLMaxLRule(constraint, currentIndexed);

    // registering constraint
    this.storage.push(constraint);
  }


  private checkDuplicateRule(constraint: Constraint, currentIndexed: Constraint[]): void {
    const hasDuplicate = currentIndexed.some(
      c => c.type === constraint.type);

    if (hasDuplicate) {
      throw new SyntaxError(
        `Duplicate constraint decorator on the same parameter.`);
    }
  }


  private checkAuthRule(constraint: Constraint, currentIndexed: Constraint[]): void {
    const hasAuth = currentIndexed.some(
      c => c.type === ConstraintType.Auth);

    if (hasAuth || (currentIndexed.length &&
        constraint.type === ConstraintType.Auth)) {
      throw new SyntaxError(
        `Unable to register @auth along with another constraint.`);
    }
  }


  private checkEmailPatternRule(constraint: Constraint, currentIndexed: Constraint[]): void {
    const hasEmail = currentIndexed.some(
      c => c.type === ConstraintType.Email);
    const hasPattern = currentIndexed.some(
      c => c.type === ConstraintType.Pattern);

    const isEmail = constraint.type === ConstraintType.Email;
    const isPattern = constraint.type === ConstraintType.Pattern;

    if ((hasEmail && isPattern) || (hasPattern && isEmail)) {
      throw new SyntaxError(
        `Unable to register @email along with @pattern.`);
    }
  }


  private checkEPMinLMaxLRule(constraint: Constraint, currentIndexed: Constraint[]): void {
    // Group A
    const hasMaxLength: boolean = currentIndexed.some(
      c => c.type === ConstraintType.MaxLength);
    const hasMinLength: boolean = currentIndexed.some(
      c => c.type === ConstraintType.MinLength);

    // Group B
    const hasEmail: boolean = currentIndexed.some(
      c => c.type === ConstraintType.Email);
    const hasPattern: boolean = currentIndexed.some(
      c => c.type === ConstraintType.Pattern);

    const hasA = hasMaxLength || hasMinLength;
    const hasB = hasEmail || hasPattern;

    const isA = constraint.type === ConstraintType.MaxLength ||
      constraint.type === ConstraintType.MinLength;
    const isB = constraint.type === ConstraintType.Email ||
      constraint.type === ConstraintType.Pattern;

    if ((hasA && isB) || (hasB && isA)) {
      throw new SyntaxError(
        `Unable to register @email or @pattern ` +
        `along with @maxlength or @minlength.`);
    }
  }


  get(): Constraint[] {
    const constraints = Array.from(this.storage);
    this.storage.length = 0;
    return constraints;
  }
}


export const constraintRegister =
  new ConstraintRegister(constraintStorage);
