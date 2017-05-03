import {Endpoint} from '../types/endpoint';


const endpointStorage: Endpoint[] = [];


export class EndpointRegister {

  constructor(private storage: Endpoint[]) {}

  register(endpoint: Endpoint): void {
    // TODO: check endpoint rules
    this.storage.push(endpoint);
  }

  get(): Endpoint[] {
    return this.storage;
  }
}


export const endpointRegister = new EndpointRegister(endpointStorage);
