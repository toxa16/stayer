import {getRegister} from './registers';

export function Get(path: string) {
  return function (target: any, methodName: string) {
    const serviceName = target.constructor.name;

    console.log(`Get - ${serviceName}: ${methodName}`);

    const method = {
      service: serviceName,
      name: methodName
    };
    getRegister.set(path, method);
  }
}
