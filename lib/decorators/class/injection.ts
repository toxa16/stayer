import {injectionRegister} from '../../registers/injection.register';


export interface InjectionOptions {
  factory: Function;
}

export function Injection(options: InjectionOptions) {
  return function (constructor) {
    const injectionName = constructor.name;
    injectionRegister.register(injectionName, options.factory());
  }
}
