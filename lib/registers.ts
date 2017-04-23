import {Constraint} from './constraint';
import {Endpoint} from './endpoint';


export let injectionFactoryRegister: Map<string, Function> = new Map();

export let serviceRegister: Map<any, any[]> = new Map();

export const postRegister: Map<string, Endpoint> = new Map();

export const getRegister: Map<string, any> = new Map();


export class ConstraintRegister {

  private map: Map<number, Constraint[]> = new Map();

  get(parameterIndex: number): Constraint[] {
    return this.map.get(parameterIndex) || [];
  }

  set(parameterIndex: number, constraint: Constraint): void {
    if (this.map.has(parameterIndex)) {
      const constraints = this.map.get(parameterIndex);
      constraints.forEach((record) => {
        if (record.type == constraint.type) {
          throw new Error('Duplicate constraint type');
        }
      });
      constraints.push(constraint);
    } else {
      this.map.set(parameterIndex, [constraint]);
    }
  }

  clear(): void {
    this.map.clear();
  }
}

export const constraintRegister = new ConstraintRegister();
