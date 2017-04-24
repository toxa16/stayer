import 'reflect-metadata';
import {register} from '../registers';
import {logger} from '../logger';


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

    register.registerService(constructor, paramsTypes);
  }
}
