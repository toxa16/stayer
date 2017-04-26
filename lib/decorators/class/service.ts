import 'reflect-metadata';
import {logger} from '../../logger';
import {serviceRegister} from '../../registers/service.register';


export interface ServiceOptions {
  basePath: string;
  services?: any[];
}

export function Service(options: ServiceOptions) {

  //logger.log(`Service evaluated: base path - ${options.basePath}`);

  return function (constructor: Function) {
    const serviceName = constructor.name;

    //logger.log(`${serviceName} - service executed\n`);

    const paramsTypes =
      Reflect.getMetadata('design:paramtypes', constructor);

    serviceRegister.register(constructor, paramsTypes);
  }
}
