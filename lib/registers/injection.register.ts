import {StringMap} from '../types/string-map';


const injectionStorage: StringMap<Function> = new StringMap<Function>();


export class InjectionRegister {

  constructor(private storage: StringMap<Function>) {}

  register(name: string, factory: Function): void {
    this.storage.set(name, factory);
  }

  get(): StringMap<Function> {
    return this.storage;
  }
}


export const injectionRegister = new InjectionRegister(injectionStorage);
