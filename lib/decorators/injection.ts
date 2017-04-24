import {register} from '../registers';


export interface InjectionOptions {
  factory: Function;
}

export function Injection(options: InjectionOptions) {
  return function (constructor) {
    //console.log(`\t${constructor.name} - injection executed`);
    const injectionName = constructor.name;
    register.registerInjection(injectionName, options.factory());
  }
}
