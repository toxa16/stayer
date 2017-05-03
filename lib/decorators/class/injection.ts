import {injectionRegister} from '../../registers/injection.register';
import {InjectionOptions} from '../../interfaces/injection.options';


export function Injection(options: InjectionOptions) {
  return function (constructor: Function) {
    injectionRegister.register(constructor.name, options.factory);
  }
}
