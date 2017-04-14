import 'reflect-metadata';
import {serviceRegister} from './registers';

export function Service(options) {

  //console.log(`Service evaluated: ${options.name}`);

  return function (constructor) {
    console.log(`${constructor.name} - executed`);
    const serviceName = constructor.name;
    const paramsTypes =
      Reflect.getMetadata('design:paramtypes', constructor);
    /*for (let param of paramsTypes) {
      console.log(param.name);
    }*/

    serviceRegister.set(constructor, paramsTypes);
  }
}
