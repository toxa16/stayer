import 'reflect-metadata';
import {ServiceOptions} from '../../interfaces/service.options';
import {Constructable} from '../../types/constructable';
import {serviceRegister} from '../../registers/service.register';


export function Service(options: ServiceOptions) {
  return function (serviceClass: Constructable) {

    const paramTypes =
      Reflect.getMetadata('design:paramtypes', serviceClass);

    const dependencies: string[] = [];

    if (paramTypes) {
      for (const type of paramTypes) {
        dependencies.push(type.name);
      }
    }

    serviceRegister.register(serviceClass, dependencies);
  }
}
