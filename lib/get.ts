import {constraintRegister, getRegister} from './registers';
import getMethodParamNames from './get-method-param-names';
import {logger} from './logger';

export function Get(path: string) {
  return function (target: any, methodName: string) {
    const serviceName = target.constructor.name;

    logger.log(`\tGet - ${serviceName}: ${methodName}`);

    const params = getMethodParamNames(target[methodName]);
    logger.log(`\t${params}`);

    //constraintRegister.splice(0, constraintRegister.length);
    constraintRegister.clear();

    const method = {
      service: serviceName,
      name: methodName
    };
    getRegister.set(path, method);
  }
}
