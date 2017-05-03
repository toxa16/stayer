import {ServiceRegister} from '../registers/service.register';
import {StringMap} from '../types/string-map';


/**
 * Injects dependencies and creates instances
 * of services of the application.
 * @param injectionInstances a map of instances of dependencies
 * @param register the service register of the application
 * @return {StringMap<typeof Object>} a map of service instances
 */
export function instantiate(
    injectionInstances: StringMap<any>,
    register: ServiceRegister
): StringMap<any> {
  const services = register.get();
  let instances: StringMap<any> = new StringMap();

  for (const [serviceClass, dependencies] of services) {
    const args: any[] = [];
    for (const dependency of dependencies) {
      args.push(injectionInstances.get(dependency));
    }
    const instance = new serviceClass(...args);
    instances.set(serviceClass.name, instance);
  }
  return instances;
}
