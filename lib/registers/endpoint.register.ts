import {Endpoint} from '../types/endpoint';
import {ConstraintRegister, constraintRegister} from './constraint.register';
import {Parameter} from '../types/parameter';
import {EndpointMethod} from '../types/endpoint-method';


export class EndpointRegister {
  private endpoints: Endpoint[] = [];

  constructor(private constraintRegister: ConstraintRegister) {}


  /**
   * Obtains parameter names of a function.
   * @param fn
   * @returns {string[]}
   */
  private static getMethodParamNames(fn: Function): string[] {
    const fstr = fn.toString();
    const result = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'')
      .replace(/\s/gi,'').split(',');
    if (result.length == 1 && result[0] === '') {
      return []
    } else {
      return result;
    }
  }

  private getParameters(method: Function): Parameter[] {
    const parameters: Parameter[] = [];
    const paramNames = EndpointRegister.getMethodParamNames(method);
    paramNames.forEach((name, index) => {
      const constraints = this.constraintRegister.get(index);
      const parameter: Parameter = { name, constraints };
      parameters.push(parameter);
    });
    return parameters;
  }

  register(
    name: string, service: any, method: EndpointMethod, route: string,
  ): void {
    const parameters = this.getParameters(service[name]);

    const serviceName = service.name || service.constructor.name;

    const endpoint: Endpoint = {
      name: name,
      method: method,
      route: route,
      serviceName: serviceName,
      parameters: parameters,
    };
    this.endpoints.push(endpoint);
  }


  getEndpoints() {
    return this.endpoints;
  }
}


export const endpointRegister = new EndpointRegister(constraintRegister);
