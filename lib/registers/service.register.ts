export class ServiceRegister {
  private services: Map<any, any[]> = new Map();

  register(constructor: Function, parameterTypes: string[]): void {
    this.services.set(constructor, parameterTypes);
  }

  get serviceConstructors(): IterableIterator<any> {
    return this.services.keys();
  }

  getServiceDependencies(constructor): any[] {
    return this.services.get(constructor);
  }
}


export const serviceRegister = new ServiceRegister();
