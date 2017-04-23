import 'reflect-metadata';
import {serviceRegister} from './registers';
import {logger} from './logger';


export interface ServiceOptions {
  basePath: string;
  services?: any[];
}

export function Service(options: ServiceOptions) {

  logger.log(`Service evaluated: base path - ${options.basePath}`);

  return function (constructor) {
    const serviceName = constructor.name;

    logger.log(`${serviceName} - service executed\n`);

    const paramsTypes =
      Reflect.getMetadata('design:paramtypes', constructor);
    /*for (let param of paramsTypes) {
      console.log(param.name);
    }*/

    serviceRegister.set(constructor, paramsTypes);
  }
}
