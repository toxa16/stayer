import {StringMap} from '../../lib/types/string-map';


// ======================
// INJECTIONS FIXTURE.
// ======================




// * Test injection classes
// ------------------------

export class TestInjection1 {
  public property1: number;
}

export class TestInjection2 {
  public property2: string;
}


// * Test factory name symbols
// ---------------------------

export const testFactory1Symbol = Symbol.for('testFactory1');
export const testFactory2Symbol = Symbol.for('testFactory2');
const testFactory3Symbol = Symbol.for('testFactory3');  // FUTURE
const testFactory4Symbol = Symbol.for('testFactory4');  // FUTURE


// * Test factory return values
// ----------------------------

export const factoryValues = {
  [testFactory1Symbol]: { property1: 1e11 },
  [testFactory2Symbol]: { property2: 'propertyTwo' },
  [testFactory3Symbol]: undefined,  // FUTURE
};


// * Test factories
// ----------------

const testFactories = {

  [testFactory1Symbol]: function() {
    return Promise.resolve(factoryValues[testFactory1Symbol]);
  },  // asynchronous factory

  [testFactory2Symbol]: function() {
    return factoryValues[testFactory2Symbol];
  },  // synchronous factory

  [testFactory3Symbol]: function() {
    return factoryValues[testFactory3Symbol];
  },  // TODO: returns undefined

  [testFactory4Symbol]: function() {
    throw new Error();
  },  // TODO: throws error
};


// * Injections fixture
// --------------------

export const injectionsFixture: StringMap<Function> =
  new StringMap<Function>();
injectionsFixture.set(TestInjection1.name,
  testFactories[testFactory1Symbol]);
injectionsFixture.set(TestInjection2.name,
  testFactories[testFactory2Symbol]);


// * Injection instances fixture
// -----------------------------

export const injectionInstancesFixture: StringMap<any> =
  new StringMap();

injectionInstancesFixture.set(
  TestInjection1.name, factoryValues[testFactory1Symbol]);
injectionInstancesFixture.set(
  TestInjection2.name, factoryValues[testFactory2Symbol]);
