import {Constructable} from '../types/constructable';


const serviceStorage: Map<Constructable, string[]> = new Map();


export class ServiceRegister {

  constructor(private storage: Map<Constructable, string[]>) {}

  register(serviceClass: Constructable, dependencies: string[]): void {
    this.storage.set(serviceClass, dependencies);
  }

  get(): Map<Constructable, string[]> {
    return this.storage;
  }
}


export const serviceRegister = new ServiceRegister(serviceStorage);
