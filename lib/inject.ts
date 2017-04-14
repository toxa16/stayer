import {
  injectionFactoryRegister,
  serviceRegister
} from './registers';


export function inject(rootService): Promise<any> {
  return Promise.all(injectionFactoryRegister.values())
    .then(values => {
      const injections = [];
      for (let key of injectionFactoryRegister.keys()) {
        injections[key] = values.shift();
      }

      const serviceInstanceRegister: Map<string, any> = new Map();
      for (let service of serviceRegister.keys()) {
        const args = [];
        for (let dependency of serviceRegister.get(service)) {
          args.push(injections[dependency.name]);
        }
        const instance = new service(...args);

        serviceInstanceRegister.set(service.name, instance);
      }

      return serviceInstanceRegister;
    });
}
