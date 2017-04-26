export class InjectionRegister {
  private injections: Map<string, any> = new Map();

  register(injectionName: string, factory: any) {
    this.injections.set(injectionName, factory);
  }

  get injectionFactories(): IterableIterator<Function> {
    return this.injections.values();
  }

  get injectionNames(): IterableIterator<string> {
    return this.injections.keys();
  }
}


export const injectionRegister = new InjectionRegister();
