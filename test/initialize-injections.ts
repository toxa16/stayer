import {InjectionRegister} from '../lib/registers/injection.register';

const injection1 = {
  name: 'injection1',
  firstParam: 1,
  getName: () => {
    return this.name;
  }
};
const injection2 = {
  name: 'injection2',
  secondParam: 'Dependency Injection',
  getParam: () => {
    return this.secondParam;
  }
};
const injection3 = {
  thirdParam: { status: 'ok', error: false },
  execute: () => {
    return 'execute';
  }
};

const injection1name = 'InjectionOne';
const injection2name = 'InjectionTwo';
const injection3name = 'InjectionThree';

const factory1 = function() {
  return injection1;
};

const factory2 = function() {
  return Promise.resolve(injection2);
};

const factory3 = function() {
  return Promise.resolve(injection3);
};


/*describe('initializeInjections', () => {
  const injectionRegister = new InjectionRegister();
  injectionRegister.register(injection2name, factory2());
  injectionRegister.register(injection3name, factory3());
  injectionRegister.register(injection1name, factory1());
});*/
