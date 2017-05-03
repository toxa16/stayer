import {InjectionRegister} from '../registers/injection.register';
import {StringMap} from '../types/string-map';


/**
 * Returns dependency instances map from the injection register
 * (executes injection factories and returns their values).
 * @param register the injection register of the application
 * @return {Promise<StringMap[]>}
 */
export function resolveInjections(
  register: InjectionRegister
): Promise<StringMap<any>> {

  const injections: StringMap<Function> = register.get();

  const factories = [];
  for (const [name, factory] of injections) {
    factories.push(factory());
  }

  return Promise.all(factories)
    .then(injectionInstances => {

      const instanceMap: StringMap<any> = new StringMap();
      for (const [name] of injections) {
        instanceMap.set(name, injectionInstances.shift());
      }

      return instanceMap;
    })
    /*.catch(err => {
      console.log('resolveInjections(): error caught and rethrown');
      throw err;
    });*/
    // TODO: handle error

}
