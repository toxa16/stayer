import {ServiceRegister} from './registers/service.register';


export function inject(injections: any[], serviceRegister: ServiceRegister) {
  const serviceInstances: Map<string, Object> = new Map();
  for (let service of serviceRegister.serviceConstructors) {
    const args = [];
    const dependencies = serviceRegister.getServiceDependencies(service);
    for (let dependency of dependencies) {
      args.push(injections[dependency.name]);
    }
    const instance = new service(...args);
    serviceInstances.set(service.name, instance);
  }

  return serviceInstances;
}
