import {Register} from './types/register';
import {Descriptor} from './types/descriptor';


export function inject(rootService, register: Register): Promise<Descriptor> {
  return Promise.all(register.injectionFactories)
    .then(values => {
      const injections = [];
      for (let key of register.injectionNames) {
        injections[key] = values.shift();
      }

      const serviceInstances: Map<string, Object> = new Map();
      for (let service of register.serviceConstructors) {
        const args = [];
        for (let dependency of register.getServiceDependencies(service)) {
          args.push(injections[dependency.name]);
        }
        const instance = new service(...args);

        serviceInstances.set(service.name, instance);
      }

      return new Descriptor(register.getEndpoints(), serviceInstances);
    });
    // TODO: implement CATCH
}
