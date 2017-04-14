import {postRegister} from './registers';
import getMethodParamNames from './get-method-param-names';

export function Post(path: string) {
  return function (target: any, methodName: string) {
    const serviceName = target.constructor.name;

    console.log(`Post - ${serviceName}: ${methodName}`);

    const params = getMethodParamNames(target[methodName]);
    console.log(params);

    const method = {
      service: serviceName,
      name: methodName,
      params: params,
    };
    postRegister.set(path, method);
  }
}
