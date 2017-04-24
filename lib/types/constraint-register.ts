import {ConstraintType} from './constraint-type';
import {ConstraintMap} from './constraint-map';


export class ConstraintRegister {
  private constraints: Map<number, ConstraintMap> = new Map();

  register(
    type: ConstraintType,
    parameterIndex: number,
    options: any = {}
  ): void {
    let map = this.constraints.get(parameterIndex);
    if (map !== undefined) {
      if (map.has(type)) {
        throw new Error(`Duplicate constraint type on the same parameter`);
      } else {
        map.set(type, options);
      }
    } else {
      map = new Map().set(type, options);
      this.constraints.set(parameterIndex, map);
    }


    /*const constraint = {
     type: type,
     options: options
     };
    if (this.constraints.has(parameterIndex)) {
      const constraints = this.constraints.get(parameterIndex);
      constraints.forEach((record) => {
        if (record.type == constraint.type) {
          throw new Error(`Duplicate constraint type on the same parameter`);
        }
      });
      constraints.push(constraint);
    } else {
      this.constraints.set(parameterIndex, [constraint]);
    }*/
  }

  /*get(parameterIndex: number): Constraint[] {
    const constraints = this.constraints.get(parameterIndex);
    this.constraints.delete(parameterIndex);
    return constraints || [];
  }*/

  get(parameterIndex: number): ConstraintMap {
    const map = this.constraints.get(parameterIndex);
    this.constraints.delete(parameterIndex);
    return map;
  }
}
