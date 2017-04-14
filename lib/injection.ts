import {injectionFactoryRegister} from './registers';
export function Injection(options) {

  console.log(`\t Injection evaluated: ${options.name}`);

  return function (constructor) {
    console.log(`\t${constructor.name} - injection executed`);
    const injectionName = constructor.name;
    injectionFactoryRegister.set(injectionName, options.factory());
  }
}