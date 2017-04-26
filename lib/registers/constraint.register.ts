import {ConstraintType} from '../types/constraint-type';
import {ConstraintMap} from '../types/constraint-map';


export class ConstraintRegister {
  private constraints: Map<number, ConstraintMap> = new Map();

  register(
    type: ConstraintType,
    parameterIndex: number,
    options: any = {}
  ): void {
    let map = this.constraints.get(parameterIndex);
    if (map !== undefined) {
      ConstraintRegister.checkRules(map, type);
      map.set(type, options);
    } else {
      map = new Map().set(type, options);
      this.constraints.set(parameterIndex, map);
    }
  }


  private static checkRules(map: ConstraintMap, type: ConstraintType) {
    // duplicate constraint rule
    if (map.has(type)) {
      throw new SyntaxError(
        'Duplicate constraint type on the same parameter');
    }

    // auth constraint rule
    if (map.has(ConstraintType.Auth) ||
      (map.size > 0 && type === ConstraintType.Auth)) {
      throw new SyntaxError(
        'There must not be any constraints along with @auth');
    }

    // email constraint rule
    const hasEmail = map.has(ConstraintType.Email);
    const hasMinLength = map.has(ConstraintType.MinLength);
    const hasPattern = map.has(ConstraintType.Pattern);

    const typeEmail = (type === ConstraintType.Email);
    const typeMinLength = (type === ConstraintType.MinLength);
    const typePattern = (type === ConstraintType.Pattern);

    const afterEmail = (hasEmail && (typeMinLength || typePattern));
    const beforeEmail = (typeEmail && (hasMinLength || hasPattern));

    if (afterEmail || beforeEmail) {
      throw new SyntaxError(
        'There must not be @minlength nor @pattern constraints ' +
        'along with @email');
    }
  }


  get(parameterIndex: number): ConstraintMap {
    const map = this.constraints.get(parameterIndex);
    this.constraints.delete(parameterIndex);
    return map;
  }
}


export const constraintRegister = new ConstraintRegister();
