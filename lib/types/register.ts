import {Endpoint} from './endpoint';
import {ConstraintRegister} from './constraint-register';
import {Parameter} from './parameter';
import {EndpointMethod} from './endpoint-method';


export class Register {
  private endpoints: Endpoint[] = [];
  private injections: Map<string, Function> = new Map();
  private services: Map<any, any[]> = new Map();

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
    const paramNames = Register.getMethodParamNames(method);
    paramNames.forEach((name, index) => {
      const constraints = this.constraintRegister.get(index);
      const parameter: Parameter = { name, constraints };
      parameters.push(parameter);
    });
    return parameters;
  }

  registerEndpoint(
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

  registerInjection(injectionName: string, factory: Function) {
    this.injections.set(injectionName, factory);
  }

  get injectionFactories() {
    return this.injections.values();
  }

  get injectionNames() {
    return this.injections.keys();
  }


  registerService(constructor: Function, parameterTypes: string[]) {
    this.services.set(constructor, parameterTypes);
  }

  get serviceConstructors() {
    return this.services.keys();
  }

  getServiceDependencies(constructor): any[] {
    return this.services.get(constructor);
  }
}