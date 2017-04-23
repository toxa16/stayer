import {constraintRegister, postRegister} from './registers';
import getMethodParamNames from './get-method-param-names';
import {logger} from './logger';
import {Parameter} from './parameter';
import {Endpoint} from './endpoint';


export function Post(path: string) {
  return function (target: any, methodName: string) {
    const serviceName = target.name || target.constructor.name;

    logger.log(`\tPost - ${serviceName}: ${methodName}`);

    const paramNames = getMethodParamNames(target[methodName]);
    const parameters: Parameter[] = [];
    paramNames.forEach((name, index) => {
      const constraints = constraintRegister.get(index);
      const parameter: Parameter = { name, constraints };
      parameters.push(parameter);
    });
    constraintRegister.clear();

    const endpoint: Endpoint = {
      service: serviceName,
      name: methodName,
      parameters: parameters,
    };
    console.log(endpoint);
    postRegister.set(path, endpoint);
  }
}
