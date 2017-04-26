import {InjectionRegister} from './registers/injection.register';


export function initializeInjections(
  injectionRegister: InjectionRegister
): Promise<any[]> {

  return Promise.all(injectionRegister.injectionFactories)
    .then(injectionInstances => {
      const injections: Function[] = [];
      for (let name of injectionRegister.injectionNames) {
        injections[name] = injectionInstances.shift();
      }
      return injections;
    })
    .catch(err => {
      // TODO: handle error
      console.log('initializeInjections(): error caught');
      throw err;
    });
}
